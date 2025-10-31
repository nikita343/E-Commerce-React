import { useEffect, useState, useRef } from "react";
import { useLoader } from "../../hooks/useLoader";

const ANIMATION_DELAY_MS = 500;
const INTERVAL_MS = 15; // 3000ms / 100 steps

const Loader = () => {
  const { setIsLoaderVisible } = useLoader();

  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. START THE PROGRESS COUNTER
    intervalRef.current = setInterval(() => {
      setCurrentPercentage((prev) => {
        // If we hit 100, we stop counting
        if (prev >= 100) {
          // This must be inside the setInterval callback to prevent stale closures
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          // No return needed here, we handle the unmount below
          return 100;
        }
        return prev + 1;
      });
    }, INTERVAL_MS) as unknown as number;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (currentPercentage >= 100 && !isFadingOut) {
      setIsFadingOut(true);

      const unmountTimer = setTimeout(() => {
        setIsLoaderVisible(false);
      }, ANIMATION_DELAY_MS);

      return () => clearTimeout(unmountTimer);
    }

    return;
  }, [currentPercentage, isFadingOut, setIsLoaderVisible]);

  return (
    <section className={`loader ${isFadingOut ? "loader__active" : ""}`}>
      <div className="loader__text">
        <span>{currentPercentage}</span>
        <span>%</span>
      </div>
    </section>
  );
};

export default Loader;
