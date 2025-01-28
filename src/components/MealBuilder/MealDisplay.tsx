import type { 
  MealType, 
  BurgerState, 
  PizzaState, 
  FriesState, 
  DrinkState 
} from './types';

interface MealDisplayProps {
  type: MealType;
  components: BurgerState | PizzaState | FriesState | DrinkState;
}

const BurgerDisplay: React.FC<BurgerState> = ({ bun, patty, toppings }) => (
  <div className="space-y-2">
    {bun && <img src={bun.image} alt={bun.name} className="w-48 mx-auto" />}
    {patty && <img src={patty.image} alt={patty.name} className="w-48 mx-auto" />}
    <div className="flex flex-wrap gap-2 justify-center">
      {toppings.map((topping) => (
        <img 
          key={topping.id} 
          src={topping.image} 
          alt={topping.name} 
          className="w-24" 
        />
      ))}
    </div>
    {bun && (
      <img 
        src={bun.image} 
        alt={bun.name} 
        className="w-48 mx-auto rotate-180" 
      />
    )}
  </div>
);

const PizzaDisplay: React.FC<PizzaState> = ({ crust, sauce, toppings }) => (
  <div className="relative w-64 h-64 mx-auto">
    {crust && (
      <img 
        src={crust.image} 
        alt={crust.name} 
        className="absolute inset-0 w-full h-full" 
      />
    )}
    {sauce && (
      <img 
        src={sauce.image} 
        alt={sauce.name} 
        className="absolute inset-0 w-full h-full opacity-75" 
      />
    )}
    <div className="absolute inset-0 flex flex-wrap justify-center items-center">
      {toppings.map((topping) => (
        <img 
          key={topping.id} 
          src={topping.image} 
          alt={topping.name} 
          className="w-16 h-16" 
        />
      ))}
    </div>
  </div>
);

const FriesDisplay: React.FC<FriesState> = ({ type, toppings }) => (
  <div className="flex flex-col items-center gap-4">
    {type && <img src={type.image} alt={type.name} className="w-48" />}
    <div className="flex gap-2">
      {toppings.map((topping) => (
        <img 
          key={topping.id} 
          src={topping.image} 
          alt={topping.name} 
          className="w-24" 
        />
      ))}
    </div>
  </div>
);

const DrinkDisplay: React.FC<DrinkState> = ({ type, size, flavor }) => (
  <div className="text-center space-y-2">
    <div className="text-xl font-bold capitalize">{type}</div>
    <div className="text-lg capitalize">{flavor.replace('-', ' ')}</div>
    <div className="text-gray-600 capitalize">({size})</div>
  </div>
);

export const MealDisplay: React.FC<MealDisplayProps> = ({ type, components }) => {
  switch (type) {
    case 'burger':
      return <BurgerDisplay {...components as BurgerState} />;
    case 'pizza':
      return <PizzaDisplay {...components as PizzaState} />;
    case 'fries':
      return <FriesDisplay {...components as FriesState} />;
    case 'drink':
      return <DrinkDisplay {...components as DrinkState} />;
    default:
      return null;
  }
};