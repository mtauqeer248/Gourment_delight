import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ComponentSelector } from './ComponentSelector';
import { MealDisplay } from './MealDisplay';
import { mealConfig } from './config/mealConfig';
import { useOrder } from '../../hooks/useCart';
import type { 
  MealType, 
  MealState, 
  BurgerState, 
  PizzaState, 
  FriesState, 
  DrinkState,
  MealComponents 
} from './types';

const MealBuilder = () => {
  const { addToCart } = useOrder();
  const [selectedMealType, setSelectedMealType] = useState<MealType>('burger');
  const [selectedComponents, setSelectedComponents] = useState<MealState>({
    burger: { bun: null, patty: null, toppings: [] },
    pizza: { crust: null, sauce: null, toppings: [] },
    fries: { type: null, toppings: [] },
    drink: { type: 'soda', size: 'medium', flavor: 'cola' }
  });
  const [quantity, setQuantity] = useState(1);

  const calculateTotalPrice = () => {
    let total = 0;
    const currentMeal = selectedComponents[selectedMealType];

    switch (selectedMealType) {
      case 'burger': {
        const burger = currentMeal as BurgerState;
        total += burger.bun?.price || 0;
        total += burger.patty?.price || 0;
        total += burger.toppings.reduce((sum, t) => sum + (t.price || 0), 0);
        break;
      }
      case 'pizza': {
        const pizza = currentMeal as PizzaState;
        total += pizza.crust?.price || 0;
        total += pizza.sauce?.price || 0;
        total += pizza.toppings.reduce((sum, t) => sum + (t.price || 0), 0);
        break;
      }
      case 'fries': {
        const fries = currentMeal as FriesState;
        total += fries.type?.price || 0;
        total += fries.toppings.reduce((sum, t) => sum + (t.price || 0), 0);
        break;
      }
      case 'drink': {
        const drink = currentMeal as DrinkState;
        total += drink.size === 'small' ? 2.99 : drink.size === 'medium' ? 3.99 : 4.99;
        break;
      }
    }

    return (total * quantity).toFixed(2);
  };

  const handleComponentSelect = <T extends MealType>(
    mealType: T,
    componentType: keyof MealComponents[T],
    component: unknown
  ) => {
    setSelectedComponents(prev => ({
      ...prev,
      [mealType]: updateMealState(mealType, prev[mealType], componentType, component)
    }));
  };

  const handleAddToCart = () => {
    const meal = {
      type: selectedMealType,
      components: selectedComponents[selectedMealType],
      price: calculateTotalPrice(),
      name: mealConfig[selectedMealType].name,
      image: `/images/meal-builder/${selectedMealType}-default.png`,
      quantity
    };

    addToCart(meal);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-wrap gap-4 mb-8">
        {Object.entries(mealConfig).map(([type, config]) => (
          <button
            key={type}
            onClick={() => setSelectedMealType(type as MealType)}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all
              ${selectedMealType === type 
                ? 'bg-blue-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 hover:bg-gray-200'
              }
            `}
          >
            {config.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <img 
                src={`/images/meal-builder/${selectedMealType}-default.png`}
                alt={selectedMealType}
                className="w-40 h-40 object-contain"
              />
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <div className="text-2xl font-bold">
                  ${calculateTotalPrice()}
                </div>
              </div>
            </div>

            <ComponentSelector
              mealType={selectedMealType}
              config={mealConfig[selectedMealType]}
              selectedComponents={selectedComponents[selectedMealType]}
              onSelect={(componentType, component) => 
                handleComponentSelect(selectedMealType, componentType, component)
              }
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Your Meal Preview</h2>
            <div className="mb-8">
              <MealDisplay
                type={selectedMealType}
                components={selectedComponents[selectedMealType]}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Add to Cart
              </button>
              <Link 
                to="/menu"
                className="px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium transition-colors"
              >
                Back to Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealBuilder;


