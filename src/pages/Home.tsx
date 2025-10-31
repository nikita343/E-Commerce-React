import Header from "../components/composite/Header";
import ProductSection from "../components/sections/ProductSection";
import AboutSection from "../components/sections/AboutSection";
import useDocumentTitle from "../hooks/useDocumentTitle";
const Home = () => {
  useDocumentTitle(
    "Aetheria — The Apothecary of Time | Fragrances Beyond Eras"
  );
  return (
    <div>
      <Header />
      <ProductSection />
      <AboutSection />
    </div>
  );
};

export default Home;
