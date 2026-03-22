// =====================================================
//  script.js — All the logic for Plan My Plate
// =====================================================
//  This file controls WHAT HAPPENS when you interact.
//  Saving recipes, filtering, planning, shopping list.
// =====================================================


// =====================================================
//  SECTION A: CONSTANTS
//  These never change — fixed lists we use everywhere
// =====================================================

const DAYS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner'];


// =====================================================
//  SECTION B: PREDEFINED RECIPES (32 famous dishes)
//  id is NEGATIVE so they never clash with user recipes
//  (user recipe IDs are positive — from Date.now())
// =====================================================

const PREDEFINED = [

  // ── 🇮🇳 INDIAN ──────────────────────────────────
  { id:-1, emoji:'🍛', name:'Butter Chicken', cuisine:'Indian', type:'nonveg', category:'🍛 Dinner', time:'45 mins',
    ingredients:`500g chicken thighs\n1 cup tomato puree\n1 cup heavy cream\n2 tbsp butter\n1 onion, chopped\n2 tsp garam masala\n1 tsp turmeric\n1 tsp cumin\n1 tbsp ginger-garlic paste\nSalt to taste`,
    instructions:`1. Marinate chicken with ginger-garlic paste, turmeric, cumin, salt for 30 min.\n2. Grill or pan-fry chicken until golden. Set aside.\n3. Melt butter, sauté onions until golden.\n4. Add tomato puree, garam masala, cook 10 min.\n5. Pour in cream, stir well.\n6. Add chicken, simmer 10 min.\n7. Serve hot with naan or rice.`},

  { id:-2, emoji:'🥘', name:'Palak Paneer', cuisine:'Indian', type:'veg', category:'🍛 Dinner', time:'35 mins',
    ingredients:`250g paneer, cubed\n4 cups spinach\n1 onion, chopped\n2 tomatoes\n1 tsp cumin seeds\n1 tsp garam masala\n1 tsp ginger-garlic paste\n2 tbsp oil\nSalt, cream to taste`,
    instructions:`1. Blanch spinach in boiling water 2 min, blend smooth.\n2. Fry paneer cubes until golden. Set aside.\n3. Heat oil, add cumin seeds, onion — sauté until golden.\n4. Add tomatoes, ginger-garlic, garam masala. Cook 5 min.\n5. Add spinach puree, simmer 5 min.\n6. Add paneer, cook 3 more min.\n7. Finish with cream, serve with roti.`},

  { id:-3, emoji:'🍚', name:'Biryani', cuisine:'Indian', type:'nonveg', category:'🍛 Dinner', time:'60 mins',
    ingredients:`2 cups basmati rice\n500g chicken\n1 cup yogurt\n2 onions, sliced\n2 tsp biryani masala\n1 tsp turmeric\nSaffron in warm milk\nFresh mint & coriander\nGhee, oil, salt`,
    instructions:`1. Soak rice 30 min, par-boil with whole spices until 70% done.\n2. Marinate chicken with yogurt, biryani masala, turmeric.\n3. Fry onions until crispy golden.\n4. Layer: chicken → rice → onions → mint → saffron milk.\n5. Seal pot with foil and lid. Dum cook on low heat 25 min.\n6. Gently mix and serve with raita.`},

  { id:-4, emoji:'🫓', name:'Chole Bhature', cuisine:'Indian', type:'veg', category:'🥗 Lunch', time:'40 mins',
    ingredients:`2 cups chickpeas (cooked)\n2 tomatoes, chopped\n1 onion, chopped\n1 tsp cumin\n1 tsp chole masala\n1 tsp amchur powder\nFor bhature: 2 cups maida, yogurt, oil for frying`,
    instructions:`1. Sauté onions, add tomatoes, cook until mushy.\n2. Add chickpeas, chole masala, amchur, 1 cup water.\n3. Simmer 15 min until thick and rich.\n4. For bhature: knead maida with yogurt and salt. Rest 20 min.\n5. Roll into ovals, deep-fry until puffed and golden.\n6. Serve chole with hot bhature and onion rings.`},

  { id:-5, emoji:'🍲', name:'Dal Tadka', cuisine:'Indian', type:'veg', category:'🍛 Dinner', time:'30 mins',
    ingredients:`1 cup yellow lentils (toor dal)\n1 tomato, chopped\n1 onion, chopped\n1 tsp cumin seeds\n1 tsp turmeric\n1 tsp red chili powder\n2 tbsp ghee\n2 garlic cloves`,
    instructions:`1. Pressure cook dal with tomato, turmeric, salt until soft.\n2. Mash dal lightly.\n3. Heat ghee, add cumin seeds until they splutter.\n4. Add garlic, onion — fry golden.\n5. Add chili powder, pour over dal.\n6. Stir and serve with rice or roti.`},

  { id:-6, emoji:'🥞', name:'Masala Dosa', cuisine:'Indian', type:'veg', category:'🍳 Breakfast', time:'30 mins',
    ingredients:`2 cups dosa batter (fermented)\n3 potatoes, boiled & mashed\n1 onion, sliced\n1 tsp mustard seeds\n1 tsp turmeric\nCurry leaves, green chili\nOil, salt`,
    instructions:`1. Heat oil, add mustard seeds and curry leaves.\n2. Add onion and green chili, sauté until soft.\n3. Add mashed potato, turmeric, salt — mix well.\n4. Spread dosa batter thin on hot griddle.\n5. Drizzle oil, cook until crisp.\n6. Place potato filling in center, fold.\n7. Serve with sambar and coconut chutney.`},

  // ── 🇮🇹 ITALIAN ─────────────────────────────────
  { id:-7, emoji:'🍝', name:'Spaghetti Carbonara', cuisine:'Italian', type:'nonveg', category:'🍛 Dinner', time:'25 mins',
    ingredients:`400g spaghetti\n200g pancetta or bacon\n4 egg yolks\n1 cup Pecorino Romano, grated\nBlack pepper\nSalt`,
    instructions:`1. Cook spaghetti in salted water until al dente.\n2. Fry pancetta until crispy — do NOT add oil.\n3. Whisk egg yolks with cheese and black pepper.\n4. Reserve 1 cup pasta water.\n5. Off the heat, mix pasta with pancetta.\n6. Add egg mixture quickly, toss with pasta water to create creamy sauce.\n7. Serve immediately with extra cheese.`},

  { id:-8, emoji:'🍕', name:'Margherita Pizza', cuisine:'Italian', type:'veg', category:'🍛 Dinner', time:'40 mins',
    ingredients:`Pizza dough (250g flour, yeast, water)\n200g tomato sauce\n200g fresh mozzarella\nFresh basil leaves\nOlive oil, salt`,
    instructions:`1. Make dough: mix flour, yeast, salt, warm water. Knead 10 min. Rest 1 hour.\n2. Stretch dough into thin round.\n3. Spread tomato sauce, add torn mozzarella.\n4. Bake at 250°C (480°F) for 10-12 min until crust is golden.\n5. Top with fresh basil and a drizzle of olive oil.\n6. Slice and serve immediately.`},

  { id:-9, emoji:'🍜', name:'Fettuccine Alfredo', cuisine:'Italian', type:'veg', category:'🍛 Dinner', time:'20 mins',
    ingredients:`400g fettuccine\n100g butter\n200g Parmesan, grated\nSalt, black pepper\nPasta water`,
    instructions:`1. Cook fettuccine in salted boiling water until al dente.\n2. Melt butter in a pan over low heat.\n3. Drain pasta, reserving 1 cup water.\n4. Toss pasta in butter, add Parmesan gradually.\n5. Add pasta water to make silky sauce.\n6. Season with pepper and serve immediately.`},

  { id:-10, emoji:'🥗', name:'Caprese Salad', cuisine:'Italian', type:'veg', category:'🥗 Lunch', time:'10 mins',
    ingredients:`3 large tomatoes\n250g fresh mozzarella\nFresh basil leaves\nExtra virgin olive oil\nBalsamic glaze, salt, pepper`,
    instructions:`1. Slice tomatoes and mozzarella into equal rounds.\n2. Alternate tomato, mozzarella, and basil on a plate.\n3. Drizzle generously with olive oil.\n4. Drizzle balsamic glaze on top.\n5. Season with salt and pepper. Serve fresh.`},

  // ── 🇨🇳 CHINESE ─────────────────────────────────
  { id:-11, emoji:'🍜', name:'Kung Pao Chicken', cuisine:'Chinese', type:'nonveg', category:'🍛 Dinner', time:'30 mins',
    ingredients:`400g chicken breast, cubed\n1/2 cup peanuts\n4 dried red chilies\n3 garlic cloves\n1 tsp Sichuan peppercorn\n2 tbsp soy sauce\n1 tbsp rice vinegar\n1 tbsp sugar\n1 tsp cornstarch\nOil, spring onions`,
    instructions:`1. Marinate chicken with soy sauce, cornstarch 15 min.\n2. Heat oil, fry dried chilies and peppercorns 30 sec.\n3. Add chicken, stir-fry until cooked.\n4. Add garlic, peanuts, fry 1 min.\n5. Mix soy sauce, vinegar, sugar — pour over.\n6. Toss well, garnish with spring onions.\n7. Serve with steamed rice.`},

  { id:-12, emoji:'🥟', name:'Dumplings (Jiaozi)', cuisine:'Chinese', type:'nonveg', category:'🥗 Lunch', time:'50 mins',
    ingredients:`2 cups flour\n200g pork mince\n1 cup cabbage, chopped fine\n1 tbsp soy sauce\n1 tsp sesame oil\n1 tsp ginger, grated\nSalt, warm water`,
    instructions:`1. Mix flour with warm water to form smooth dough. Rest 30 min.\n2. Combine pork, cabbage, soy, sesame oil, ginger, salt.\n3. Roll dough thin, cut into circles.\n4. Fill each with pork mixture, fold and seal edges.\n5. Boil dumplings in batches until they float + 2 more min.\n6. Serve with soy sauce and chili oil for dipping.`},

  { id:-13, emoji:'🍚', name:'Egg Fried Rice', cuisine:'Chinese', type:'veg', category:'🥗 Lunch', time:'15 mins',
    ingredients:`3 cups cooked rice (day-old)\n3 eggs\n1 cup mixed vegetables\n3 tbsp soy sauce\n2 garlic cloves\n2 tbsp oil\nSpring onions`,
    instructions:`1. Heat oil in wok on high heat.\n2. Add garlic, fry 30 sec.\n3. Push aside, scramble eggs.\n4. Add vegetables, stir-fry 2 min.\n5. Add rice, break up clumps, toss well.\n6. Add soy sauce, mix everything together.\n7. Garnish with spring onions and serve.`},

  // ── 🇲🇽 MEXICAN ─────────────────────────────────
  { id:-14, emoji:'🌮', name:'Chicken Tacos', cuisine:'Mexican', type:'nonveg', category:'🍛 Dinner', time:'30 mins',
    ingredients:`500g chicken breast\n8 small corn tortillas\n1 tsp cumin\n1 tsp paprika\n1 tsp garlic powder\nLime juice\nSalsa, avocado, sour cream\nFresh cilantro`,
    instructions:`1. Season chicken with cumin, paprika, garlic powder, lime, salt.\n2. Grill or pan-fry chicken 6-7 min each side. Slice thin.\n3. Warm tortillas on a dry pan.\n4. Fill tortillas with chicken slices.\n5. Top with salsa, avocado, sour cream.\n6. Finish with fresh cilantro and a squeeze of lime.`},

  { id:-15, emoji:'🫔', name:'Guacamole', cuisine:'Mexican', type:'veg', category:'🥤 Snack', time:'10 mins',
    ingredients:`3 ripe avocados\n1 lime, juiced\n1 small red onion, diced\n2 tomatoes, diced\n1 jalapeño, minced\nFresh cilantro\nSalt`,
    instructions:`1. Halve avocados, remove pit, scoop into bowl.\n2. Mash with a fork to desired chunky texture.\n3. Add lime juice immediately to prevent browning.\n4. Mix in onion, tomato, jalapeño, cilantro.\n5. Season with salt.\n6. Serve with tortilla chips.`},

  { id:-16, emoji:'🌯', name:'Beef Burrito', cuisine:'Mexican', type:'nonveg', category:'🍛 Dinner', time:'35 mins',
    ingredients:`400g ground beef\n4 large flour tortillas\n1 can black beans\n1 cup cooked rice\n1 cup salsa\n1 cup cheddar cheese\nSour cream, cumin, chili powder`,
    instructions:`1. Brown beef with cumin and chili powder.\n2. Warm beans and rice separately.\n3. Warm tortillas.\n4. Layer rice, beans, beef, salsa, cheese on each tortilla.\n5. Fold sides in, roll tightly.\n6. Toast in a pan for 1-2 min per side for a crispy wrap.\n7. Serve with sour cream and extra salsa.`},

  // ── 🇺🇸 AMERICAN ────────────────────────────────
  { id:-17, emoji:'🍔', name:'Classic Cheeseburger', cuisine:'American', type:'nonveg', category:'🍛 Dinner', time:'25 mins',
    ingredients:`500g ground beef\n4 burger buns\n4 cheddar slices\nLettuce, tomato, onion\nPickles\nKetchup, mustard, mayo`,
    instructions:`1. Form beef into 4 patties, season with salt and pepper.\n2. Grill or pan-fry on high heat 3-4 min per side.\n3. Add cheese slice in last 1 min to melt.\n4. Toast buns on the grill.\n5. Spread mayo on bun, add lettuce, tomato, onion, pickles.\n6. Place patty, add ketchup and mustard.\n7. Serve with fries.`},

  { id:-18, emoji:'🥞', name:'Fluffy Pancakes', cuisine:'American', type:'veg', category:'🍳 Breakfast', time:'20 mins',
    ingredients:`1.5 cups flour\n2 tsp baking powder\n1 tbsp sugar\n1 cup milk\n1 egg\n2 tbsp melted butter\nPinch of salt\nMaple syrup, butter to serve`,
    instructions:`1. Whisk flour, baking powder, sugar, and salt.\n2. In another bowl, mix milk, egg, and melted butter.\n3. Combine wet and dry ingredients — don't overmix (lumps are fine!).\n4. Heat a pan on medium, butter lightly.\n5. Pour 1/4 cup batter per pancake.\n6. Cook until bubbles form on top, flip, cook 1 more min.\n7. Serve stacked with maple syrup and butter.`},

  { id:-19, emoji:'🍗', name:'BBQ Ribs', cuisine:'American', type:'nonveg', category:'🍛 Dinner', time:'3 hrs',
    ingredients:`1 rack pork ribs\n1 cup BBQ sauce\n2 tbsp brown sugar\n1 tsp paprika\n1 tsp garlic powder\n1 tsp onion powder\nSalt, black pepper`,
    instructions:`1. Mix brown sugar, paprika, garlic, onion powder, salt, pepper — rub all over ribs.\n2. Wrap in foil, bake at 150°C (300°F) for 2.5 hours.\n3. Unwrap, brush with BBQ sauce.\n4. Grill on high heat 5-7 min per side until caramelized.\n5. Slice and serve with coleslaw and corn.`},

  // ── 🇯🇵 JAPANESE ────────────────────────────────
  { id:-20, emoji:'🍣', name:'Salmon Sushi Rolls', cuisine:'Japanese', type:'nonveg', category:'🍛 Dinner', time:'40 mins',
    ingredients:`2 cups sushi rice\n3 tbsp rice vinegar\n200g fresh salmon\n4 nori sheets\n1 avocado\n1 cucumber\nSoy sauce, wasabi, pickled ginger`,
    instructions:`1. Cook sushi rice, season with rice vinegar, sugar, salt while warm.\n2. Place nori on bamboo mat, spread rice evenly (leave 1cm border).\n3. Lay salmon, avocado, cucumber strips in center.\n4. Roll tightly using the mat, seal edge with water.\n5. Slice into 6-8 pieces with a wet knife.\n6. Serve with soy sauce, wasabi, and pickled ginger.`},

  { id:-21, emoji:'🍜', name:'Ramen', cuisine:'Japanese', type:'nonveg', category:'🍛 Dinner', time:'50 mins',
    ingredients:`2 packs ramen noodles\n4 cups chicken broth\n2 tbsp soy sauce\n1 tbsp miso paste\n2 soft-boiled eggs\n200g chashu pork (or chicken)\nNori, spring onions, corn, bamboo shoots`,
    instructions:`1. Boil broth, add soy sauce and miso. Simmer 20 min.\n2. Cook noodles per packet, drain.\n3. Soft-boil eggs: 6.5 min in boiling water, soak in soy + mirin.\n4. Slice chashu pork thinly.\n5. Assemble: noodles in bowl, pour hot broth.\n6. Top with egg (halved), pork, nori, corn, spring onions.`},

  { id:-22, emoji:'🍱', name:'Chicken Teriyaki', cuisine:'Japanese', type:'nonveg', category:'🍛 Dinner', time:'25 mins',
    ingredients:`4 chicken thighs\n4 tbsp soy sauce\n2 tbsp mirin\n2 tbsp sake\n1 tbsp sugar\n1 tsp sesame oil\nSteamed rice, sesame seeds`,
    instructions:`1. Mix soy sauce, mirin, sake, sugar for teriyaki sauce.\n2. Score chicken skin side.\n3. Pan-fry skin side down 5-6 min until crispy.\n4. Flip, cook 3 min.\n5. Pour sauce over chicken, cook until glazed and sticky.\n6. Slice and serve over rice with sesame seeds.`},

  // ── 🇹🇭 THAI ────────────────────────────────────
  { id:-23, emoji:'🍜', name:'Pad Thai', cuisine:'Thai', type:'nonveg', category:'🍛 Dinner', time:'25 mins',
    ingredients:`200g rice noodles\n200g shrimp or chicken\n2 eggs\n3 tbsp fish sauce\n2 tbsp tamarind paste\n1 tbsp sugar\n1 cup bean sprouts\nPeanuts, spring onions, lime`,
    instructions:`1. Soak noodles in warm water 20 min, drain.\n2. Fry shrimp/chicken in oil until cooked. Set aside.\n3. Scramble eggs in the same pan.\n4. Add noodles, fish sauce, tamarind, sugar — toss well.\n5. Add protein back, add bean sprouts.\n6. Serve topped with crushed peanuts, spring onions, and lime wedge.`},

  { id:-24, emoji:'🥥', name:'Thai Green Curry', cuisine:'Thai', type:'nonveg', category:'🍛 Dinner', time:'30 mins',
    ingredients:`400ml coconut milk\n400g chicken\n3 tbsp green curry paste\n1 cup Thai eggplant\n1 tbsp fish sauce\n1 tsp sugar\nKaffir lime leaves\nThai basil, jasmine rice`,
    instructions:`1. Fry green curry paste in a pot 2 min until fragrant.\n2. Add half the coconut milk, stir.\n3. Add chicken, cook 8 min.\n4. Add remaining coconut milk, eggplant, fish sauce, sugar.\n5. Simmer 10 min until eggplant is tender.\n6. Stir in kaffir lime leaves and Thai basil.\n7. Serve with jasmine rice.`},

  // ── 🧆 MIDDLE EASTERN ────────────────────────────
  { id:-25, emoji:'🧆', name:'Falafel', cuisine:'Middle Eastern', type:'veg', category:'🥗 Lunch', time:'30 mins',
    ingredients:`2 cups chickpeas (soaked overnight)\n1 onion\n4 garlic cloves\n1 cup fresh parsley\n1 tsp cumin\n1 tsp coriander\nSalt, flour\nOil for frying`,
    instructions:`1. Blend chickpeas, onion, garlic, parsley, cumin, coriander, salt — don't over-blend, keep texture.\n2. Mix in flour 1 tbsp at a time until it holds shape.\n3. Form into small balls or patties.\n4. Refrigerate 30 min (helps them hold).\n5. Deep-fry at 180°C until dark golden, about 4 min.\n6. Serve in pita with tahini, tomato, cucumber, pickles.`},

  { id:-26, emoji:'🥙', name:'Shawarma', cuisine:'Middle Eastern', type:'nonveg', category:'🍛 Dinner', time:'40 mins',
    ingredients:`500g chicken thighs\n1 tsp cumin\n1 tsp turmeric\n1 tsp paprika\n1 tsp cinnamon\n1 tbsp olive oil\nLemon juice\nPita bread, garlic sauce, pickles`,
    instructions:`1. Marinate chicken with all spices, oil, lemon juice. At least 30 min.\n2. Grill or roast chicken until cooked and slightly charred.\n3. Slice into thin strips.\n4. Warm pita bread.\n5. Spread garlic sauce, add chicken strips.\n6. Add pickled vegetables, tomato, cucumber.\n7. Roll and serve.`},

  { id:-27, emoji:'🍯', name:'Hummus', cuisine:'Middle Eastern', type:'veg', category:'🥤 Snack', time:'15 mins',
    ingredients:`2 cups cooked chickpeas\n3 tbsp tahini\n2 lemons, juiced\n2 garlic cloves\n3 tbsp olive oil\n1 tsp cumin\nSalt, paprika, parsley`,
    instructions:`1. Blend chickpeas until powdery.\n2. Add tahini, lemon juice, garlic, cumin, salt.\n3. Blend smooth, adding ice water gradually for creamy texture.\n4. Pour into plate, make a well in center.\n5. Drizzle olive oil, sprinkle paprika and parsley.\n6. Serve with warm pita bread.`},

  // ── 🌍 BONUS GLOBAL ──────────────────────────────
  { id:-28, emoji:'🥘', name:'Paella', cuisine:'Spanish', type:'nonveg', category:'🍛 Dinner', time:'50 mins',
    ingredients:`2 cups paella rice\n300g shrimp\n300g chicken\n1 onion, diced\n3 garlic cloves\n1 cup diced tomatoes\n1/2 tsp saffron\n4 cups chicken broth\nPaprika, lemon, olive oil`,
    instructions:`1. Heat olive oil in wide pan, brown chicken pieces. Set aside.\n2. Sauté onion, garlic, tomatoes, paprika.\n3. Add rice, stir to coat.\n4. Add saffron-infused broth, bring to boil.\n5. Nestle chicken and shrimp in rice.\n6. Simmer uncovered 20 min until rice absorbs liquid.\n7. Rest 5 min, garnish with lemon wedges.`},

  { id:-29, emoji:'🍲', name:'Tom Yum Soup', cuisine:'Thai', type:'nonveg', category:'🥗 Lunch', time:'25 mins',
    ingredients:`4 cups shrimp broth\n200g shrimp\n200g mushrooms\n3 lemongrass stalks\n4 kaffir lime leaves\n3 galangal slices\n2 tbsp fish sauce\n1 tbsp lime juice\nThai chilies, cilantro`,
    instructions:`1. Boil broth with lemongrass, galangal, kaffir lime leaves for 10 min.\n2. Remove aromatics.\n3. Add mushrooms and shrimp, cook 5 min.\n4. Season with fish sauce, lime juice, chilies.\n5. Taste and adjust — should be spicy, sour, savory.\n6. Serve garnished with fresh cilantro.`},

  { id:-30, emoji:'🍰', name:'Tiramisu', cuisine:'Italian', type:'veg', category:'🍰 Dessert', time:'20 mins + chill',
    ingredients:`300g mascarpone\n3 eggs, separated\n4 tbsp sugar\n200ml strong espresso, cooled\n2 tbsp coffee liqueur\n200g ladyfinger biscuits\nCocoa powder for dusting`,
    instructions:`1. Whisk egg yolks and sugar until pale.\n2. Mix in mascarpone until smooth.\n3. Whisk egg whites stiff, fold into mascarpone mixture.\n4. Mix espresso and liqueur in a shallow dish.\n5. Quickly dip ladyfingers in coffee, layer in dish.\n6. Spread mascarpone cream on top, repeat layers.\n7. Dust with cocoa powder, refrigerate 4+ hours.`},

  { id:-31, emoji:'🍫', name:'Chocolate Lava Cake', cuisine:'American', type:'veg', category:'🍰 Dessert', time:'20 mins',
    ingredients:`100g dark chocolate\n100g butter\n2 eggs + 2 yolks\n50g sugar\n30g flour\nButter & cocoa for ramekins\nVanilla ice cream to serve`,
    instructions:`1. Preheat oven to 220°C (425°F).\n2. Melt chocolate and butter together.\n3. Whisk eggs, yolks, and sugar until pale.\n4. Fold chocolate mixture into egg mixture.\n5. Fold in flour.\n6. Pour into buttered, cocoa-dusted ramekins.\n7. Bake exactly 12 min — edges set, center molten.\n8. Invert onto plate, serve immediately with ice cream.`},

  { id:-32, emoji:'🥗', name:'Greek Salad', cuisine:'Mediterranean', type:'veg', category:'🥗 Lunch', time:'10 mins',
    ingredients:`3 tomatoes, chunked\n1 cucumber, chunked\n1 red onion, rings\n1/2 cup Kalamata olives\n200g feta cheese\n3 tbsp olive oil\n1 tsp oregano\nSalt, pepper`,
    instructions:`1. Combine tomatoes, cucumber, red onion in a bowl.\n2. Add olives.\n3. Place feta block on top (don't crumble).\n4. Drizzle generously with olive oil.\n5. Sprinkle oregano, salt, pepper.\n6. Serve immediately with crusty bread.`},
];


