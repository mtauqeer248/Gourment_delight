/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check } from 'lucide-react';
import type { MealType, MealComponents, MealState, DrinkComponent } from './types';

interface ComponentSelectorProps<T extends MealType> {
  mealType: T;
  config: {
    name: string;
    components: MealComponents[T]['components'];
  };
  selectedComponents: MealState[T];
  onSelect: (componentType: keyof MealComponents[T], component: any) => void;
  onRemove: (componentType: keyof MealComponents[T], component: any) => void; // Function to handle removal
}

export const ComponentSelector = <T extends MealType>({
  mealType,
  config,
  selectedComponents,
  onSelect,
}: ComponentSelectorProps<T>) => {
  // Check if a component is selected
  const isSelected = (componentType: string, component: any) => {
    const state = selectedComponents as any;
    switch (componentType) {
      case 'buns': return state.bun?.id === component.id;
      case 'patties': return state.patty?.id === component.id;
      case 'toppings': 
        return (
          state.toppings?.some((t: any) => t.id === component.id) ||
          state.pizzaToppings?.some((t: any) => t.id === component.id)
        );
      case 'crusts': return state.crust?.id === component.id;
      case 'sauces': return state.sauce?.id === component.id;
      case 'types': return state.type === component.drinkType;
      case 'sizes': return state.size === component.drinkSize;
      case 'flavors': return state.flavor === component.flavorType;
      case 'cheeses': return state.cheeses?.some((c: any) => c.id === component.id);
      default: return false;
    }
  };

  // Ensure `config.components` exists
  if (!config || !config.components) {
    return <div>Error: Configuration is missing or incomplete.</div>;
  }

  console.log("Drink config:", config.components);

  // Render drink options with correct filtering
  const renderDrinkGroup = (componentType: string, options: DrinkComponent[]) => {
    if (!options || options.length === 0) return null;

    let title = '';
    switch (componentType) {
      case 'types': title = 'Select Drink Type'; break;
      case 'sizes': title = 'Select Size'; break;
      case 'flavors': title = 'Select Flavor'; break;
      default: title = componentType;
    }

    return (
      <div key={componentType} className="bg-white p-6 rounded-xl border">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {options.map((option) => {
            if (componentType === 'flavors' && selectedComponents?.type) {
              const allowedFlavors: Record<string, string[]> = {
                soda: ['cola', 'lemon-lime', 'orange', 'root-beer'],
                milkshake: ['vanilla', 'chocolate', 'strawberry', 'cookie-dough'],
                'iced-tea': ['lemon', 'peach', 'raspberry'],
              };
            
              const drinkType = selectedComponents.type ?? ''; // Ensure it's a string
              const flavorType = option.flavorType ?? ''; // Ensure it's a string
            
              if (!allowedFlavors[drinkType]?.includes(flavorType)) {
                return null; // Skip invalid flavors
              }
            }
            
            return (
              <button
                key={option.id}
                onClick={() => onSelect(componentType as keyof MealComponents[T], option)}
                className={`
                  relative p-4 rounded-xl flex flex-col items-center border-2 transition-all
                  ${isSelected(componentType, option) 
                    ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
                    : 'border-gray-200 hover:border-blue-200 bg-white hover:bg-gray-50'
                  }
                `}
                disabled={componentType !== 'types' && !selectedComponents?.type}
              >
                {option.image && (
                  <img 
                    src={option.image}
                    alt={option.name}
                    className="w-24 h-24 object-contain mb-3"
                    loading="lazy"
                  />
                )}
                <span className="text-sm font-semibold text-center mb-1">
                  {option.name}
                </span>
                {option.price > 0 && (
                  <span className="text-sm text-gray-600">
                    +${option.price.toFixed(2)}
                  </span>
                )}
                {isSelected(componentType, option) && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Render non-drink meal components
  const renderComponentGroup = (componentType: string, options: any[]) => {
    if (!options || options.length === 0) return null;

    return (
      <div key={componentType} className="bg-white p-6 rounded-xl border">
        <h3 className="text-xl font-bold mb-4 capitalize">
          {componentType.replace(/([A-Z])/g, ' $1').replace(/(burger|pizza|fries|drinks)Topping/gi, '').trim()}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(componentType as keyof MealComponents[T], option)}
              className={`
                relative p-4 rounded-xl flex flex-col items-center border-2 transition-all
                ${isSelected(componentType, option) 
                  ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
                  : 'border-gray-200 hover:border-blue-200 bg-white hover:bg-gray-50'
                }
              `}
            >
              {option.image && (
                <img 
                  src={option.image}
                  alt={option.name}
                  className="w-24 h-24 object-contain mb-3"
                  loading="lazy"
                />
              )}
              <span className="text-sm font-semibold text-center mb-1">
                {option.name}
                {option.type?.includes('Topping') && (
                  <span className="block mt-1 text-xs text-gray-500">
                    ({option.type.replace('Topping', '')})
                  </span>
                )}
              </span>
              {option.price > 0 && (
                <span className="text-sm text-gray-600">
                  +${option.price.toFixed(2)}
                </span>
              )}
              {isSelected(componentType, option) && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };


  return (
    <div className="space-y-6">
      {mealType === 'drink' ? (
        <div className="space-y-6">
          {['types', 'sizes', 'flavors'].map((componentType) => 
            renderDrinkGroup(componentType, config.components[componentType as keyof typeof config.components] || [])
          )}
        </div>
      ) : (
        Object.entries(config.components).map(([componentType, options]) => 
          renderComponentGroup(componentType, options as any[])
        )
      )}
      
    </div>
  );
};
