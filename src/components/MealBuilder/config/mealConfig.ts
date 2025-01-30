export const mealConfig = {
  burger: {
    name: 'Build Your Burger',
    components: {
      buns: [
        { id: 1, name: 'Sesame Bun', type: 'bun', image: 'https://media.istockphoto.com/id/182895357/photo/sesame-bun.webp?a=1&b=1&s=612x612&w=0&k=20&c=0S6xFadRSLRQKzLLyQuepVGBverNyX6p7SAReAar41U=', price: 2.00 },
        { id: 2, name: 'Brioche Bun', type: 'bun', image: 'https://media.istockphoto.com/id/1016293490/photo/plain-hamburger-bun.webp?a=1&b=1&s=612x612&w=0&k=20&c=mlDOaf-4KAGuXwzIQOYTCSZKhqFLF9GwE-90k86tRzQ=', price: 2.50 },
        { id: 3, name: 'Whole Wheat Bun', type: 'bun', image: 'https://media.istockphoto.com/id/513821730/photo/hamburger-burger-empty-bun-isolated-at-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=f89qWALHvmls5BLsdsFb0xUoLJvmuR8Iuj9XDoxVfps=', price: 2.75 },
        { id: 4, name: 'Gluten-Free Bun', type: 'bun', image: 'https://media.istockphoto.com/id/905698470/photo/bu%C5%82ka-is-the-best-friend-of-the-traveler-on-a-long-road.jpg?s=612x612&w=0&k=20&c=5f8fKOH6M5zJWBoA2Cx_-rCU7-B1Zn9VYEjOJeytVv0=', price: 3.50 }, // New option
      ],
      patties: [
        { id: 4, name: 'Chicken Patty', type: 'patty', image: 'https://media.istockphoto.com/id/1429767578/photo/stack-of-frozen-breaded-fish-patties.jpg?s=612x612&w=0&k=20&c=foeaw2l3K9P0heNawr_8RBjmlfx836hzNV_B97sir7A=', price: 4.00 },
        { id: 5, name: 'Beef Patty', type: 'patty', image: 'https://media.istockphoto.com/id/1342329867/photo/grilled-beef-patties-on-white-background.jpg?s=612x612&w=0&k=20&c=-EzcU3b3ALW-QBX8pHntkXdmCi8ozVdQnuiVKqy2Awg=', price: 5.00 },
        { id: 6, name: 'Veggie Patty', type: 'patty', image: 'https://media.istockphoto.com/id/466586339/photo/vegetable-burgers-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=D5NzjlNaVQs34J8SfWSDamDUnDAQ-mrthnjQ9sc2_ZM=', price: 4.50 },
        { id: 7, name: 'Premium Wagyu Patty', type: 'patty', image: 'https://media.istockphoto.com/id/1190108049/photo/meat-for-burgers-on-white.jpg?s=612x612&w=0&k=20&c=ohRfla1ss54HixzuPGuwgXL5y91L5tcIGFq7YxySoXg=', price: 8.00 }, // Premium option
      ],
      toppings: [
        { id: 7, name: 'Lettuce', type: 'burgerTopping', image: 'https://media.istockphoto.com/id/153491286/photo/fresh-lettuce.jpg?s=612x612&w=0&k=20&c=3TFZXlnvWz4PFSMYe6_CF64vOS7g-C5SD0td6skkGag=', price: 0.50 },
        { id: 8, name: 'Tomato', type: 'burgerTopping', image: 'https://media.istockphoto.com/id/1258142863/photo/tomatoes-isolate-on-white-background-tomato-half-isolated-tomatoes-side-view-whole-cut-slice.jpg?s=612x612&w=0&k=20&c=LXNZwfkHS3LfKvOxUpzFf1iawID63DVYEjeM7fMK-Xk=', price: 0.50 },
        { id: 9, name: 'Caramelized Onions', type: 'burgerTopping', image: 'https://media.istockphoto.com/id/504875582/photo/roasted-onion-pieces.jpg?s=612x612&w=0&k=20&c=aSBHQ2yqm5D9kWx_-T66ry4JhhWWydgAraq5hbcFWzo=', price: 0.75 },
        { id: 10, name: 'Truffle Oil', type: 'burgerTopping', image: 'https://media.istockphoto.com/id/1369748329/photo/truffle-oil-and-black-edible-winter-truffle-on-white-background.jpg?s=612x612&w=0&k=20&c=tWde9p_0SYQp_1PDqmeUlkX22hzLmTVF_HS7nyWoSww=', price: 1.50 }, // Premium topping
      ],
      cheeses: [
        { id: 10, name: 'Blue Cheese', type: 'cheeseTopping', image: 'https://media.istockphoto.com/id/1170421066/photo/brie-cheese-mold-cheese-isolated-on-a-white-background-food-concept-close-up-side-view.jpg?s=612x612&w=0&k=20&c=soATVYrcXmCeymwjY1ZZb4n-9oo17VzEAJ0WWlFSl90=', price: 1.75 },
        { id: 11, name: 'Swiss Cheese', type: 'cheeseTopping', image: 'https://media.istockphoto.com/id/671074270/photo/cheese-wheel.jpg?s=612x612&w=0&k=20&c=vWKReNLD1zJ6NkPMmiF4QfIrid9xdg7_f7YIDRqihL4=', price: 1.25 },
        { id: 12, name: 'Cheddar Cheese', type: 'cheeseTopping', image: 'https://media.istockphoto.com/id/184400475/photo/wedge-of-cheddar-cheese.jpg?s=612x612&w=0&k=20&c=SaUJv4FCmy_S3sg41HGL0V5pXMf-e1vMMZVxWjzpz-s=', price: 1.00 },
        { id: 13, name: 'Goat Cheese', type: 'cheeseTopping', image: 'https://media.istockphoto.com/id/1365851577/photo/row-of-sliced-white-soft-small-goat-cheese-for-a-snack-on-white-background.jpg?s=612x612&w=0&k=20&c=oXK8riFnM_0fhJ7O1fsqNXH8Gdy11fSUamV-137BLLI=', price: 2.00 }, // Premium option
      ]
    }
  },
  pizza: {
    name: 'Build Your Pizza',
    components: {
      crusts: [
        { id: 1, name: 'Thin Crust', type: 'crust', image: 'https://media.istockphoto.com/id/819716748/photo/delicious-pizza-with-with-onions-bacon-and-cherry.jpg?s=612x612&w=0&k=20&c=fsPz9ZFwM7KqFUAr-3aQx0mNt6ujROoC9pPI1uUAJlA=', price: 3.00 },
        { id: 2, name: 'Pan Crust', type: 'crust', image: 'https://media.istockphoto.com/id/664395942/photo/piece-of-pizza-with-mushrooms-isolated.jpg?s=612x612&w=0&k=20&c=UgJNxSnyrWveCAMmYCNzYDSdJxQUmvkPwNuOdSq6zis=', price: 4.00 },
        { id: 3, name: 'Stuffed Crust', type: 'crust', image: 'https://media.istockphoto.com/id/1282433525/photo/italian-pizza-with-speck-mushrooms-and-provolone-cheese.jpg?s=612x612&w=0&k=20&c=WUvreLAVfxgfnzQCqrM0GE5eO4_RQx67DDDjc6jJbWg=', price: 5.00 },
        { id: 4, name: 'Gluten-Free Crust', type: 'crust', image: 'https://media.istockphoto.com/id/1300644725/photo/a-gluten-free-pizza.jpg?s=612x612&w=0&k=20&c=UFcES_Vxq78-v8Rt9DRi0I6CeA8L4JO71YNbWmRS8HA=', price: 6.00 }, // New option
      ],
      sauces: [
        { id: 3, name: 'Tomato Sauce', type: 'sauce', image: 'https://media.istockphoto.com/id/1844970415/photo/tomato-paste-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=kxSIaTU2d-RXMzYNYUYf0FNsLHCV7TAgySmosLOmDl4=', price: 1.00 },
        { id: 4, name: 'Alfredo Sauce', type: 'sauce', image: 'https://media.istockphoto.com/id/1276836438/photo/bechamel.jpg?s=612x612&w=0&k=20&c=3O06492DBeN0adHjl_ZFaGzfJQfa8UPwHlo27Zeauc0=', price: 1.50 },
        { id: 16, name: 'BBQ Sauce', type: 'sauce', image: 'https://media.istockphoto.com/id/1426668957/photo/bowl-of-barbecue-sauce-isolated-on-white.jpg?s=612x612&w=0&k=20&c=aDDWj_nZQ-DwRq8PYBWBzG5Gvi-9WbWUv6IvQufIouM=', price: 1.25 },
      ],
      toppings: [
        { id: 5, name: 'Pepperoni', type: 'pizzaTopping', image: 'https://media.istockphoto.com/id/1257608787/photo/pile-of-turkey-pepperoni-on-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=ezyuGTqpC8mHbkWwOD3AZLBryWYDmmycwNmUe59LCps=', price: 2.00 },
        { id: 6, name: 'Mushrooms', type: 'pizzaTopping', image: 'https://media.istockphoto.com/id/959153470/photo/set-of-fresh-whole-and-sliced-champignons.jpg?s=612x612&w=0&k=20&c=elsqZGL5lhfLnSddkxKnQylYn5hp4VRQOXKYJAf3_QA=', price: 1.50 },
        { id: 17, name: 'Black Olives', type: 'pizzaTopping', image: 'https://media.istockphoto.com/id/185062154/photo/black-olives.jpg?s=612x612&w=0&k=20&c=t59YYFWGT9wJJWtq1gWcKdu8qXyMeFeSFHIZDQaBLsM=', price: 1.00 },
        { id: 19, name: 'Truffle Mushrooms', type: 'pizzaTopping', image: 'https://media.istockphoto.com/id/1268685755/photo/close-up-shot-of-sliced-fresh-black-truffle.jpg?s=612x612&w=0&k=20&c=RW0ORm8u4Vm-gs10LPnxAlyh9Q0grrrx6pfGggLyCco=', price: 3.50 }, // Premium topping
      ],
      cheeses: [
        { id: 10, name: 'Mozzarella Cheese', type: 'cheeseTopping', image: 'https://media.istockphoto.com/id/638560972/photo/circassian-cheese-with-herbs-and-paprika.jpg?s=612x612&w=0&k=20&c=C-oxlTd-CVfb9rxhezAGSGYOdP7hiRxhczhiFr0nH3k=', price: 1.50 },
        { id: 11, name: 'Parmesan Cheese', type: 'cheeseTopping', image: 'https://media.istockphoto.com/id/182436285/photo/pile-of-shredded-parmesan-cheese-against-white-background.jpg?s=612x612&w=0&k=20&c=XHb5GfEvcNuebbJGlr7eAuOFIqUNx9uYTADX2t5cjqY=', price: 2.00 },
        { id: 12, name: 'Ricotta Cheese', type: 'cheeseTopping', image: 'https://media.istockphoto.com/id/1755607056/photo/fresh-ricotta-with-basil-leaf-on-white-background-front-view.jpg?s=612x612&w=0&k=20&c=XXCSU6COD56V58wWb7892HjHmCdlZlsKs0ORRq7HmRc=', price: 2.50 },
      ]
    }
  },
  fries: {
    name: 'Build Your Fries',
    components: {
      types: [
        { id: 1, name: 'Regular Fries', type: 'fries', image: 'https://media.istockphoto.com/id/1409766514/photo/french-fries-isolated-on-white.jpg?s=612x612&w=0&k=20&c=x1bN-3H59wk00yT_tv0OC4MHiejMAAL59oiJgEnjo7o=', price: 2.00 },
        { id: 2, name: 'Sweet Potato Fries', type: 'fries', image: 'https://media.istockphoto.com/id/114338560/photo/a-handful-of-sweet-potato-fries-on-a-white-background.jpg?s=612x612&w=0&k=20&c=5almykE0heUylV9VC76VjziYAxBl8ea8g1pWUXpV1Qg=', price: 2.50 },
        { id: 3, name: 'Curly Fries', type: 'fries', image: 'https://media.istockphoto.com/id/623524302/photo/basket-of-curly-french-fries.jpg?s=612x612&w=0&k=20&c=RWzi26hbabE3BEyXIE1wLAaIjQlVGWd3C2UzVwuE2jU=', price: 2.75 },
        { id: 4, name: 'Loaded Fries', type: 'fries', image: 'https://media.istockphoto.com/id/1425750499/photo/french-fries-topped-with-cheese-served-in-a-bowl-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=ckUCh7jiCjNhoWzgM43P_qyzCdOaLE2_wqLUQa99s78=', price: 4.00 }, // Loaded fries with cheese and toppings
      ],
      toppings: [
        { id: 1, name: 'Cheese', type: 'friesTopping', image: 'https://media.istockphoto.com/id/1234815169/photo/heap-of-slices-cheddar-cheese-close-up.jpg?s=612x612&w=0&k=20&c=T5e6PmvfXf2vLjUeIWT6ieiTE5py_2V_f5Zld6olnf0=', price: 1.00 },
        { id: 2, name: 'Bacon Bits', type: 'friesTopping', image: 'https://media.istockphoto.com/id/113709141/photo/bacon-bits-cut-out-on-white.jpg?s=612x612&w=0&k=20&c=OvwjFDLyUui_joHs86vwY6NEo7gOFqhlpSe1ZAvpuZA=', price: 1.50 },
        { id: 3, name: 'Chili', type: 'friesTopping', image: 'https://media.istockphoto.com/id/1207035346/photo/chili-pepper-and-its-slices-close-up-falling.jpg?s=612x612&w=0&k=20&c=qi_ISarZZq1eNo9l4NWHgnRV82jdNeeOea-gykfWvRg=', price: 1.75 },
        { id: 4, name: 'Garlic Parmesan', type: 'friesTopping', image: 'https://media.istockphoto.com/id/1411857939/photo/shredded-seaweed-fries-served-in-a-dish-isolated-on-white-background-side-view.jpg?s=612x612&w=0&k=20&c=V2hwsquDaIkHhFimdsoTz6VEoUuOaloDuuhRSfvd1sY=', price: 2.00 },
      ]
    }
  },
  drink: {
    name: 'Drink',
  components: {
    types: [
      { id: 1, name: 'Soda', image: 'https://media.istockphoto.com/id/681018122/photo/cola-with-crushed-ice-and-straw-in-tall-glass.jpg?s=612x612&w=0&k=20&c=HeZOi6mZTvdXgdTKQT_sGhlMvS3v7jY4bH4R83Uj9qw=', price: 2.99, type: 'drinkType', drinkType: 'soda' },
      { id: 2, name: 'Milkshake', image: 'https://media.istockphoto.com/id/170169190/photo/a-cinnamon-chocolate-and-strawberry-smoothie.jpg?s=612x612&w=0&k=20&c=d2OUzLUgYVIZ5dPS2RcOfdyjuayIJAXl-b_yXZsYKGo=', price: 4.99, type: 'drinkType', drinkType: 'milkshake' },
      { id: 3, name: 'Iced Tea', image: 'https://media.istockphoto.com/id/690507630/photo/mason-jar-glass-of-iced-tea-with-straw-isolated-on-white.jpg?s=612x612&w=0&k=20&c=IQft93o9oxBZeJrCqfuaWD9PxQ23N8jtEFFQhu5MJ40=', price: 2.99, type: 'drinkType', drinkType: 'iced-tea' },
      { id: 4, name: 'Juice', image: 'https://media.istockphoto.com/id/690507630/photo/mason-jar-glass-of-iced-tea-with-straw-isolated-on-white.jpg?s=612x612&w=0&k=20&c=IQft93o9oxBZeJrCqfuaWD9PxQ23N8jtEFFQhu5MJ40=', price: 1.99, type: 'drinkType', drinkType: 'juice' }
    ],
    
    sizes: [
      { id: 5, name: 'Small', image: '/small.png', price: 0, type: 'drinkSize', drinkSize: 'small' },
      { id: 6, name: 'Medium', image: '/medium.png', price: 1, type: 'drinkSize', drinkSize: 'medium' },
      { id: 7, name: 'Large', image: '/large.png', price: 2, type: 'drinkSize', drinkSize: 'large' }
    ],
    
    flavors: [
      { id: 8, name: 'Cola', image: 'https://media.istockphoto.com/id/681015252/photo/cola-with-ice-and-straw-in-takeaway-cup.jpg?s=612x612&w=0&k=20&c=jiWQqakwyDATBqen3YcTTfbj3U0HYaovEYWlqwlBu0M=', price: 0, type: 'drinkFlavor', flavorType: 'cola' },
      { id: 9, name: 'Vanilla', image: 'https://media.istockphoto.com/id/515634593/photo/vanilla-milk-shake-with-vanilla-beans-on-reflective-white-background.jpg?s=612x612&w=0&k=20&c=JgOgAUC1CxMkP4G-LH7xamxYltnFrWNmiDxG-11gDpU=', price: 0, type: 'drinkFlavor', flavorType: 'vanilla' },
      { id: 10, name: 'Lemon', image: 'https://media.istockphoto.com/id/690507630/photo/mason-jar-glass-of-iced-tea-with-straw-isolated-on-white.jpg?s=612x612&w=0&k=20&c=IQft93o9oxBZeJrCqfuaWD9PxQ23N8jtEFFQhu5MJ40=', price: 0, type: 'drinkFlavor', flavorType: 'lemon' },
      { id: 11, name: 'Orange Juice', image: 'https://media.istockphoto.com/id/1259685966/photo/fresh-orange-juice-in-a-glass-with-slices-and-leaves.jpg?s=612x612&w=0&k=20&c=eBzntmtbxtb6nKrKbZ_jZjP61o9Awq5b1O4UjrtRkl0=', price: 0, type: 'drinkFlavor', flavorType: 'orange' },
      { id: 12, name: 'Grape Juice', image: 'https://media.istockphoto.com/id/157822067/photo/fresh-juice-from-grape-and-grape-fruits.jpg?s=612x612&w=0&k=20&c=4Wsyfm0-vK3uh4w7EQLHp48fGbMzfRxirH8xj2ck20A=', price: 0, type: 'drinkFlavor', flavorType: 'grape' },
      { id: 13, name: 'Strawberry Milkshake', image: 'https://media.istockphoto.com/id/1371521186/photo/strawberry-milkshake-in-glass-cup.jpg?s=612x612&w=0&k=20&c=G-3IWzFQER-oL3av3lElFTjsHDx7vl0jvWzntjqO6ls=', price: 0, type: 'drinkFlavor', flavorType: 'strawberry' },
      { id: 14, name: 'Chocolate Milkshake', image: 'https://media.istockphoto.com/id/918901416/photo/chocolate-milkshake-with-chocolate-chips-and-cocoa-powder.jpg?s=612x612&w=0&k=20&c=8pt5De68yQOQ5FqteSHKfYQ_hgCUiZIGYHfO4s60hCU=', price: 0, type: 'drinkFlavor', flavorType: 'chocolate' },
      { id: 15, name: 'Mint Mojito', image: 'https://media.istockphoto.com/id/933573374/photo/refreshing-mint-mojito-cocktail.jpg?s=612x612&w=0&k=20&c=zI0mLS9rbP-Sdp1oMI7ZshP0sd-q1eI1P-VdTLqL-bc=', price: 0, type: 'drinkFlavor', flavorType: 'mint' },
      { id: 16, name: 'Banana Milkshake', image: 'https://media.istockphoto.com/id/1173955324/photo/banana-milkshake.jpg?s=612x612&w=0&k=20&c=Exbq1-GJbIV_-ljbFSr5_LSo4ABHHLWkgpF7ZfSKffY=', price: 0, type: 'drinkFlavor', flavorType: 'banana' },
      { id: 17, name: 'Peach Milkshake', image: 'https://media.istockphoto.com/id/1080739226/photo/fresh-peach-milkshake.jpg?s=612x612&w=0&k=20&c=Vg-Ld7CBQFwB6AO-K6PL4_6yoj8v1Mjm63uYP2hgqGk=', price: 0, type: 'drinkFlavor', flavorType: 'peach' },
      { id: 18, name: 'Mango Milkshake', image: 'https://media.istockphoto.com/id/1237556079/photo/mango-milkshake.jpg?s=612x612&w=0&k=20&c=Qgh8PphJ1wJlF2XY8T-GF5cKjoB2ltuwv6TZdsHse3A=', price: 0, type: 'drinkFlavor', flavorType: 'mango' },
      { id: 19, name: 'Sprite', image: 'https://media.istockphoto.com/id/1080485260/photo/sprite-soda-with-ice-cubes.jpg?s=612x612&w=0&k=20&c=J0l09gGIR-sZv0gG0eG9vDWaHYxVskLzeKYxOexje2w=', price: 0, type: 'drinkFlavor', flavorType: 'sprite' },
      { id: 20, name: 'Fanta', image: 'https://media.istockphoto.com/id/1229004690/photo/fanta-soda-in-can.jpg?s=612x612&w=0&k=20&c=w8kl7y6FFSZMG3DX0JUtkk_4CyjO-oGA2tpfqBhv_zM=', price: 0, type: 'drinkFlavor', flavorType: 'fanta' },
      { id: 21, name: 'Pepsi', image: 'https://media.istockphoto.com/id/1177807602/photo/pepsi-cola-cans.jpg?s=612x612&w=0&k=20&c=Ow7dkxo-4gM6V0_xTso6QgX5fmb_jSyk0CO-PRHlfX4=', price: 0, type: 'drinkFlavor', flavorType: 'pepsi' },
      { id: 22, name: 'Apple Juice', image: 'https://media.istockphoto.com/id/1080768408/photo/apple-juice.jpg?s=612x612&w=0&k=20&c=1oqG1kT6qx_mWzYg_6_27nlBQ7FLdDgxz88JfktcT2M=', price: 0, type: 'drinkFlavor', flavorType: 'apple' },
      { id: 23, name: 'Pineapple Juice', image: 'https://media.istockphoto.com/id/962149778/photo/pineapple-juice.jpg?s=612x612&w=0&k=20&c=DTJ1Ae6_d8e-kBQLO8VX8QU2b3zHhNcYr6bmZ-8E-VI=', price: 0, type: 'drinkFlavor', flavorType: 'pineapple' },
      { id: 24, name: 'Carrot Juice', image: 'https://media.istockphoto.com/id/688734446/photo/fresh-carrot-juice.jpg?s=612x612&w=0&k=20&c=2Wmj2Icjts5Zdb0zm-E6IFP7dPzbrYXrpx-uQpMGZb0=', price: 0, type: 'drinkFlavor', flavorType: 'carrot' }
    ]
    
  }
  },
};