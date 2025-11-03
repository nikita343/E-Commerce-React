"use client";
"use strict";

import { useRef, useState, useEffect, useCallback, useId } from "react";

// --- Props Type Definition ---
type LiquidGlassProps = {
  borderRadius?: number;
  blur?: number;
  contrast?: number;
  brightness?: number;
  saturation?: number;
  shadowIntensity?: number;
  displacementScale?: number;
  elasticity?: number;
  zIndex?: number;
  className?: string;
  children?: React.ReactNode;
  reflectionColor?: string;
  reflectionSize?: number;
  rimWidth?: number;
  rimBlur?: number;
  rimColor?: string;
  rimBlendMode?: string;
  rimSpecularAngle?: number;
};

/**
 * A "liquid glass" effect component that distorts its backdrop
 * and features a mouse-following reflection, a built-in
 * chromatic aberration, and a composited glowing rim.
 *
 * It accepts children, so you can wrap any content.
 * e.g., <LiquidGlass>...</LiquidGlass>
 */
export const LiquidGlass = ({
  // Original props
  borderRadius = 20,
  blur = 0.25,
  contrast = 1.2,
  brightness = 1.05,
  saturation = 1.1,
  shadowIntensity = 0.25,
  displacementScale = 1,
  elasticity = 0.6,
  zIndex = 9999,
  className,
  children,

  // Reflection props
  reflectionColor = "rgba(255, 255, 255, 0.2)",
  reflectionSize = 60,

  // Rim/Border Props
  rimWidth = 1,
  rimBlur = 3,
  rimColor = "rgba(255, 255, 255, 0.4)",
  rimBlendMode = "overlay",
  rimSpecularAngle = 135,
}: LiquidGlassProps) => {
  // --- Refs ---
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const feColorMatrixRRef = useRef<SVGFEColorMatrixElement>(null);
  const feColorMatrixGRef = useRef<SVGFEColorMatrixElement>(null);
  const feColorMatrixBRef = useRef<SVGFEColorMatrixElement>(null);

  const reactId = useId();
  const id = `liquid-glass-${reactId.replace(/:/g, "-")}`;

  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);

  // --- (NEW) Safari Detection State ---
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Check for Safari on mount (client-side only)
    setIsSafari(
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
        !/iPad|iPhone|iPod/.test(navigator.userAgent)
    );
  }, []);

  const canvasDPI = 1;

  // --- Utility Functions ---
  const smoothStep = useCallback((a: number, b: number, t: number) => {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }, []);

  const length = useCallback((x: number, y: number) => {
    return Math.sqrt(x * x + y * y);
  }, []);

  const roundedRectSDF = useCallback(
    (x: number, y: number, w: number, h: number, radius: number) => {
      const qx = Math.abs(x) - w + radius;
      const qy = Math.abs(y) - h + radius;
      return (
        Math.min(Math.max(qx, qy), 0) +
        length(Math.max(qx, 0), Math.max(qy, 0)) -
        radius
      );
    },
    [length]
  );

  // --- Displacement Map Generation ---
  const updateShader = useCallback(() => {
    const canvas = canvasRef.current;
    const feImage = feImageRef.current;
    const feDisplacementMap = feDisplacementMapRef.current;
    if (!canvas || !feImage || !feDisplacementMap) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const w = Math.max(1, Math.floor(width * canvasDPI));
    const h = Math.max(1, Math.floor(height * canvasDPI));

    if (w <= 0 || h <= 0) return;

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const data = new Uint8ClampedArray(w * h * 4);
    let maxScale = 0;
    const rawValues: number[] = [];

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w;
      const y = Math.floor(i / 4 / w);
      const uv = { x: x / w, y: y / h };

      // Fragment shader logic
      const ix = uv.x - 0.5;
      const iy = uv.y - 0.5;
      const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, elasticity);
      const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
      const scaled = smoothStep(0, 1, displacement);
      const pos = {
        x: ix * scaled + 0.5,
        y: iy * scaled + 0.5,
      };
      const dx = pos.x * w - x;
      const dy = pos.y * h - y;

      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale *= 0.5 * displacementScale;
    const safeMaxScale = maxScale === 0 ? 1 : maxScale;

    let index = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = rawValues[index++] / safeMaxScale + 0.5;
      const g = rawValues[index++] / safeMaxScale + 0.5;
      data[i] = r * 255;
      data[i + 1] = g * 255;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }

    const expectedLength = w * h * 4;
    if (data.length !== expectedLength) {
      console.warn("Data length mismatch for ImageData");
      return;
    }

    try {
      context.putImageData(new ImageData(data, w, h), 0, 0);
      feImage.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "href",
        canvas.toDataURL()
      );
      feDisplacementMap.setAttribute(
        "scale",
        (safeMaxScale / canvasDPI).toString()
      );
    } catch (error) {
      console.error("Error creating ImageData:", error);
    }
  }, [
    width,
    height,
    canvasDPI,
    displacementScale,
    elasticity,
    roundedRectSDF,
    smoothStep,
  ]);

  // --- Resize Observer ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        setWidth(Math.max(newWidth, 100)); // Minimum width
        setHeight(Math.max(newHeight, 100)); // Minimum height
      }
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // --- (MODIFIED) Update shader on mount and when params change ---
  useEffect(() => {
    // Don't run the shader generation on Safari
    if (isSafari) return;

    updateShader();
  }, [updateShader, isSafari]); // Add isSafari dependency

  // --- Update Chromatic Aberration Filter ---
  useEffect(() => {
    // This effect is only for the filter, so skip if on Safari
    if (isSafari) return;

    const feColorMatrixR = feColorMatrixRRef.current;
    const feColorMatrixG = feColorMatrixGRef.current;
    const feColorMatrixB = feColorMatrixBRef.current;

    if (!feColorMatrixR || !feColorMatrixG || !feColorMatrixB) return;

    const chromaticAberration = 0.05;
    const chromaticAberrationAngle = 45;

    const angleRad = (chromaticAberrationAngle * Math.PI) / 180;
    const offsetX = Math.cos(angleRad) * chromaticAberration;
    const offsetY = Math.sin(angleRad) * chromaticAberration;

    feColorMatrixR.setAttribute(
      "values",
      `1 0 0 0 ${offsetX} 0 1 0 0 ${offsetY} 0 0 1 0 0 0 0 0 1 0`
    );
    feColorMatrixG.setAttribute(
      "values",
      `1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0`
    );
    feColorMatrixB.setAttribute(
      "values",
      `1 0 0 0 ${-offsetX} 0 1 0 0 ${-offsetY} 0 0 1 0 0 0 0 0 1 0`
    );
  }, [isSafari]); // Add isSafari dependency

  // --- Mouse Handlers ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!reflectionRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    reflectionRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${reflectionColor} 0%, transparent ${reflectionSize}%)`;
  };

  const handleMouseLeave = () => {
    if (!reflectionRef.current) return;
    reflectionRef.current.style.background = "none";
  };

  // --- Rim Effect Calculation ---
  const angleRad = (rimSpecularAngle * Math.PI) / 180;
  const offsetX = Math.cos(angleRad) * Math.min(rimWidth, 1);
  const offsetY = Math.sin(angleRad) * Math.min(rimWidth, 1);

  const rimBoxShadow = `inset ${offsetX.toFixed(2)}px ${offsetY.toFixed(
    2
  )}px ${rimBlur}px ${rimWidth}px ${rimColor}`;

  // --- (NEW) Conditional Filter Style ---
  // --- (MODIFIED) Conditional Filter Style for Safari Blur ---
  const effectiveBlur = isSafari ? blur * 3 : blur; // Apply 2x blur for Safari
  const baseFilter = `blur(${effectiveBlur}px) contrast(${contrast}) brightness(${brightness}) saturate(${saturation})`;
  const backdropFilterStyle = isSafari
    ? baseFilter
    : `url(#${id}_filter) ${baseFilter}`;
  // --- Render ---
  return (
    <>
      {/* --- (NEW) Conditionally render SVG and Canvas --- */}
      {/* These elements are not needed on Safari */}
      {!isSafari && (
        <>
          {/* SVG Filter Definition */}
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            width="0"
            height="0"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: zIndex - 1,
            }}
          >
            <defs>
              <filter
                id={`${id}_filter`}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
                x="0"
                y="0"
                width={width.toString()}
                height={height.toString()}
              >
                <feImage
                  ref={feImageRef}
                  id={`${id}_map`}
                  width={width.toString()}
                  height={height.toString()}
                />
                <feDisplacementMap
                  ref={feDisplacementMapRef}
                  in="SourceGraphic"
                  in2={`${id}_map`}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displacedSource"
                />
                <feColorMatrix
                  ref={feColorMatrixRRef}
                  in="displacedSource"
                  type="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
                  result="redShifted"
                />
                <feColorMatrix
                  ref={feColorMatrixGRef}
                  in="displacedSource"
                  type="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
                  result="greenShifted"
                />
                <feColorMatrix
                  ref={feColorMatrixBRef}
                  in="displacedSource"
                  type="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
                  result="blueShifted"
                />
                <feBlend
                  in="redShifted"
                  in2="blueShifted"
                  mode="screen"
                  result="rbMerged"
                />
                <feBlend in="rbMerged" in2="greenShifted" mode="screen" />
              </filter>
            </defs>
          </svg>

          {/* Canvas for displacement map */}
          <canvas
            ref={canvasRef}
            width={width * canvasDPI}
            height={height * canvasDPI}
            style={{ display: "none" }}
          />
        </>
      )}

      {/* Main Container */}
      <div
        ref={containerRef}
        className={className}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: `${borderRadius}px`,
          boxShadow: `0 4px 8px rgba(0, 0, 0, ${shadowIntensity}), 0 -10px 25px inset rgba(0, 0, 0, 0.15)`,
          // --- (MODIFIED) Apply the conditional filter ---
          backdropFilter: backdropFilterStyle,
          zIndex: zIndex,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Children Wrapper */}
        <div
          style={{
            position: "relative",
            zIndex: 1, // Children sit above reflection
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>

        {/* Reflection Overlay */}
        <div
          ref={reflectionRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 0, // Behind children
            opacity: 0, // Note: This is 0, you might want to adjust this
            background: "none",
            transition: "background 0.4s linear",
          }}
        />

        {/* Rim/Border Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 2, // On top of children and reflection
            boxShadow: rimBoxShadow,
            mixBlendMode: rimBlendMode as React.CSSProperties["mixBlendMode"],
          }}
        />
      </div>
    </>
  );
};
