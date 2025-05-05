
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
  description: 'Authentic Punjabi cuisine served fresh from our kitchen to your train seat. We specialize in North Indian delicacies prepared with the finest ingredients.'
};

// Sample menu items
export const menuItems: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a rich buttery tomato sauce with cream and spices',
    price: 250,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&auto=format&fit=crop',
    veg: false,
    popular: true,
    category: 'Main Course'
  },
  {
    id: 'item-2',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes cooked in a creamy tomato gravy with butter and spices',
    price: 220,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop',
    veg: true,
    popular: true,
    category: 'Main Course'
  },
  {
    id: 'item-3',
    name: 'Dal Makhani',
    description: 'Black lentils cooked overnight with butter and cream for a rich texture',
    price: 180,
    image: 'https://images.unsplash.com/photo-1626100549742-42addaae0d1c?w=400&auto=format&fit=crop',
    veg: true,
    category: 'Main Course'
  },
  {
    id: 'item-4',
    name: 'Tandoori Roti',
    description: 'Traditional Indian bread baked in tandoor',
    price: 30,
    veg: true,
    category: 'Breads'
  },
  {
    id: 'item-5',
    name: 'Butter Naan',
    description: 'Leavened bread baked in tandoor and brushed with butter',
    price: 50,
    veg: true,
    popular: true,
    category: 'Breads'
  },
  {
    id: 'item-6',
    name: 'Jeera Rice',
    description: 'Basmati rice flavored with cumin seeds',
    price: 120,
    veg: true,
    category: 'Rice'
  },
  {
    id: 'item-7',
    name: 'Sweet Lassi',
    description: 'Traditional Punjabi yogurt drink sweetened with sugar',
    price: 80,
    veg: true,
    category: 'Beverages'
  },
  {
    id: 'item-8',
    name: 'Gulab Jamun',
    description: 'Deep-fried milk solid balls soaked in sugar syrup',
    price: 90,
    veg: true,
    category: 'Desserts'
  }
];
