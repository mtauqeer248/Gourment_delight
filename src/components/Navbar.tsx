import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Utensils, Menu, X, ShoppingCart, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useOrder } from '../hooks/useCart';  // Import the useOrder hook
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { items } = useOrder();  // Get the cart items from useOrder
  const navigate = useNavigate();  // Use useNavigate to redirect

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' },
  ];

  // Calculate the total quantity of items in the cart
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSignOut = () => {
    // Use SweetAlert2 to confirm sign-out
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to sign out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out!',
      cancelButtonText: 'No, keep me logged in',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(); // Perform the sign out action
        Swal.fire('Signed out!', 'You have been signed out successfully.', 'success');
        navigate('/'); // Redirect to homepage after signing out
      }
    });
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Utensils className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Gourmet Delights</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'text-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600'
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}

            {/* Cart link - only visible if the user is logged in */}
            {user ? (
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-indigo-600"
              >
                <ShoppingCart className="w-6 h-6" />
                {/* Display the cart item count at the top right corner */}
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600"
              >
               <ShoppingCart className="w-6 h-6" />
              </Link>
            )}

            {user ? (
              <button
                onClick={handleSignOut} // Call handleSignOut for sign-out
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"
              >
                <LogIn className="w-6 h-6" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Cart link - only visible if the user is logged in */}
            {user ? (
              <Link
                to="/cart"
                className="relative flex items-center gap-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
              <ShoppingCart className="w-6 h-6" />
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  handleSignOut(); // Call handleSignOut for sign-out
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="w-6 h-6" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}


