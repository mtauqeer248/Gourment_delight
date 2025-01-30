/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { mealConfig } from './config/mealConfig';
import { ComponentSelector } from './ComponentSelector';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type {
  MealType,
  MealState,
  FoodComponent,
  Bun,
  Patty,
  Cheese,
  BurgerTopping,
  Crust,
  Sauce,
  PizzaTopping,
  FriesType,
  FriesTopping,
  DrinkComponent
} from './types';
import { string } from 'three/examples/jsm/nodes/Nodes.js';

function MealDisplayPage() {
  const [selectedMealType, setSelectedMealType] = useState<MealType>('burger');
  const [selectedComponents, setSelectedComponents] = useState<MealState>({
    burger: {
      bun: null,
      patty: null,
      cheeses: [],
      toppings: []
    },
    pizza: {
      crust: null,
      sauce: null,
      cheeses: [],
      toppings: []
    },
    fries: { type: null, toppings: [] },
    drink: {
      type: null,
      size: null,
      flavor: null
    }
  });

  const handleRemoveItem = (componentType: string, component: FoodComponent) => {
    setSelectedComponents((prev) => {
      const newComponents = { ...prev };
      switch (selectedMealType) {
        case 'burger':
          if (componentType === 'buns' && newComponents.burger.bun?.id === component.id) {
            newComponents.burger.bun = null;
          } else if (componentType === 'patties' && newComponents.burger.patty?.id === component.id) {
            newComponents.burger.patty = null;
          } else if (componentType === 'cheeses') {
            newComponents.burger.cheeses = newComponents.burger.cheeses.filter((cheese) => cheese.id !== component.id);
          } else if (componentType === 'toppings') {
            newComponents.burger.toppings = newComponents.burger.toppings.filter((topping) => topping.id !== component.id);
          }
          break;

        case 'pizza':
          if (componentType === 'crusts' && newComponents.pizza.crust?.id === component.id) {
            newComponents.pizza.crust = null;
          } else if (componentType === 'sauces' && newComponents.pizza.sauce?.id === component.id) {
            newComponents.pizza.sauce = null;
          } else if (componentType === 'toppings') {
            newComponents.pizza.toppings = newComponents.pizza.toppings.filter((topping) => topping.id !== component.id);
          }
          break;

        case 'fries':
          if (componentType === 'types' && newComponents.fries.type?.id === component.id) {
            newComponents.fries.type = null;
          } else if (componentType === 'toppings') {
            newComponents.fries.toppings = newComponents.fries.toppings.filter((topping) => topping.id !== component.id);
          }
          break;
        case 'drink':
          if (componentType === 'types' && newComponents.drink.type === component.id) {
            newComponents.drink.type = null;
          } else if (componentType === 'sizes' && newComponents.drink.size === component.id) {
            newComponents.drink.size = null;
          } else if (componentType === 'flavors' && newComponents.drink.flavor === component.id) {
            newComponents.drink.flavor = null;
          }
          break;
      }
      return newComponents;
    });
  };



  const handleComponentSelect = (
    componentType: string,
    component: FoodComponent
  ) => {
    setSelectedComponents((prev) => {
      const newComponents = { ...prev };

      switch (selectedMealType) {
        case 'burger':
          if (componentType === 'buns' && !newComponents.burger.bun) {
            newComponents.burger.bun = component as Bun;
          } else if (componentType === 'patties' && !newComponents.burger.patty) {
            newComponents.burger.patty = component as Patty;
          } else if (componentType === 'cheeses' && !newComponents.burger.cheeses.find(cheese => cheese.id === component.id)) {
            const newCheese = { ...component as Cheese, quantity: 1 };
            newComponents.burger.cheeses.push(newCheese);
          } else if (componentType === 'toppings' && !newComponents.burger.toppings.find(topping => topping.id === component.id)) {
            const newTopping = { ...component as BurgerTopping, quantity: 1 };
            newComponents.burger.toppings.push(newTopping);
          }
          break;

        case 'pizza':
          if (componentType === 'crusts' && !newComponents.pizza.crust) {
            newComponents.pizza.crust = component as Crust;
          } else if (componentType === 'sauces' && !newComponents.pizza.sauce) {
            newComponents.pizza.sauce = component as Sauce;
          } else if (componentType === 'toppings' && !newComponents.pizza.toppings.find(topping => topping.id === component.id)) {
            const newTopping = { ...component as PizzaTopping, quantity: 1 };
            newComponents.pizza.toppings.push(newTopping);
          }
          break;

        case 'fries':
          if (componentType === 'types' && !newComponents.fries.type) {
            newComponents.fries.type = component as FriesType;
          } else if (componentType === 'toppings' && !newComponents.fries.toppings.find(topping => topping.id === component.id)) {
            const newTopping = { ...component as FriesTopping, quantity: 1 };
            newComponents.fries.toppings.push(newTopping);
          }
          break;
        case 'drink':
          if (componentType === 'types') {
            const drinkComponent = component as DrinkComponent;
            newComponents.drink.type = drinkComponent.drinkType || null;
            // Reset size and flavor when type changes
            newComponents.drink.size = null;
            newComponents.drink.flavor = null;
          } else if (componentType === 'sizes') {
            const drinkComponent = component as DrinkComponent;
            newComponents.drink.size = drinkComponent.drinkSize || null;
          } else if (componentType === 'flavors') {
            const drinkComponent = component as DrinkComponent;
            newComponents.drink.flavor = drinkComponent.flavorType || null;
          }
          break;
      }

      return newComponents;
    });
  };

  const handleQuantityUpdate = (
    componentType: string,
    component: FoodComponent,
    quantity: number
  ) => {
    setSelectedComponents((prev) => {
      const newComponents = { ...prev };

      switch (selectedMealType) {
        case 'burger':
          if (componentType === 'toppings') {
            const index = newComponents.burger.toppings.findIndex(t => t.id === component.id);
            if (index !== -1) {
              newComponents.burger.toppings[index].quantity = Math.max(0, quantity);
            }
          } else if (componentType === 'cheeses') {
            const index = newComponents.burger.cheeses.findIndex(c => c.id === component.id);
            if (index !== -1) {
              newComponents.burger.cheeses[index].quantity = Math.max(0, quantity);
            }
          }
          break;

        case 'pizza':
          if (componentType === 'toppings') {
            const index = newComponents.pizza.toppings.findIndex(t => t.id === component.id);
            if (index !== -1) {
              newComponents.pizza.toppings[index].quantity = Math.max(0, quantity);
            }
          }
          break;

        case 'fries':
          if (componentType === 'toppings') {
            const index = newComponents.fries.toppings.findIndex(t => t.id === component.id);
            if (index !== -1) {
              newComponents.fries.toppings[index].quantity = Math.max(0, quantity);
            }
          }
          break;
      }

      return newComponents;
    });
  };

  const removeMeal = () => {
    setSelectedComponents({
      burger: {
        bun: null, patty: null, cheeses: [], toppings: [],

      },
      pizza: {
        crust: null, sauce: null, cheeses: [], toppings: [],

      },
      fries: { type: null, toppings: [] },
      drink: { type: 'soda', size: 'medium', flavor: 'cola' }
    });
  };

  const renderMealComponents = () => {
    switch (selectedMealType) {
      case 'burger':
        return (
          <>
            {selectedComponents.burger.bun && (
              <li key={selectedComponents.burger.bun.id} className="flex items-center gap-4 mb-3 border-b pb-2">
                <img src={selectedComponents.burger.bun.image} alt={selectedComponents.burger.bun.name} className="w-12 h-12 rounded-lg" />
                <span className="flex-1">{selectedComponents.burger.bun.name}</span>
                <button
                  onClick={() => handleRemoveItem('buns', selectedComponents.burger.bun)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            )}
            {selectedComponents.burger.patty && (
              <li key={selectedComponents.burger.patty.id} className="flex items-center gap-4 mb-3 border-b pb-2">
                <img src={selectedComponents.burger.patty.image} alt={selectedComponents.burger.patty.name} className="w-12 h-12 rounded-lg" />
                <span className="flex-1">{selectedComponents.burger.patty.name}</span>
                <button
                  onClick={() => handleRemoveItem('patties', selectedComponents.burger.patty)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            )}
            {selectedComponents.burger.cheeses.map(cheese => (
              <li key={cheese.id} className="flex items-center gap-4 mb-3 border-b pb-2">
                <img src={cheese.image} alt={cheese.name} className="w-12 h-12 rounded-lg" />
                <span className="flex-1">{cheese.name}</span>
                <button
                  onClick={() => handleRemoveItem('cheeses', cheese)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
            {selectedComponents.burger.toppings.map(topping => (
              <li key={topping.id} className="flex items-center gap-4 mb-3 border-b pb-2">
                <img src={topping.image} alt={topping.name} className="w-12 h-12 rounded-lg" />
                <span className="flex-1">{topping.name}</span>
                <button
                  onClick={() => handleRemoveItem('toppings', topping)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </>
        );

      case 'pizza':
        return (
          <>
            {selectedComponents.pizza.crust && (
              <li key={selectedComponents.pizza.crust.id} className="flex items-center gap-4 mb-3 border-b pb-2">
                <img src={selectedComponents.pizza.crust.image} alt={selectedComponents.pizza.crust.name} className="w-12 h-12 rounded-lg" />
                <span className="flex-1">{selectedComponents.pizza.crust.name}</span>
                <button
                  onClick={() => handleRemoveItem('crusts', selectedComponents.pizza.crust)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            )}
            {selectedComponents.pizza.sauce && (
              <li key={selectedComponents.pizza.sauce.id} className="flex items-center gap-4 mb-3 border-b pb-2">
                <img src={selectedComponents.pizza.sauce.image} alt={selectedComponents.pizza.sauce.name} className="w-12 h-12 rounded-lg" />
                <span className="flex-1">{selectedComponents.pizza.sauce.name}</span>
                <button
                  onClick={() => handleRemoveItem('sauces', selectedComponents.pizza.sauce)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            )}
            {selectedComponents.pizza.cheeses.map(cheese => (
              <li key={cheese.id} className="flex items-center gap-4 mb-3 border-b pb-2">
                <img src={cheese.image} alt={cheese.name} className="w-12 h-12 rounded-lg" />
                <span className="flex-1">{cheese.name}</span>
                <button
                  onClick={() => handleRemoveItem('cheeses', cheese)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
            {selectedComponents.pizza.toppings.map(topping => (
              <li key={topping.id} className="flex items-center gap-4 mb-3 border-b pb-2">
                <img src={topping.image} alt={topping.name} className="w-12 h-12 rounded-lg" />
                <span className="flex-1">{topping.name}</span>
                <button
                  onClick={() => handleRemoveItem('toppings', topping)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </>
        );

      case 'fries':
        return (
          <>
            {selectedComponents.fries.type && (
              <li key={selectedComponents.fries.type.id} className="flex items-center gap-4 mb-3 border-b pb-2">
                <img src={selectedComponents.fries.type.image} alt={selectedComponents.fries.type.name} className="w-12 h-12 rounded-lg" />
                <span className="flex-1">{selectedComponents.fries.type.name}</span>
                <button
                  onClick={() => handleRemoveItem('types', selectedComponents.fries.type)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            )}
            {selectedComponents.fries.toppings.map(topping => (
              <li key={topping.id} className="flex items-center gap-4 mb-3 border-b pb-2">
                <img src={topping.image} alt={topping.name} className="w-12 h-12 rounded-lg" />
                <span className="flex-1">{topping.name}</span>
                <button
                  onClick={() => handleRemoveItem('toppings', topping)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </>
        );

      case 'drink':
        return (
          <>
            {selectedComponents.drink.type && (
              <li className="flex items-center gap-4 mb-3 border-b pb-2">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  🥤
                </div>
                <span className="flex-1">Type: {selectedComponents.drink.type}</span>
                <button
                  onClick={() => handleRemoveItem('types', { id: selectedComponents.drink.type, name: selectedComponents.drink.type })}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            )}
            {selectedComponents.drink.size && (
              <li className="flex items-center gap-4 mb-3 border-b pb-2">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  📏
                </div>
                <span className="flex-1">Size: {selectedComponents.drink.size}</span>
                <button
                  onClick={() => handleRemoveItem('sizes', { id: selectedComponents.drink.size, name: selectedComponents.drink.size })}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            )}
            {selectedComponents.drink.flavor && (
              <li className="flex items-center gap-4 mb-3 border-b pb-2">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  🍶
                </div>
                <span className="flex-1">Flavor: {selectedComponents.drink.flavor}</span>
                <button
                  onClick={() => handleRemoveItem('flavors', { id: selectedComponents.drink.flavor, name: selectedComponents.drink.flavor })}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            )}
          </>
        );
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    const meal = selectedComponents[selectedMealType];

    // Add up prices based on meal type
    switch (selectedMealType) {
      case 'burger':
        if (meal.bun) total += meal.bun.price;
        if (meal.patty) total += meal.patty.price;
        meal.cheeses.forEach((cheese: { price: number; }) => total += cheese.price);  // Add this line
        meal.toppings.forEach((topping: { price: number; }) => total += topping.price);
        break;
      case 'pizza':
        if (meal.crust) total += meal.crust.price;
        if (meal.sauce) total += meal.sauce.price;
        meal.toppings.forEach((topping: { price: number; }) => total += topping.price);
        break;
      case 'fries':
        if (meal.type) total += meal.type.price;
        meal.toppings.forEach((topping: { price: number; }) => total += topping.price);
        break;
      case 'drink':
        // Assuming base prices for drinks
        const basePrices = {
          small: 2.99,
          medium: 3.99,
          large: 4.99
        };
        total += basePrices[meal.size];
        break;
    }

    return total.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-8">Meal Builder</h1>

        <div className="flex gap-4 mb-6 justify-center">
          {(['burger', 'pizza', 'fries', 'drink'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedMealType(type)}
              className={`px-4 py-2 rounded-lg ${selectedMealType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <ComponentSelector
          mealType={selectedMealType}
          config={{
            name: mealConfig[selectedMealType].name,
            components: mealConfig[selectedMealType].components
          }}
          selectedComponents={selectedComponents[selectedMealType]}
          onSelect={handleComponentSelect}
          onUpdateQuantity={handleQuantityUpdate}
        />

        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Selected Ingredients</h2>
            <span className="text-lg font-medium">
              Total: ${calculateTotalPrice()}
            </span>
          </div>

          <ul>
            {renderMealComponents()}
          </ul>

          <div className="mt-4 flex gap-4">
            <button
              onClick={removeMeal}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 size={16} /> Remove Meal
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Add to Cart
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <Link to={'/menu'}>

                Back to main Menu
              </Link>

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealDisplayPage;




