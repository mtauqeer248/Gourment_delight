export type MealType = 'burger' | 'pizza' | 'fries' | 'drink';
export type DrinkType = 'soda' | 'milkshake' | 'iced-tea';
export type DrinkSize = 'small' | 'medium' | 'large';
export type SodaFlavor = 'cola' | 'lemon-lime' | 'orange' | 'root-beer';
export type MilkshakeFlavor = 'vanilla' | 'chocolate' | 'strawberry' | 'cookie-dough';
export type TeaFlavor = 'lemon' | 'peach' | 'raspberry';

export interface FoodComponent {
  id: number;
  name: string;
  type: string;
  image: string;
  price: number;
}

export interface Bun extends FoodComponent { type: 'bun' }
export interface Patty extends FoodComponent { type: 'patty' }
export interface BurgerTopping extends FoodComponent { type: 'burgerTopping' }
export interface Crust extends FoodComponent { type: 'crust' }
export interface Sauce extends FoodComponent { type: 'sauce' }
export interface PizzaTopping extends FoodComponent { type: 'pizzaTopping' }
export interface FriesType extends FoodComponent { type: 'friesType' }
export interface FriesTopping extends FoodComponent { type: 'friesTopping' }

export interface BurgerState {
  bun: Bun | null;
  patty: Patty | null;
  toppings: BurgerTopping[];
}

export interface PizzaState {
  crust: Crust | null;
  sauce: Sauce | null;
  toppings: PizzaTopping[];
}

export interface FriesState {
  type: FriesType | null;
  toppings: FriesTopping[];
}

export interface DrinkState {
  type: DrinkType;
  size: DrinkSize;
  flavor: SodaFlavor | MilkshakeFlavor | TeaFlavor;
}

export type MealState = {
  [K in MealType]: K extends 'burger' ? BurgerState :
    K extends 'pizza' ? PizzaState :
    K extends 'fries' ? FriesState :
    DrinkState
};

export type MealComponents = {
  [key in MealType]: {
    name: string;
    components: {
      burger: {
        buns: Bun[];
        patties: Patty[];
        toppings: BurgerTopping[];
        cheeses?: BurgerTopping[];
      };
      pizza: {
        crusts: Crust[];
        sauces: Sauce[];
        toppings: PizzaTopping[];
        specials?: PizzaTopping[];
      };
      fries: {
        types: FriesType[];
        toppings: FriesTopping[];
        dips?: Sauce[];
      };
      drink: {
        types: DrinkType[];
        sizes: DrinkSize[];
        flavors: {
          soda: SodaFlavor[];
          milkshake: MilkshakeFlavor[];
          iced_tea: TeaFlavor[];
        };
      };
    };
  };
};