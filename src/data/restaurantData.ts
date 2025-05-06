import { Restaurant, MenuItem } from '@/types/restaurant';

// Sample restaurant data
export const restaurant: Restaurant = {
  id: 'rest-1',
  name: 'Punjab Express',
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop',
  cuisine: 'North Indian, Punjabi',
  rating: 4.5,
  ratingCount: 320,
  deliveryTime: '30-35 min',
  discount: '20% OFF',
  veg: false,
  address: 'Shop No. 5, Platform 1, New Delhi Railway Station, New Delhi',
  description: 'Authentic Punjabi cuisine served fresh from our kitchen to your train seat. We specialize in North Indian delicacies prepared with the finest ingredients.',
  priceRange: '₹200 - ₹500',
  contactNumber: '+91 98765 43210',
  openingHours: '6:00 AM - 11:00 PM',
  featuredDishes: ['Butter Chicken', 'Paneer Butter Masala', 'Butter Naan', 'Prawn Curry']
};

// Expanded menu items
export const menuItems: MenuItem[] = [
  // Main Course - Veg
  {
    id: 'item-2',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes cooked in a creamy tomato gravy with butter and spices',
    price: 220,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop',
    veg: true,
    popular: true,
    category: 'Main Course',
    spicyLevel: 'mild',
    preparationTime: '12-15 min'
  },
  {
    id: 'item-3',
    name: 'Dal Makhani',
    description: 'Black lentils cooked overnight with butter and cream for a rich texture',
    price: 180,
    image: 'https://images.unsplash.com/photo-1626100549742-42addaae0d1c?w=400&auto=format&fit=crop',
    veg: true,
    category: 'Main Course',
    spicyLevel: 'mild',
    preparationTime: '10-15 min'
  },
  {
    id: 'item-5',
    name: 'Malai Kofta',
    description: 'Deep-fried paneer and potato dumplings in a creamy sauce',
    price: 240,
    image: 'https://images.unsplash.com/photo-1631292784640-0e5b1c33100f?w=400&auto=format&fit=crop',
    veg: true,
    category: 'Main Course',
    spicyLevel: 'mild',
    preparationTime: '15-20 min'
  },
  
  // Main Course - Non Veg
  {
    id: 'item-1',
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a rich buttery tomato sauce with cream and spices',
    price: 250,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&auto=format&fit=crop',
    veg: false,
    popular: true,
    category: 'Main Course',
    spicyLevel: 'medium',
    preparationTime: '15-20 min'
  },
  {
    id: 'item-n1',
    name: 'Chicken Curry',
    description: 'Classic chicken curry cooked with aromatic spices and herbs',
    price: 230,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop',
    veg: false,
    category: 'Main Course',
    spicyLevel: 'medium',
    preparationTime: '15-20 min'
  },
  {
    id: 'item-n2',
    name: 'Mutton Rogan Josh',
    description: 'Aromatic lamb curry dish with a thick sauce flavored with garlic, ginger and aromatic spices',
    price: 320,
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=400&auto=format&fit=crop',
    veg: false,
    popular: true,
    category: 'Main Course',
    spicyLevel: 'hot',
    preparationTime: '25-30 min',
    allergens: ['Mutton']
  },
  
  // Seafood
  {
    id: 'item-s1',
    name: 'Prawn Curry',
    description: 'Prawns cooked in a coconut milk-based curry with spices',
    price: 350,
    image: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=400&auto=format&fit=crop',
    veg: false,
    category: 'Seafood',
    spicyLevel: 'medium',
    preparationTime: '15-20 min',
    seafood: true,
    allergens: ['Shellfish']
  },
  {
    id: 'item-s2',
    name: 'Fish Tikka',
    description: 'Marinated fish chunks grilled in tandoor with spices',
    price: 320,
    image: 'https://images.unsplash.com/photo-1626521828783-508ba2626ba1?w=400&auto=format&fit=crop',
    veg: false,
    popular: true,
    category: 'Seafood',
    spicyLevel: 'mild',
    preparationTime: '15-20 min',
    seafood: true,
    allergens: ['Fish']
  },
  {
    id: 'item-s3',
    name: 'Grilled Pomfret',
    description: 'Whole pomfret fish marinated with spices and grilled to perfection',
    price: 380,
    image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&auto=format&fit=crop',
    veg: false,
    category: 'Seafood',
    spicyLevel: 'medium',
    preparationTime: '20-25 min',
    seafood: true,
    allergens: ['Fish']
  },
  {
    id: 'item-s4',
    name: 'Crab Masala',
    description: 'Crab cooked in spicy masala with aromatic spices',
    price: 400,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop',
    veg: false,
    category: 'Seafood',
    spicyLevel: 'hot',
    preparationTime: '25-30 min',
    seafood: true,
    allergens: ['Shellfish']
  },
  
  // Breads
  {
    id: 'item-6',
    name: 'Tandoori Roti',
    description: 'Traditional Indian bread baked in tandoor',
    price: 30,
    veg: true,
    category: 'Breads',
    preparationTime: '5 min'
  },
  {
    id: 'item-7',
    name: 'Butter Naan',
    description: 'Leavened bread baked in tandoor and brushed with butter',
    price: 50,
    veg: true,
    popular: true,
    category: 'Breads',
    preparationTime: '5-7 min'
  },
  {
    id: 'item-8',
    name: 'Garlic Naan',
    description: 'Naan bread topped with garlic and herbs',
    price: 60,
    veg: true,
    category: 'Breads',
    preparationTime: '5-7 min'
  },
  
  // Rice
  {
    id: 'item-9',
    name: 'Jeera Rice',
    description: 'Basmati rice flavored with cumin seeds',
    price: 120,
    veg: true,
    category: 'Rice',
    preparationTime: '10-12 min'
  },
  {
    id: 'item-10',
    name: 'Vegetable Biryani',
    description: 'Fragrant rice cooked with mixed vegetables and aromatic spices',
    price: 200,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&auto=format&fit=crop',
    veg: true,
    category: 'Rice',
    spicyLevel: 'medium',
    preparationTime: '18-20 min'
  },
  {
    id: 'item-4',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice cooked with tender chicken pieces and aromatic spices',
    price: 280,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&auto=format&fit=crop',
    veg: false,
    popular: true,
    category: 'Rice',
    spicyLevel: 'medium',
    preparationTime: '20-25 min'
  },
  {
    id: 'item-r1',
    name: 'Prawn Biryani',
    description: 'Fragrant rice cooked with spiced prawns and aromatic spices',
    price: 320,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop',
    veg: false,
    category: 'Rice',
    spicyLevel: 'medium',
    preparationTime: '20-25 min',
    seafood: true,
    allergens: ['Shellfish']
  },
  
  // Beverages
  {
    id: 'item-11',
    name: 'Sweet Lassi',
    description: 'Traditional Punjabi yogurt drink sweetened with sugar',
    price: 80,
    image: 'https://images.unsplash.com/photo-1626761191814-a9dc9efd085c?w=400&auto=format&fit=crop',
    veg: true,
    category: 'Beverages',
    preparationTime: '5 min'
  },
  {
    id: 'item-12',
    name: 'Mango Lassi',
    description: 'Refreshing yogurt drink blended with sweet mango pulp',
    price: 100,
    image: 'https://images.unsplash.com/photo-1527583568570-70fb4486ab74?w=400&auto=format&fit=crop',
    veg: true,
    popular: true,
    category: 'Beverages',
    preparationTime: '5 min'
  },
  {
    id: 'item-13',
    name: 'Masala Chai',
    description: 'Indian spiced tea with milk',
    price: 50,
    veg: true,
    category: 'Beverages',
    preparationTime: '5 min'
  },
  {
    id: 'item-14',
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime juice with soda water, served sweet or salted',
    price: 70,
    veg: true,
    category: 'Beverages',
    preparationTime: '3-5 min'
  },
  
  // Desserts
  {
    id: 'item-15',
    name: 'Gulab Jamun',
    description: 'Deep-fried milk solid balls soaked in sugar syrup',
    price: 90,
    image: 'https://images.unsplash.com/photo-1589646627821-a14e4fb7dfd7?w=400&auto=format&fit=crop',
    veg: true,
    category: 'Desserts',
    preparationTime: '5 min'
  },
  {
    id: 'item-16',
    name: 'Rasmalai',
    description: 'Soft cottage cheese patties soaked in sweetened, thickened milk',
    price: 110,
    image: 'https://images.unsplash.com/photo-1614145121029-83a29676bdfa?w=400&auto=format&fit=crop',
    veg: true,
    popular: true,
    category: 'Desserts',
    preparationTime: '5-7 min'
  }
];

