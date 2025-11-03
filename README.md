<p align="center">
  <img src="./public/og.png" alt="Aetheria Banner" width="100%" />
</p>

<h1 align="center">🌟 Aetheria Project</h1>

<p align="center">
  <strong>A modern e-commerce storefront & product showcase built with React + TypeScript.</strong><br/>
  <em>Focused on state management, data synchronization, and performance best practices.</em>
</p>

<p align="center">
  🔗 <a href="https://aetheria.awakeagency.dev/" target="_blank"><b>Check the live version → aetheria.awakeagency.dev</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React Badge" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript Badge" />
  <img src="https://img.shields.io/badge/SCSS-Sass-pink?logo=sass" alt="Sass Badge" />
  <img src="https://img.shields.io/badge/Swiper.js-Enabled-success?logo=swiper" alt="Swiper Badge" />
  <img src="https://img.shields.io/badge/GSAP-Animations-green?logo=greensock" alt="GSAP Badge" />
</p>

---

## 🎯 Key Features and Architecture

The application is structured to handle data flow and component lifecycle events robustly and immutably.

| Feature                                   | Description                                                                                                                                                     |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Global State Management (Context API)** | The app uses the built-in React Context API to manage global, cross-component state, avoiding prop drilling for critical data.                                  |
| **CartProvider**                          | Manages cart items, quantities, and size selection logic.                                                                                                       |
| **LoaderProvider**                        | Manages global loading states and delay timers.                                                                                                                 |
| **Persistent Cart (Local Storage)**       | Cart data is synchronized with `localStorage` using `useEffect`, ensuring cart persistence across sessions. Only lightweight data (IDs, quantities) are stored. |
| **Type Safety (TypeScript)**              | Strict typing across components, states, props, and API logic for early error detection and data consistency.                                                   |
| **Custom Hooks**                          | Encapsulates reusable logic (`useLoader`, `useCart`, `useDocumentTitle`) for cleaner, modular components.                                                       |

---

## ⚙️ Core Technical Features Implemented

| Feature Area        | Concepts Implemented                                                                                                                                                                  | Best Practices Demonstrated                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Data Processing** | Filtering & Sorting Chain: Products are filtered by multiple criteria (notes, edition) and then sorted by key (price, date). Implements the _Filter-Then-Sort_ architectural pattern. | `useMemo`: Caches filtered/sorted results to avoid expensive recalculations on every render.                                            |
| **Forms & Sync**    | Controlled Components for quantity and size selection (`<select>`).                                                                                                                   | `useEffect`: Monitors quantity and size state changes to instantly update the `finalPrice`.                                             |
| **Product Gallery** | Two-Way Swiper Synchronization: The main gallery and thumbnail slider are linked using Swiper’s `controller` prop.                                                                    | Custom SVG navigation integrated via `useSwiper()`, with conditional disabling using `swiper.isBeginning` and `swiper.isEnd`.           |
| **Architecture**    | Dynamic Routing using `react-router-dom` with `useParams` to render `/products/:slug` pages.                                                                                          | Guardrails via conditional rendering (`if (!data) return <Loader />`) and optional chaining to prevent crashes during async operations. |

---

## 💻 Technologies Used

| Technology                                                          | Purpose                                                          |
| ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **React (Hooks: useState, useEffect, useMemo, useContext, useRef)** | Core application framework and state management.                 |
| **TypeScript**                                                      | Static typing for improved reliability and reduced runtime bugs. |
| **React Router DOM v6**                                             | Client-side routing with nested routes and dynamic parameters.   |
| **Swiper (Controller, EffectFade)**                                 | High-performance, synchronized product image galleries.          |
| **SCSS / Sass**                                                     | CSS pre-processor for modular, maintainable styling.             |
| **GSAP (GreenSock) + ScrollTrigger**                                | Advanced animation and scroll-triggered effects via `useGSAP`.   |
| **Local Storage**                                                   | Data persistence for cart items across sessions.                 |

---

## 🧩 Project Goals

- Apply **advanced React design patterns** for scalable and maintainable architecture
- Demonstrate **clean state management** without external libraries like Redux
- Ensure **performance optimization** through memoization and effect dependency control
- Deliver a **real-world simulation** of a high-quality e-commerce experience

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/nikita343/E-Commerce-React

# Navigate into the project folder
cd E-Commerce-React

# Install dependencies
npm install

# Start the development server
npm run dev
```
