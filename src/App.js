
import AppNavbar from './components/AppNavbar';
import { CartProvider } from './contexts/CartContext';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Home from './pages/Home.jsx';
import OrderConfirmation from './pages/OderConfirmation.jsx';
import Products from './pages/Products.jsx';
import ProductPage from './pages/ProductPage.jsx';

function App() {
  return (
   <CartProvider>
    <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/products/:sku" element={<ProductPage />} />
        </Routes>
    </Router>

      
     
  
    </CartProvider>
  );
}

export default App;
