
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
  veg: true,
  address: 'Shop No. 5, Platform 1, New Delhi Railway Station, New Delhi',
  description: 'Authentic Punjabi cuisine served fresh from our kitchen to your train seat. We specialize in North Indian delicacies prepared with the finest ingredients.',
  priceRange: '₹200 - ₹500',
  contactNumber: '+91 98765 43210',
  openingHours: '6:00 AM - 11:00 PM',
  featuredDishes: ['Butter Chicken', 'Paneer Butter Masala', 'Butter Naan']
};

// Expanded menu items
export const menuItems: MenuItem[] = [
  // Main Course
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
  {
    id: 'rest-1',
    name: 'Punjab Express',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
    cuisine: 'North Indian, Punjabi',
    rating: 4.5,
    deliveryTime: '30-35 min',
    discount: '20% OFF',
    veg: true
  },
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
    id: 'rest-4',
    name: 'Chai & Snacks',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&auto=format&fit=crop',
    cuisine: 'Beverages, Snacks',
    rating: 4.4,
    deliveryTime: '15-20 min',
    veg: true
  },
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
    id: 'rest-6',
    name: 'Hyderabadi Biryani House',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop',
    cuisine: 'Biryani, Hyderabadi',
    rating: 4.6,
    deliveryTime: '40-45 min',
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
    id: 'rest-10',
    name: 'Pizza Express',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop',
    cuisine: 'Italian, Pizza',
    rating: 4.2,
    deliveryTime: '30-40 min',
    veg: false
  },
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
    id: 'rest-12',
    name: 'Station Cafe',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop',
    cuisine: 'Coffee, Breakfast',
    rating: 4.3,
    deliveryTime: '15-20 min',
    veg: true
  }
];
