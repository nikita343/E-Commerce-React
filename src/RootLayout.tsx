import { BrowserRouter } from "react-router-dom";
import Loader from "./components/composite/Loader";
import AppRouter from "./AppRouter";
import { useLoader } from "./hooks/useLoader";
import Navbar from "./components/composite/Navbar";
import Footer from "./components/composite/Footer";
const RootLayout = () => {
  const { isLoaderVisible } = useLoader();
  return (
    <div>
      {isLoaderVisible && <Loader />}

      <BrowserRouter>
        <Navbar />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default RootLayout;
