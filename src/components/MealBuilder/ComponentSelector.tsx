import { Check } from 'lucide-react';
import type { MealType, MealComponents, MealState, DrinkState } from './types';

interface ComponentSelectorProps<T extends MealType> {
  mealType: T;
  config: {
    name: string;
    components: MealComponents[T]['components'];
  };
  selectedComponents: MealState[T];
  onSelect: (componentType: keyof MealComponents[T], component: any) => void;
}

export const ComponentSelector = <T extends MealType>({
  mealType,
  config,
  selectedComponents,
  onSelect
}: ComponentSelectorProps<T>) => {
  if (mealType === 'drink') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border">
            <label className="block text-md font-semibold mb-2">Drink Type</label>
            <select
              value={(selectedComponents as DrinkState).type}
              onChange={(e) => onSelect('types', { type: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
            >
              {config.components.types.map((type) => (
                <option key={type} value={type}>
                  {type.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded-xl border">
            <label className="block text-md font-semibold mb-2">Size</label>
            <select
              value={(selectedComponents as DrinkState).size}
              onChange={(e) => onSelect('sizes', { size: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
            >
              {config.components.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded-xl border">
            <label className="block text-md font-semibold mb-2">Flavor</label>
            <select
              value={(selectedComponents as DrinkState).flavor}
              onChange={(e) => onSelect('flavors', { flavor: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
            >
              {(selectedComponents as DrinkState).type === 'soda'
                ? config.components.flavors.soda.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor.replace('-', ' ').toUpperCase()}
                    </option>
                  ))
                : (selectedComponents as DrinkState).type === 'milkshake'
                ? config.components.flavors.milkshake.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor.replace('-', ' ').toUpperCase()}
                    </option>
                  ))
                : config.components.flavors.iced_tea.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor.toUpperCase()}
                    </option>
                  ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  const isSelected = (componentType: string, component: any) => {
    const state = selectedComponents as any;
    switch (componentType) {
      case 'buns': return state.bun?.id === component.id;
      case 'patties': return state.patty?.id === component.id;
      case 'toppings': return state.toppings.some((t: any) => t.id === component.id);
      case 'crusts': return state.crust?.id === component.id;
      case 'sauces': return state.sauce?.id === component.id;
      case 'types': return state.type?.id === component.id;
      default: return false;
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(config.components).map(([componentType, options]) => (
        <div key={componentType} className="bg-white p-6 rounded-xl border">
          <h3 className="text-xl font-bold mb-4 capitalize">
            {componentType.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.isArray(options) && options.map((option) => (
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
      ))}
    </div>
  );
};