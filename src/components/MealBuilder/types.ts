export type MealType = 'burger' | 'pizza' | 'fries' | 'drink';
export type DrinkType = 'soda' | 'milkshake' | 'iced-tea';
export type DrinkSize = 'small' | 'medium' | 'large';
export type SodaFlavor = 'cola' | 'lemon-lime' | 'orange' | 'root-beer';
export type MilkshakeFlavor = 'vanilla' | 'chocolate' | 'strawberry' | 'cookie-dough';
export type TeaFlavor = 'lemon' | 'peach' | 'raspberry';

export interface FoodComponent {
  id: number;
  name: string;
  image: string;
  price: number;
}

// 🍔 Burger Components
export interface Bun extends FoodComponent { type: 'bun'; }
export interface Patty extends FoodComponent { type: 'patty'; }
export interface Cheese extends FoodComponent { type: 'cheese'; quantity: number; }
export interface BurgerTopping extends FoodComponent { type: 'burgerTopping'; quantity: number; }

// 🍕 Pizza Components
export interface Crust extends FoodComponent { type: 'crust'; }
export interface Sauce extends FoodComponent { type: 'sauce'; }
export interface PizzaTopping extends FoodComponent { type: 'pizzaTopping'; quantity: number; }

// 🍟 Fries Components
export interface FriesType extends FoodComponent { type: 'friesType'; }
export interface FriesTopping extends FoodComponent { type: 'friesTopping'; quantity: number; }

// 🥤 Drink Components (Fixed!)
export interface DrinkTypeComponent extends FoodComponent {
  type: 'drinkType';
  drinkType: DrinkType;
}

export interface DrinkSizeComponent extends FoodComponent {
  type: 'drinkSize';
  drinkSize: DrinkSize;
}

export interface DrinkFlavorComponent extends FoodComponent {
  type: 'drinkFlavor';
  flavorType: SodaFlavor | MilkshakeFlavor | TeaFlavor;
}

export type DrinkComponent = DrinkTypeComponent | DrinkSizeComponent | DrinkFlavorComponent;

// 🍔 Burger State
export interface BurgerState {
  bun: Bun | null;
  patty: Patty | null;
  cheeses: Cheese[];
  toppings: BurgerTopping[];
}

// 🍕 Pizza State
export interface PizzaState {
  crust: Crust | null;
  sauce: Sauce | null;
  cheeses: Cheese[];
  toppings: PizzaTopping[];
}

// 🍟 Fries State
export interface FriesState {
  type: FriesType | null;
  toppings: FriesTopping[];
}

// 🥤 Drink State
export interface DrinkState {
  type: DrinkType | null;
  size: DrinkSize | null;
  flavor: SodaFlavor | MilkshakeFlavor | TeaFlavor | null;
}

// 🥘 Meal State
export type MealState = {
  burger: BurgerState;
  pizza: PizzaState;
  fries: FriesState;
  drink: DrinkState;
};

// 🥘 Meal Components
export type MealComponents = {
  burger: {
    name: 'Burger';
    components: {
      buns: Bun[];
      patties: Patty[];
      toppings: BurgerTopping[];
      cheeses?: Cheese[];
    };
  };
  pizza: {
    name: 'Pizza';
    components: {
      crusts: Crust[];
      sauces: Sauce[];
      toppings: PizzaTopping[];
      specials?: PizzaTopping[];
    };
  };
  fries: {
    name: 'Fries';
    components: {
      types: FriesType[];
      toppings: FriesTopping[];
      dips?: Sauce[];
    };
  };
  drink: {
    name: 'Drink';
    components: {
      types: DrinkTypeComponent[];
      sizes: DrinkSizeComponent[];
      flavors: DrinkFlavorComponent[];
    };
  };
};