// =====================================================
//  SECTION C: USER DATA
//  Loaded from localStorage — persists across reloads
// =====================================================

// Load saved user recipes (or empty array if none saved yet)
let recipes   = JSON.parse(localStorage.getItem('recipes')   || '[]');

// Load saved shopping list (or empty array)
let shopItems = JSON.parse(localStorage.getItem('shopItems') || '[]');

// Track which cuisine filter is currently active
let activeFilter = 'all';


// =====================================================
//  SECTION D: HELPER — get all recipes combined
// =====================================================

// Returns predefined + user recipes together as one array
function getAllRecipes() {
  return [...PREDEFINED, ...recipes];
}


// =====================================================
//  SECTION E: TABS
// =====================================================

// Called when user clicks a tab button
// 'tab' is the id of the section to show ('recipes', 'planner', 'shopping')
function showTab(tab) {
  // Hide ALL sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  // Remove 'active' from ALL tab buttons
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // Show the selected section
  document.getElementById(tab).classList.add('active');
  // Highlight the clicked button (event.target = the button that was clicked)
  event.target.classList.add('active');

  // Rebuild the planner grid whenever we switch to it
  if (tab === 'planner') buildPlanner();
}


// =====================================================
//  SECTION F: RECIPE FILTER
// =====================================================

