
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Clock, Info, MapPin, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  veg: boolean;
  popular?: boolean;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

// Sample restaurant data
const restaurant = {
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
const menuItems: MenuItem[] = [
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

const categories = Array.from(new Set(menuItems.map(item => item.category)));

const RestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        toast({
          title: "Added to cart",
          description: `${item.name} has been added to your cart`,
        });
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === itemId);
      
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        if (updatedCart[existingItemIndex].quantity === 1) {
          return updatedCart.filter(item => item.id !== itemId);
        } else {
          updatedCart[existingItemIndex].quantity -= 1;
          return updatedCart;
        }
      }
      return prevCart;
    });
  };
  
  const getItemQuantityInCart = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };
  
  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Cover Image */}
        <div className="h-64 md:h-80 w-full relative">
          <img 
            src={restaurant.coverImage} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        
        {/* Restaurant Info */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-3/4">
                <div className="flex items-start">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-24 h-24 rounded-lg object-cover mr-4 shadow"
                  />
                  <div>
                    <div className="flex items-center">
                      <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                      <Badge className={restaurant.veg ? "bg-green-600 text-white ml-2" : "bg-red-600 text-white ml-2"}>
                        {restaurant.veg ? "Pure Veg" : "Non-Veg"}
                      </Badge>
                    </div>
                    <p className="text-gray-500">{restaurant.cuisine}</p>
                    <div className="flex items-center mt-1">
                      <Badge className="bg-green-600 text-white flex items-center mr-2">
                        <Star className="w-3 h-3 mr-1" fill="white" />
                        {restaurant.rating}
                      </Badge>
                      <span className="text-sm text-gray-500">{restaurant.ratingCount} ratings</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Delivery Time: {restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{restaurant.address}</span>
                  </div>
                </div>
                
                {restaurant.description && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                      <p className="text-gray-600">{restaurant.description}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {restaurant.discount && (
                <div className="w-full md:w-1/4 mt-6 md:mt-0">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-irctc-orange mb-2">Offers & Discounts</h3>
                    <div className="flex items-center">
                      <Badge className="bg-irctc-orange text-white px-3 py-1">
                        {restaurant.discount}
                      </Badge>
                      <span className="ml-2 text-gray-700">on all orders</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Menu Section */}
        <div className="container mx-auto px-4 pb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Menu Categories and Items */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold mb-6">Menu</h2>
              
              <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
                <div className="overflow-x-auto">
                  <TabsList className="mb-6 w-full">
                    {categories.map((category) => (
                      <TabsTrigger 
                        key={category} 
                        value={category}
                        className="px-4 py-2"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {categories.map((category) => (
                  <TabsContent key={category} value={category} className="space-y-4">
                    {filteredItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="p-4 flex-1">
                              <div className="flex items-center">
                                <Badge className={item.veg ? "bg-green-600" : "bg-red-600"} variant="outline">
                                  <div className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`}></div>
                                </Badge>
                                {item.popular && (
                                  <Badge className="ml-2 bg-irctc-orange text-white">Popular</Badge>
                                )}
                              </div>
                              <h3 className="font-semibold text-lg mt-2">{item.name}</h3>
                              <p className="text-gray-600 mt-1">₹{item.price}</p>
                              <p className="text-gray-500 text-sm mt-2">{item.description}</p>
                              
                              <div className="mt-4">
                                {getItemQuantityInCart(item.id) > 0 ? (
                                  <div className="flex items-center">
                                    <Button 
                                      size="icon" 
                                      variant="outline" 
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="mx-3">{getItemQuantityInCart(item.id)}</span>
                                    <Button 
                                      size="icon" 
                                      variant="outline" 
                                      onClick={() => addToCart(item)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button 
                                    onClick={() => addToCart(item)}
                                    className="bg-irctc-orange hover:bg-irctc-orange/90"
                                  >
                                    Add to cart
                                  </Button>
                                )}
                              </div>
                            </div>
                            
                            {item.image && (
                              <div className="w-full md:w-1/3 h-32 md:h-auto">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            {/* Cart Section */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Your Order</h3>
                  <Badge className="bg-irctc-blue">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {getTotalItems()} items
                  </Badge>
                </div>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 mx-auto text-gray-300" />
                    <p className="text-gray-500 mt-2">Your cart is empty</p>
                    <p className="text-gray-400 text-sm mt-1">Add items to continue</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-96 overflow-auto mb-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between border-b pb-2">
                          <div className="flex items-start">
                            <Badge className={item.veg ? "bg-green-600 h-4 w-4 mr-2" : "bg-red-600 h-4 w-4 mr-2"} variant="outline">
                              <div className={`w-1 h-1 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`}></div>
                            </Badge>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <div className="flex items-center mt-1">
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-6 w-6"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="mx-2 text-sm">{item.quantity}</span>
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-6 w-6"
                                  onClick={() => addToCart(item)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{item.price * item.quantity}</p>
                            <p className="text-xs text-gray-500">₹{item.price} x {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">₹{getTotalAmount()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-medium">₹40</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Platform Fee</span>
                        <span className="font-medium">₹10</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg mt-4">
                        <span>Total</span>
                        <span>₹{getTotalAmount() + 50}</span>
                      </div>
                      
                      <Button className="w-full mt-6 bg-irctc-orange hover:bg-irctc-orange/90 py-6" size="lg">
                        Proceed to Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetails;
