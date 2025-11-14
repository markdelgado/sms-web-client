import logo from './logo.svg';
import './App.css';
import AppNavbar from './components/AppNavbar';
import { CartProvider } from './contexts/CartContext';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
   <CartProvider>
    <Router>
        <AppNavbar />
    </Router>

      
     
  
    </CartProvider>
  );
}

export default App;