// Called when a cuisine filter button is clicked
function setFilter(filter, btn) {
  activeFilter = filter;
  // Remove active style from all filter buttons
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  // Add active style to clicked button
  btn.classList.add('active');
  // Re-render cards with new filter
  renderRecipes();
}


// =====================================================
//  SECTION G: ADD & DELETE USER RECIPES
// =====================================================

function addRecipe() {
  // Read what the user typed in the form
  const name = document.getElementById('rName').value.trim();
  if (!name) { alert('Please enter a recipe name!'); return; }

  // Build a recipe object from the form fields
  const recipe = {
    id:           Date.now(),   // unique ID using current timestamp
    name:         name,
    cuisine:      'My Recipes', // user recipes go under this cuisine
    category:     document.getElementById('rCategory').value,
    type:         document.getElementById('rType').value,
    ingredients:  document.getElementById('rIngredients').value,
    instructions: document.getElementById('rInstructions').value,
    time:         document.getElementById('rTime').value || '?',
    // Pick a random emoji for the card
    emoji: ['🍛','🥘','🍝','🥗','🍜','🍲','🥙','🍱','🫕','🥞'][Math.floor(Math.random() * 10)]
  };

  recipes.push(recipe);  // add to array
  save();                // save to localStorage
  renderRecipes();       // refresh cards on screen

  // Clear the form fields after saving
  ['rName', 'rIngredients', 'rInstructions', 'rTime'].forEach(id => {
    document.getElementById(id).value = '';
  });

  alert(`✅ "${name}" saved to My Recipes!`);
}

