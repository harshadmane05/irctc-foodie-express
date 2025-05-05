
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { CartItem, MenuItem } from '@/types/restaurant';
import RestaurantHeader from '@/components/restaurant/RestaurantHeader';
import MenuSection from '@/components/restaurant/MenuSection';
import CartSection from '@/components/restaurant/CartSection';
import { restaurant, menuItems } from '@/data/restaurantData';

const RestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
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

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before proceeding",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to cart page
    navigate('/cart');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <RestaurantHeader restaurant={restaurant} />
        
        {/* Menu Section */}
        <div className="container mx-auto px-4 pb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            <MenuSection
              menuItems={menuItems}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              getItemQuantityInCart={getItemQuantityInCart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
            
            <CartSection
              cart={cart}
              getTotalItems={getTotalItems}
              getTotalAmount={getTotalAmount}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetails;
