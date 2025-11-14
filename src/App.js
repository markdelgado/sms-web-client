
import AppNavbar from './components/AppNavbar';
import { CartProvider } from './contexts/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Home from './pages/Home.jsx';
import OrderConfirmation from './pages/OderConfirmation.jsx';
import Products from './pages/Products.jsx';

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
        </Routes>
    </Router>

      
     
  
    </CartProvider>
  );
}

export default App;
