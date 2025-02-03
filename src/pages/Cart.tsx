import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useOrder } from '../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, createOrder } = useOrder();
  const navigate = useNavigate();

  // Helper function to safely format prices
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return !isNaN(numPrice) ? numPrice.toFixed(2) : '0.00';
  };

  const handleCheckout = () => {
    // This is where you would trigger order creation, e.g., sending data to an API or processing payment
    createOrder(total);
    navigate('/order-tracker'); // Navigate to the order tracking page after checkout
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious items to your cart!</p>
          <Link
            to="/menu"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            View Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>$5.00</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${formatPrice(total + 5)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
