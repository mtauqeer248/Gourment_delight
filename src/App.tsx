import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { OrderProvider } from './hooks/useCart';
import { LoaderProvider } from './context/LoaderContext'; // Import the LoaderProvider
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import FAQ from './pages/FAQ';
import RestaurantSeating from './components/Table-Reservation';
import OrderTracker from './components/OrderTracker';
import AboutPage from './pages/About';
import MealDisplayPage from './components/MealBuilder/index';

function App() {
  return (
    <Router>
      <AuthProvider>
        <OrderProvider>
          <LoaderProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/resturant-seating" element={<RestaurantSeating />} />
                  <Route path="/order-tracker" element={<OrderTracker />} />
                  <Route path="/meal-builder" element={<MealDisplayPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </LoaderProvider>
        </OrderProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;



