import { useState } from 'react';
import { useOrder } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
}

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useOrder();
  const { user } = useAuth();
  const navigate = useNavigate(); 
  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'meal-builder') {
      navigate('/meal-builder'); // Redirect to the Meal Builder page
    } else {
      setSelectedCategory(categoryId); // Update selected category for other options
    }
  };
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'pizzas', name: 'Pizzas' },
    { id: 'chicken', name: 'Chicken' },
    { id: 'sides', name: 'Sides' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'meal-builder', name: 'Meal Builder' }
  ];

  const menuItems: MenuItem[] = [
    // Burgers
    {
      id: 'classic-burger',
      name: 'Classic Cheeseburger',
      description: 'Juicy beef patty with cheddar cheese, lettuce, tomatoes, and our special sauce',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800',
      category: 'burgers'
    },
    {
      id: 'bacon-burger',
      name: 'Bacon Supreme',
      description: 'Double beef patty with crispy bacon, caramelized onions, and BBQ sauce',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800',
      category: 'burgers'
    },
    {
      id: 'mushroom-burger',
      name: 'Mushroom Swiss',
      description: 'Beef patty topped with sautéed mushrooms and melted Swiss cheese',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800',
      category: 'burgers'
    },
    {
      id: 'veggie-burger',
      name: 'Garden Veggie Burger',
      description: 'Plant-based patty with avocado, sprouts, and vegan mayo',
      price: 13.99,
      image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=800',
      category: 'burgers'
    },

    // Pizzas
    {
      id: 'margherita',
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomatoes, basil, and extra virgin olive oil',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800',
      category: 'pizzas'
    },
    {
      id: 'pepperoni',
      name: 'Classic Pepperoni',
      description: 'Generous layers of pepperoni and melted mozzarella',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800',
      category: 'pizzas'
    },
    {
      id: 'supreme',
      name: 'Supreme Pizza',
      description: 'Loaded with pepperoni, sausage, bell peppers, onions, and olives',
      price: 20.99,
      image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800',
      category: 'pizzas'
    },
    {
      id: 'bbq-chicken',
      name: 'BBQ Chicken Pizza',
      description: 'Grilled chicken, red onions, and BBQ sauce drizzle',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800',
      category: 'pizzas'
    },

    // Chicken
    {
      id: 'wings-classic',
      name: 'Classic Wings',
      description: 'Crispy wings with your choice of sauce: Buffalo, BBQ, or Garlic Parmesan',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800',
      category: 'chicken'
    },
    {
      id: 'chicken-tenders',
      name: 'Chicken Tenders',
      description: 'Hand-breaded chicken tenders with honey mustard sauce',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800',
      category: 'chicken'
    },
    {
      id: 'grilled-chicken',
      name: 'Herb Grilled Chicken',
      description: 'Marinated chicken breast with herbs and lemon',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800',
      category: 'chicken'
    },
    {
      id: 'nashville-hot',
      name: 'Nashville Hot Chicken',
      description: 'Spicy fried chicken with pickles and coleslaw',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800',
      category: 'chicken'
    },

    // Sides
    {
      id: 'fries',
      name: 'Classic Fries',
      description: 'Crispy golden fries with our signature seasoning',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800',
      category: 'sides'
    },
    {
      id: 'onion-rings',
      name: 'Onion Rings',
      description: 'Beer-battered onion rings with ranch dipping sauce',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800',
      category: 'sides'
    },
    {
      id: 'mac-cheese',
      name: 'Mac & Cheese',
      description: 'Creamy four-cheese blend with crispy breadcrumb topping',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=800',
      category: 'sides'
    },
    {
      id: 'coleslaw',
      name: 'Homestyle Coleslaw',
      description: 'Fresh cabbage and carrots in creamy dressing',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1625938145744-e380515399b7?auto=format&fit=crop&w=800',
      category: 'sides'
    },

    // Drinks
    {
      id: 'soda',
      name: 'Fountain Soda',
      description: 'Your choice of soft drinks with free refills',
      price: 2.99,
      image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=800',
      category: 'drinks'
    },
    {
      id: 'lemonade',
      name: 'Fresh Lemonade',
      description: 'House-made lemonade with real lemons',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800',
      category: 'drinks'
    },
    {
      id: 'milkshake',
      name: 'Classic Milkshake',
      description: 'Hand-spun vanilla, chocolate, or strawberry shake',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800',
      category: 'drinks'
    },
    {
      id: 'iced-tea',
      name: 'Iced Tea',
      description: 'Fresh-brewed unsweetened or sweet tea',
      price: 2.99,
      image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800',
      category: 'drinks'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const getRestrictedItems = () => {
    const itemsByCategory = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, MenuItem[]>);

    return Object.values(itemsByCategory).flatMap(items => items.slice(0, 3));
  };

  const displayedItems = user ? filteredItems : getRestrictedItems();

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      ...item,
      quantity: 1
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>
      
      {!user && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-8 text-center">
          <p className="text-indigo-800 mb-2">
            Sign in to see our complete menu and place orders!
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="inline-block bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map(category => (
  <button
    key={category.id}
    onClick={() => handleCategoryClick(category.id)}
    className={`px-4 py-2 rounded-full ${
      selectedCategory === category.id
        ? 'bg-indigo-600 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {category.name}
  </button>
))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedItems.map((item) => (
          <ProductCard
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            onAddToCart={() => handleAddToCart(item)}
          />
        ))}
      </div>
    </div>
  );
}