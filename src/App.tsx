import { LoaderProvider } from "./contexts/LoaderProvider";
import RootLayout from "./RootLayout";
import CartProvider from "./contexts/CartProvider";
function App() {
  return (
    <div className="app-container">
      <CartProvider>
        <LoaderProvider>
          <RootLayout />
        </LoaderProvider>
      </CartProvider>
    </div>
  );
}

export default App;