function deleteRecipe(id) {
  // Only user recipes (positive IDs) can be deleted
  if (id < 0) { alert('Predefined recipes cannot be deleted.'); return; }
  recipes = recipes.filter(r => r.id !== id); // remove matching recipe
  save();
  renderRecipes();
}


// =====================================================
//  SECTION H: RENDER RECIPE CARDS
// =====================================================

function renderRecipes() {
  const grid   = document.getElementById('recipeGrid');
  const search = document.getElementById('searchBox').value.toLowerCase();
  let list     = getAllRecipes();

  // 1. Filter by cuisine
  if (activeFilter !== 'all') {
    list = list.filter(r => r.cuisine === activeFilter);
  }

  // 2. Filter by search text (matches name OR ingredients)
  if (search) {
    list = list.filter(r =>
      r.name.toLowerCase().includes(search) ||
      r.ingredients.toLowerCase().includes(search)
    );
  }

  // If nothing found, show empty message
  if (list.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <span>🔍</span> No recipes found. Try a different search or filter.
    </div>`;
    return;
  }

  // Build HTML for each recipe card using .map() + template literals
  grid.innerHTML = list.map(r => `
    <div class="recipe-card">
      <span class="emoji">${r.emoji}</span>
      <h3>${r.name}</h3>
      <div style="margin-bottom:8px; display:flex; flex-wrap:wrap; gap:4px;">
        <span class="tag ${r.type}">${r.category}</span>
        <span class="tag ${r.type}">${r.type === 'veg' ? '🥦 Veg' : '🍗 Non-Veg'}</span>
        ${r.cuisine ? `<span class="cuisine-badge">${r.cuisine}</span>` : ''}
      </div>
      <p><strong>Ingredients:</strong><br>${r.ingredients.replace(/\n/g, ', ') || 'Not listed'}</p>
      <div class="meta"><span>⏱ ${r.time}</span></div>
      <details style="margin-top:10px; font-size:0.85rem; color:var(--muted);">
        <summary style="cursor:pointer; color:var(--accent); font-weight:600;">📋 View Instructions</summary>
        <p style="margin-top:8px; white-space:pre-wrap; line-height:1.6;">${r.instructions || 'Not added'}</p>
      </details>
      <div class="card-actions">
        ${r.id < 0
          ? `<span style="font-size:0.78rem; color:var(--muted);">⭐ Predefined Recipe</span>`
          : `<button class="btn btn-danger" onclick="deleteRecipe(${r.id})">🗑 Delete</button>`
        }
      </div>
    </div>
  `).join('');
}


// =====================================================
//  SECTION I: WEEK PLANNER
//  Plan is stored as: { "MonBreakfast": [id1, id2], ... }
//  Each slot stores an ARRAY of recipe IDs (multi-dish!)
// =====================================================

// Get list of recipe IDs for a specific day+meal slot
function getPlanIds(day, meal) {
  const plan = JSON.parse(localStorage.getItem('plan') || '{}');
  const val  = plan[day + meal];
  if (!val) return [];
  return Array.isArray(val) ? val : [val]; // handle old single-value format
}

// Save list of recipe IDs for a specific day+meal slot
function savePlanIds(day, meal, ids) {
  const plan     = JSON.parse(localStorage.getItem('plan') || '{}');
  plan[day + meal] = ids;
  localStorage.setItem('plan', JSON.stringify(plan));
}

// Called when user picks a dish from a dropdown
function addDishToSlot(day, meal, selectEl) {
  const id  = Number(selectEl.value);
  if (!id) return;                         // ignore "＋ Add dish..." option

  const ids = getPlanIds(day, meal);
  if (!ids.includes(id)) {                 // don't add duplicates
    ids.push(id);
    savePlanIds(day, meal, ids);
  }

  selectEl.value = '';                     // reset dropdown back to placeholder
  refreshSlot(day, meal);                  // update the tags display
}

// Called when user clicks ✕ on a dish tag
function removeDishFromSlot(day, meal, id) {
  let ids = getPlanIds(day, meal);
  ids     = ids.filter(i => i !== id);    // remove this id
  savePlanIds(day, meal, ids);
  refreshSlot(day, meal);
}

// Re-render just the tags in one slot (faster than rebuilding whole planner)
function refreshSlot(day, meal) {
  const all    = getAllRecipes();
  const ids    = getPlanIds(day, meal);
  const tagsEl = document.getElementById(`tags-${day}-${meal}`);
  if (!tagsEl) return;

  tagsEl.innerHTML = ids.map(id => {
    const r = all.find(x => x.id === id);
    if (!r) return '';
    return `<span class="dish-tag">
      ${r.emoji} ${r.name}
      <span class="remove-tag" onclick="removeDishFromSlot('${day}','${meal}',${id})">✕</span>
    </span>`;
  }).join('');
}

// Build the full 7-day planner grid
function buildPlanner() {
  const grid = document.getElementById('plannerGrid');
  const all  = getAllRecipes();

  grid.innerHTML = DAYS.map(day => `
    <div class="day-col">
      <h3>${day}</h3>
      ${MEALS.map(meal => {
        // Build existing tag chips for this slot
        const ids      = getPlanIds(day, meal);
        const tagsHtml = ids.map(id => {
          const r = all.find(x => x.id === id);
          if (!r) return '';
          return `<span class="dish-tag">
            ${r.emoji} ${r.name}
            <span class="remove-tag" onclick="removeDishFromSlot('${day}','${meal}',${id})">✕</span>
          </span>`;
        }).join('');

        return `
        <div class="meal-slot">
          <label>${meal}</label>
          <div class="dish-tags" id="tags-${day}-${meal}">${tagsHtml}</div>
          <select onchange="addDishToSlot('${day}','${meal}',this)">
            <option value="">＋ Add dish...</option>
            ${all.map(r => `<option value="${r.id}">${r.emoji} ${r.name}</option>`).join('')}
          </select>
        </div>`;
      }).join('')}
    </div>
  `).join('');
}


// =====================================================
//  SECTION J: SHOPPING LIST
// =====================================================

// Add a new item to the shopping list
function addShopItem(text) {
  const input = document.getElementById('shopInput');
  const value = text || input.value.trim(); // use passed text OR input box value
  if (!value) return;

  shopItems.push({ id: Date.now(), text: value, done: false });
  save();
  renderShop();
  input.value = ''; // clear input box
}

// Toggle an item as done/not done
function toggleShop(id) {
  shopItems = shopItems.map(item =>
    item.id === id ? { ...item, done: !item.done } : item
  );
  save();
  renderShop();
}

// Delete one item
function deleteShopItem(id) {
  shopItems = shopItems.filter(item => item.id !== id);
  save();
  renderShop();
}

// Clear all items
function clearShop() {
  if (confirm('Clear all shopping items?')) {
    shopItems = [];
    save();
    renderShop();
  }
}

// Pull ALL ingredients from this week's planned recipes
function importFromPlanner() {
  const plan = JSON.parse(localStorage.getItem('plan') || '{}');

  // Flatten all plan values into a unique list of IDs
  const usedIds = [...new Set(
    Object.values(plan).flat().filter(v => v).map(Number)
  )];

  const all        = getAllRecipes();
  const usedRecipes = all.filter(r => usedIds.includes(r.id));

  let added = 0;
  usedRecipes.forEach(r => {
    if (!r.ingredients) return;
    r.ingredients.split('\n').forEach(line => {
      line = line.trim();
      // Only add if not already in the list
      if (line && !shopItems.find(i => i.text === line)) {
        shopItems.push({ id: Date.now() + Math.random(), text: line, done: false });
        added++;
      }
    });
  });

  save();
  renderShop();
  alert(added > 0 ? `✅ Added ${added} ingredients from your planner!` : 'Nothing new to import.');
}

// Render the shopping list on screen
function renderShop() {
  const list = document.getElementById('shopList');

  if (shopItems.length === 0) {
    list.innerHTML = `<div class="empty"><span>🛒</span>Your list is empty. Add items below!</div>`;
    return;
  }

  list.innerHTML = shopItems.map(item => `
    <div class="shop-item">
      <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleShop(${item.id})"/>
      <span class="${item.done ? 'done' : ''}">${item.text}</span>
      <button class="btn btn-danger" onclick="deleteShopItem(${item.id})">✕</button>
    </div>
  `).join('');
}

// Allow pressing Enter in the shopping input to add item
document.getElementById('shopInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addShopItem();
});


// =====================================================
//  SECTION K: SAVE TO LOCALSTORAGE
//  Called after every change to persist data
// =====================================================

function save() {
  localStorage.setItem('recipes',   JSON.stringify(recipes));
  localStorage.setItem('shopItems', JSON.stringify(shopItems));
}


// =====================================================
//  SECTION L: INIT — run when page first loads
// =====================================================

renderRecipes(); // show recipe cards
renderShop();    // show shopping list
