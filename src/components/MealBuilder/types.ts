export type MealType = 'burger' | 'pizza' | 'fries' | 'drink'  // Added 'juice'

// Drink Types
export type DrinkType = 'soda' | 'milkshake' | 'iced-tea' | 'juice'; // Added 'juice'

// Drink Size
export type DrinkSize = 'small' | 'medium' | 'large';

// Soda Flavors
export type SodaFlavor = 
  | 'cola' 
  | 'lemon-lime' 
  | 'root-beer' 
  | 'sprite' 
  | 'fanta' 
  | 'pepsi'; 

// Milkshake Flavors
export type MilkshakeFlavor = 
  | 'vanilla' 
  | 'chocolate' 
  | 'strawberry' 
  | 'cookie-dough' 
  | 'banana' 
  | 'peach' 
  | 'mango'; 

// Iced Tea Flavors
export type TeaFlavor = 
  | 'lemon' 
  | 'peach tea' 
  | 'raspberry tea';

// Juice Flavors
export type JuiceFlavor = 
  | 'apple' 
  | 'orange' 
  | 'grape' 
  | 'pineapple' 
  | 'carrot';  // You can add more juice types as needed

export interface FoodComponent {
  id: number;
  name: string;
  image: string;
  price: number;
}

// 🍔 Burger Components
export interface Bun extends FoodComponent { type: 'bun'; }
export interface Patty extends FoodComponent { type: 'patty';quantity:number }
export interface Cheese extends FoodComponent { type: 'cheese'; quantity: number; }
export interface BurgerTopping extends FoodComponent { type: 'burgerTopping'; quantity: number; }

// 🍕 Pizza Components
export interface Crust extends FoodComponent { type: 'crust'; }
export interface Sauce extends FoodComponent { type: 'sauce'; }
export interface Cheese extends FoodComponent { type: 'cheese'; quantity: number; }
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
  flavorType: SodaFlavor | MilkshakeFlavor | TeaFlavor | JuiceFlavor; // Added JuiceFlavor
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
  flavor: SodaFlavor | MilkshakeFlavor | TeaFlavor | JuiceFlavor | null; // Updated to include JuiceFlavor
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
      cheeses?: Cheese[];
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
      types: DrinkTypeComponent[]; // This now includes 'juice'
      sizes: DrinkSizeComponent[];
      flavors: DrinkFlavorComponent[]; // Flavors now include juices as well
    };
  };
};

