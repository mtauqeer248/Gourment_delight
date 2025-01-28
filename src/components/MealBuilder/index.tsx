/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import react,{ useState } from 'react'
import { mealConfig } from './config/mealConfig'
import { ComponentSelector } from './ComponentSelector'
import { MealDisplay } from './MealDisplay'
import type { MealType, MealState, BurgerState, PizzaState, FriesState, DrinkState } from './types'

function MealDisplayPage() {
  const [selectedMealType, setSelectedMealType] = useState<MealType>('burger')
  const [selectedComponents, setSelectedComponents] = useState<MealState>({
    burger: { bun: null, patty: null, toppings: [] },
    pizza: { crust: null, sauce: null, toppings: [] },
    fries: { type: null, toppings: [] },
    drink: { type: 'soda', size: 'medium', flavor: 'cola' }
  })
  const [quantity, setQuantity] = useState(1)

  const calculateTotalPrice = () => {
    let total = 0
    const currentMeal = selectedComponents[selectedMealType]

    switch (selectedMealType) {
      case 'burger': {
        const burger = currentMeal as BurgerState
        total += burger.bun?.price || 0
        total += burger.patty?.price || 0
        total += burger.toppings.reduce((sum, t) => sum + (t.price || 0), 0)
        break
      }
      case 'pizza': {
        const pizza = currentMeal as PizzaState
        total += pizza.crust?.price || 0
        total += pizza.sauce?.price || 0
        total += pizza.toppings.reduce((sum, t) => sum + (t.price || 0), 0)
        break
      }
      case 'fries': {
        const fries = currentMeal as FriesState
        total += fries.type?.price || 0
        total += fries.toppings.reduce((sum, t) => sum + (t.price || 0), 0)
        break
      }
      case 'drink': {
        const drink = currentMeal as DrinkState
        total += drink.size === 'small' ? 2.99 : drink.size === 'medium' ? 3.99 : 4.99
        break
      }
    }

    return (total * quantity).toFixed(2)
  }

  const handleComponentSelect = <T extends MealType>(
    mealType: T,
    componentType: keyof typeof mealConfig[T]['components'],
    component: any
  ) => {
    setSelectedComponents(prev => ({
      ...prev,
      [mealType]: updateMealState(mealType, prev[mealType], componentType, component)
    }))
  }

  const updateMealState = <T extends MealType>(
    mealType: T,
    currentState: MealState[T],
    componentType: keyof typeof mealConfig[T]['components'],
    component: any
  ): MealState[T] => {
    switch (mealType) {
      case 'burger': {
        const burgerState = currentState as BurgerState
        switch (componentType) {
          case 'buns':
            return { ...burgerState, bun: component } as MealState[T]
          case 'patties':
            return { ...burgerState, patty: component } as MealState[T]
          case 'toppings':
            const existingTopping = burgerState.toppings.find(t => t.id === component.id)
            return {
              ...burgerState,
              toppings: existingTopping
                ? burgerState.toppings.filter(t => t.id !== component.id)
                : [...burgerState.toppings, component]
            } as MealState[T]
          default:
            return burgerState as MealState[T]
        }
      }
      case 'pizza': {
        const pizzaState = currentState as PizzaState
        switch (componentType) {
          case 'crusts':
            return { ...pizzaState, crust: component } as MealState[T]
          case 'sauces':
            return { ...pizzaState, sauce: component } as MealState[T]
          case 'toppings':
          case 'specials':
            const existingTopping = pizzaState.toppings.find(t => t.id === component.id)
            return {
              ...pizzaState,
              toppings: existingTopping
                ? pizzaState.toppings.filter(t => t.id !== component.id)
                : [...pizzaState.toppings, component]
            } as MealState[T]
          default:
            return pizzaState as MealState[T]
        }
      }
      case 'fries': {
        const friesState = currentState as FriesState
        switch (componentType) {
          case 'types':
            return { ...friesState, type: component } as MealState[T]
          case 'toppings':
            const existingTopping = friesState.toppings.find(t => t.id === component.id)
            return {
              ...friesState,
              toppings: existingTopping
                ? friesState.toppings.filter(t => t.id !== component.id)
                : [...friesState.toppings, component]
            } as MealState[T]
          default:
            return friesState as MealState[T]
        }
      }
      case 'drink': {
        const drinkState = currentState as DrinkState
        return { ...drinkState, ...component } as MealState[T]
      }
      default:
        return currentState
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-8">Meal Builder</h1>
        
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {Object.entries(mealConfig).map(([type, config]) => (
            <button
              key={type}
              onClick={() => setSelectedMealType(type as MealType)}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all
                ${selectedMealType === type 
                  ? 'bg-blue-500 text-white shadow-lg scale-105' 
                  : 'bg-white hover:bg-gray-50'
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
                <h2 className="text-2xl font-bold">{mealConfig[selectedMealType].name}</h2>
                <div className="flex flex-col items-end gap-2">
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
              <h2 className="text-2xl font-bold mb-6">Preview</h2>
              <div className="mb-8">
                <MealDisplay
                  type={selectedMealType}
                  components={selectedComponents[selectedMealType]}
                />
              </div>

              <button
                onClick={() => console.log('Added to cart:', {
                  type: selectedMealType,
                  components: selectedComponents[selectedMealType],
                  quantity,
                  totalPrice: calculateTotalPrice()
                })}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealDisplayPage