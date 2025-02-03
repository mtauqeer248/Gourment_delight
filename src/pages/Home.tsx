/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import { ArrowRight, Star } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const handleViewMenuClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/menu');
    }
  };

  const handleBookReservationClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/resturant-seating');
    }
  };

 

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-gradient-to-r from-gray-900 to-gray-800 text-white section">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000"
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Experience Gourmet Fast Food Like Never Before
            </h1>
            <p className="text-xl mb-8">
              Discover our handcrafted burgers, artisanal pizzas, and signature dishes
              made with premium ingredients.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
  <button
    onClick={handleViewMenuClick}
    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors w-full md:w-auto"
  >
    {user ? (
      <>View Menu <ArrowRight className="w-5 h-5" /></>
    ) : (
      <>Login to View Menu <ArrowRight className="w-5 h-5" /></>
    )}
  </button>

  <button
    onClick={handleBookReservationClick}
    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors w-full md:w-auto"
  >
    {user ? (
      <>Book Reservation <ArrowRight className="w-5 h-5" /></>
    ) : (
      <>Login to Book Reservation <ArrowRight className="w-5 h-5" /></>
    )}
  </button>
</div>

          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-gray-50 section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div key={item.name} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">
                      ${item.price.toFixed(2)}
                    </span>
                    {user ? (
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        <Link to={'menu'}>
                          view Menu
                        </Link>
                      </button>
                    ) : (
                      <button
                        onClick={handleViewMenuClick}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        View Menu
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.name} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.text}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const featuredItems = [
  {
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh lettuce, tomatoes, and our special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800'
  },
  {
    name: 'Supreme Pizza',
    description: 'Loaded with pepperoni, mushrooms, bell peppers, and extra cheese',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800'
  },
  {
    name: 'Chicken Wings',
    description: 'Crispy wings tossed in your choice of sauce: BBQ, Buffalo, or Garlic Parmesan',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800'
  }
];

const reviews = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    text: 'The best burgers in town! The quality of ingredients and attention to detail is amazing.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100',
    date: 'February 15, 2024'
  },
  {
    name: 'Michael Chen',
    rating: 5,
    text: 'Their pizzas are incredible! Perfectly crispy crust and generous toppings.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100',
    date: 'February 12, 2024'
  },
  {
    name: 'Emily Davis',
    rating: 4,
    text: 'Love the variety of wing flavors! The garlic parmesan is my favorite.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100',
    date: 'February 10, 2024'
  }
];
