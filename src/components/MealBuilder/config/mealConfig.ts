export const mealConfig = {
  burger: {
    name: 'Build Your Burger',
    components: {
      buns: [
        { id: 1, name: 'Sesame Bun', type: 'bun', image: 'https://images.unsplash.com/photo-1568471173762-f6e1886532d6?w=300&q=80', price: 2.00 },
        { id: 2, name: 'Brioche Bun', type: 'bun', image: 'https://images.unsplash.com/photo-1591985666643-1ecc67616216?w=300&q=80', price: 2.50 },
        { id: 3, name: 'Whole Wheat Bun', type: 'bun', image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=300&q=80', price: 2.75 }
      ],
      patties: [
        { id: 4, name: 'Chicken Patty', type: 'patty', image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?w=300&q=80', price: 4.00 },
        { id: 5, name: 'Beef Patty', type: 'patty', image: 'https://images.unsplash.com/photo-1608767221051-2b9d18f35a2f?w=300&q=80', price: 5.00 },
        { id: 6, name: 'Veggie Patty', type: 'patty', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&q=80', price: 4.50 }
      ],
      toppings: [
        { id: 7, name: 'Lettuce', type: 'burgerTopping', image: 'https://images.unsplash.com/photo-1622205313162-be1d5712a43b?w=300&q=80', price: 0.50 },
        { id: 8, name: 'Tomato', type: 'burgerTopping', image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=300&q=80', price: 0.50 },
        { id: 9, name: 'Cheddar Cheese', type: 'burgerTopping', image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=300&q=80', price: 1.00 },
        { id: 10, name: 'Caramelized Onions', type: 'burgerTopping', image: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=300&q=80', price: 0.75 },
      ],
      cheeses: [
        { id: 11, name: 'Blue Cheese', type: 'burgerTopping', image: 'https://images.unsplash.com/photo-1626957341926-98752fc2ba90?w=300&q=80', price: 1.75 },
        { id: 12, name: 'Swiss Cheese', type: 'burgerTopping', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80', price: 1.25 }
      ]
    }
  },
  pizza: {
    name: 'Build Your Pizza',
    components: {
      crusts: [
        { id: 1, name: 'Thin Crust', type: 'crust', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&q=80', price: 3.00 },
        { id: 2, name: 'Pan Crust', type: 'crust', image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300&q=80', price: 4.00 },
        { id: 3, name: 'Stuffed Crust', type: 'crust', image: 'https://images.unsplash.com/photo-1604382355076-1ff466e40c9a?w=300&q=80', price: 5.00 }
      ],
      sauces: [
        { id: 3, name: 'Tomato Sauce', type: 'sauce', image: 'https://images.unsplash.com/photo-1608334481162-c0e018774f45?w=300&q=80', price: 1.00 },
        { id: 4, name: 'Alfredo Sauce', type: 'sauce', image: 'https://images.unsplash.com/photo-1607528971899-2e89e6c0ec69?w=300&q=80', price: 1.50 },
        { id: 16, name: 'BBQ Sauce', type: 'sauce', image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=300&q=80', price: 1.25 }
      ],
      toppings: [
        { id: 5, name: 'Pepperoni', type: 'pizzaTopping', image: 'https://images.unsplash.com/photo-1627461985459-51600559fffe?w=300&q=80', price: 2.00 },
        { id: 6, name: 'Mushrooms', type: 'pizzaTopping', image: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=300&q=80', price: 1.50 },
        { id: 17, name: 'Black Olives', type: 'pizzaTopping', image: 'https://images.unsplash.com/photo-1604153009489-81e1e2f8e1a2?w=300&q=80', price: 1.25 },
        { id: 18, name: 'Bell Peppers', type: 'pizzaTopping', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&q=80', price: 1.00 }
      ],
      specials: [
        { id: 19, name: 'Prosciutto', type: 'pizzaTopping', image: 'https://images.unsplash.com/photo-1624174503860-478619028ab2?w=300&q=80', price: 3.00 },
        { id: 20, name: 'Truffle Oil', type: 'pizzaTopping', image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=300&q=80', price: 2.50 },
        { id: 21, name: 'Fresh Basil', type: 'pizzaTopping', image: 'https://images.unsplash.com/photo-1600186279172-fda16775aa49?w=300&q=80', price: 1.00 }
      ]
    }
  },
  fries: {
    name: 'Build Your Fries',
    components: {
      types: [
        { id: 1, name: 'Classic Fries', type: 'friesType', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&q=80', price: 3.00 },
        { id: 2, name: 'Curly Fries', type: 'friesType', image: 'https://images.unsplash.com/photo-1593545086735-f4e2c8e02487?w=300&q=80', price: 3.50 }
      ],
      toppings: [
        { id: 3, name: 'Cheese', type: 'friesTopping', image: 'https://images.unsplash.com/photo-1631379578550-7038263db699?w=300&q=80', price: 1.00 },
        { id: 4, name: 'Bacon Bits', type: 'friesTopping', image: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=300&q=80', price: 1.50 }
      ]
    }
  },
  drink: {
    name: 'Choose Your Drink',
    components: {
      types: ['soda', 'milkshake', 'iced_tea'],
      sizes: ['small', 'medium', 'large'],
      flavors: {
        soda: ['cola', 'lemon-lime', 'orange', 'root-beer'],
        milkshake: ['vanilla', 'chocolate', 'strawberry', 'cookie-dough'],
        iced_tea: ['lemon', 'peach', 'raspberry']
      }
    }
  }
};