// List of restaurants for the restaurant listing page
export const allRestaurants = [
  // North Indian Restaurants
  {
    id: 'rest-1',
    name: 'Punjab Express',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
    cuisine: 'North Indian, Punjabi',
    rating: 4.5,
    deliveryTime: '30-35 min',
    discount: '20% OFF',
    veg: false
  },
  {
    id: 'rest-n1',
    name: 'Punjabi Tadka',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop',
    cuisine: 'North Indian',
    rating: 4.3,
    deliveryTime: '25-35 min',
    veg: false
  },
  {
    id: 'rest-n2',
    name: 'Delhi 6',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop',
    cuisine: 'North Indian, Mughlai',
    rating: 4.6,
    deliveryTime: '35-40 min',
    discount: '15% OFF',
    veg: false
  },
  {
    id: 'rest-n3',
    name: 'Royal Punjabi',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&auto=format&fit=crop',
    cuisine: 'North Indian',
    rating: 4.4,
    deliveryTime: '20-30 min',
    veg: true
  },
  {
    id: 'rest-n4',
    name: 'Dhaba Express',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&auto=format&fit=crop',
    cuisine: 'North Indian, Punjabi',
    rating: 4.2,
    deliveryTime: '30-40 min',
    discount: '10% OFF',
    veg: false
  },

  // South Indian Restaurants
  {
    id: 'rest-2',
    name: 'Dosa Corner',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&auto=format&fit=crop',
    cuisine: 'South Indian',
    rating: 4.3,
    deliveryTime: '25-30 min',
    veg: true
  },
  {
    id: 'rest-s1',
    name: 'Madras Cafe',
    image: 'https://images.unsplash.com/photo-1630383249896-52bdbd3372cb?w=800&auto=format&fit=crop',
    cuisine: 'South Indian',
    rating: 4.5,
    deliveryTime: '20-30 min',
    discount: '10% OFF',
    veg: true
  },
  {
    id: 'rest-s2',
    name: 'Idli Express',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop',
    cuisine: 'South Indian',
    rating: 4.1,
    deliveryTime: '15-25 min',
    veg: true
  },
  {
    id: 'rest-s3',
    name: 'Chennai Special',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f72e1?w=800&auto=format&fit=crop',
    cuisine: 'South Indian, Tamil',
    rating: 4.4,
    deliveryTime: '30-40 min',
    veg: true
  },
  {
    id: 'rest-s4',
    name: 'Bangalore Bites',
    image: 'https://images.unsplash.com/photo-1605392681320-5a88e31461b5?w=800&auto=format&fit=crop',
    cuisine: 'South Indian, Karnataka',
    rating: 4.2,
    deliveryTime: '25-35 min',
    discount: '15% OFF',
    veg: true
  },

  // Chinese Restaurants
  {
    id: 'rest-9',
    name: 'Chinese Wok',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop',
    cuisine: 'Chinese, Asian',
    rating: 4.4,
    deliveryTime: '35-45 min',
    discount: '15% OFF',
    veg: false
  },
  {
    id: 'rest-c1',
    name: 'Dragon House',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop',
    cuisine: 'Chinese',
    rating: 4.3,
    deliveryTime: '30-40 min',
    veg: false
  },
  {
    id: 'rest-c2',
    name: 'Wok & Roll',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop',
    cuisine: 'Chinese, Pan Asian',
    rating: 4.5,
    deliveryTime: '30-35 min',
    discount: '20% OFF',
    veg: false
  },
  {
    id: 'rest-c3',
    name: 'Asian Fusion',
    image: 'https://images.unsplash.com/photo-1491961865842-98fb4469a9b6?w=800&auto=format&fit=crop',
    cuisine: 'Chinese, Thai',
    rating: 4.2,
    deliveryTime: '35-45 min',
    veg: false
  },
  {
    id: 'rest-c4',
    name: 'Noodle Express',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop',
    cuisine: 'Chinese',
    rating: 4.0,
    deliveryTime: '20-30 min',
    veg: true
  },

  // Fast Food Restaurants
  {
    id: 'rest-3',
    name: 'Delhi Darbar',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop',
    cuisine: 'Mughlai, Biryani',
    rating: 4.1,
    deliveryTime: '35-40 min',
    discount: '10% OFF',
    veg: false
  },
  {
    id: 'rest-f1',
    name: 'Burger Junction',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop',
    cuisine: 'Fast Food, Burgers',
    rating: 4.3,
    deliveryTime: '15-25 min',
    veg: false
  },
  {
    id: 'rest-f2',
    name: 'Wrap & Roll',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&auto=format&fit=crop',
    cuisine: 'Fast Food, Wraps',
    rating: 4.2,
    deliveryTime: '20-30 min',
    discount: '15% OFF',
    veg: true
  },
  {
    id: 'rest-f3',
    name: 'Quick Bites',
    image: 'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=800&auto=format&fit=crop',
    cuisine: 'Fast Food, Snacks',
    rating: 4.0,
    deliveryTime: '15-20 min',
    veg: true
  },
  {
    id: 'rest-f4',
    name: 'Sandwich Express',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop',
    cuisine: 'Fast Food, Sandwiches',
    rating: 4.1,
    deliveryTime: '15-25 min',
    veg: true
  },

  // Biryani Restaurants
  {
    id: 'rest-6',
    name: 'Hyderabadi Biryani House',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop',
    cuisine: 'Biryani, Hyderabadi',
    rating: 4.6,
    deliveryTime: '40-45 min',
    veg: false
  },
  {
    id: 'rest-b1',
    name: 'Biryani Box',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop',
    cuisine: 'Biryani',
    rating: 4.4,
    deliveryTime: '35-45 min',
    veg: false
  },
  {
    id: 'rest-b2',
    name: 'Royal Biryani',
    image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=800&auto=format&fit=crop',
    cuisine: 'Biryani, Mughlai',
    rating: 4.7,
    deliveryTime: '40-50 min',
    discount: '10% OFF',
    veg: false
  },
  {
    id: 'rest-b3',
    name: 'Veg Biryani Hub',
    image: 'https://images.unsplash.com/photo-1633945499177-15aac89680d8?w=800&auto=format&fit=crop',
    cuisine: 'Biryani, Veg',
    rating: 4.2,
    deliveryTime: '30-40 min',
    veg: true
  },
  {
    id: 'rest-b4',
    name: 'Lucknowi Biryani',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop',
    cuisine: 'Biryani, Awadhi',
    rating: 4.5,
    deliveryTime: '35-45 min',
    veg: false
  },

  // Beverages
  {
    id: 'rest-4',
    name: 'Chai & Snacks',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&auto=format&fit=crop',
    cuisine: 'Beverages, Snacks',
    rating: 4.4,
    deliveryTime: '15-20 min',
    veg: true
  },
  {
    id: 'rest-bv1',
    name: 'Juice Junction',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=800&auto=format&fit=crop',
    cuisine: 'Beverages, Juices',
    rating: 4.5,
    deliveryTime: '10-15 min',
    veg: true
  },
  {
    id: 'rest-bv2',
    name: 'Tea Treasure',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop',
    cuisine: 'Beverages, Tea',
    rating: 4.3,
    deliveryTime: '15-20 min',
    discount: '10% OFF',
    veg: true
  },
  {
    id: 'rest-bv3',
    name: 'Coffee Express',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
    cuisine: 'Beverages, Coffee',
    rating: 4.6,
    deliveryTime: '10-15 min',
    veg: true
  },
  {
    id: 'rest-bv4',
    name: 'Milkshake Mania',
    image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=800&auto=format&fit=crop',
    cuisine: 'Beverages, Shakes',
    rating: 4.4,
    deliveryTime: '15-20 min',
    veg: true
  },

  // Pizza
  {
    id: 'rest-10',
    name: 'Pizza Express',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop',
    cuisine: 'Italian, Pizza',
    rating: 4.2,
    deliveryTime: '30-40 min',
    veg: false
  },
  {
    id: 'rest-p1',
    name: 'Pizza Hub',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&auto=format&fit=crop',
    cuisine: 'Pizza',
    rating: 4.3,
    deliveryTime: '25-35 min',
    discount: '20% OFF',
    veg: false
  },
  {
    id: 'rest-p2',
    name: 'Cheese Lovers',
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4fe0f?w=800&auto=format&fit=crop',
    cuisine: 'Pizza, Italian',
    rating: 4.5,
    deliveryTime: '30-40 min',
    veg: true
  },
  {
    id: 'rest-p3',
    name: 'Thin Crust Masters',
    image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=800&auto=format&fit=crop',
    cuisine: 'Pizza, Italian',
    rating: 4.4,
    deliveryTime: '35-45 min',
    veg: false
  },
  {
    id: 'rest-p4',
    name: 'Veggie Pizza Point',
    image: 'https://images.unsplash.com/photo-1600628421055-4d30de868b8f?w=800&auto=format&fit=crop',
    cuisine: 'Pizza, Veg',
    rating: 4.1,
    deliveryTime: '25-35 min',
    discount: '15% OFF',
    veg: true
  },

  // Healthy Food
  {
    id: 'rest-11',
    name: 'Health Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    cuisine: 'Salads, Healthy Food',
    rating: 4.5,
    deliveryTime: '25-30 min',
    discount: '10% OFF',
    veg: true
  },
  {
    id: 'rest-h1',
    name: 'Green Salad Bar',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop',
    cuisine: 'Healthy Food, Salads',
    rating: 4.6,
    deliveryTime: '20-30 min',
    veg: true
  },
  {
    id: 'rest-h2',
    name: 'Fit Meals',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800&auto=format&fit=crop',
    cuisine: 'Healthy Food, Protein',
    rating: 4.4,
    deliveryTime: '30-40 min',
    discount: '10% OFF',
    veg: false
  },
  {
    id: 'rest-h3',
    name: 'Green Leaf',
    image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=800&auto=format&fit=crop',
    cuisine: 'Healthy Food, Organic',
    rating: 4.3,
    deliveryTime: '25-35 min',
    veg: true
  },
  {
    id: 'rest-h4',
    name: 'Protein Express',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop',
    cuisine: 'Healthy Food, Protein',
    rating: 4.5,
    deliveryTime: '20-30 min',
    veg: false
  },

  // Keep these miscellaneous options
  {
    id: 'rest-5',
    name: 'Bombay Brasserie',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
    cuisine: 'Maharashtrian, Street Food',
    rating: 4.0,
    deliveryTime: '30-40 min',
    discount: '15% OFF',
    veg: false
  },
  {
    id: 'rest-7',
    name: 'The Veggie Delight',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop',
    cuisine: 'Pure Vegetarian, Jain Options',
    rating: 4.2,
    deliveryTime: '25-35 min',
    discount: '10% OFF',
    veg: true
  },
  {
    id: 'rest-8',
    name: 'Train Meal Box',
    image: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=800&auto=format&fit=crop',
    cuisine: 'Meal Boxes, Multi-Cuisine',
    rating: 3.9,
    deliveryTime: '20-25 min',
    veg: true
  },
  {
    id: 'rest-12',
    name: 'Station Cafe',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop',
    cuisine: 'Coffee, Breakfast',
    rating: 4.3,
    deliveryTime: '15-20 min',
    veg: true
  }
];
