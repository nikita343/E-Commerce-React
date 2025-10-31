import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductTemplate from "./pages/ProductTemplate";
import Products from "./pages/Products";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/products" element={<Products />} />

    <Route path="/products/:slug" element={<ProductTemplate />} />
  </Routes>
);

export default AppRouter;
