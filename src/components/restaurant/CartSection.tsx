
import React from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, LogIn } from 'lucide-react';
import { CartItem } from '@/types/restaurant';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface CartSectionProps {
  cart: CartItem[];
  getTotalItems: () => number;
  getTotalAmount: () => number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  handleCheckout: () => void;
}

const CartSection: React.FC<CartSectionProps> = ({
  cart,
  getTotalItems,
  getTotalAmount,
  addToCart,
  removeFromCart,
  handleCheckout
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleProceed = () => {
    if (!isAuthenticated) {
      // Save current location before redirecting to login
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      navigate('/login');
    } else {
      handleCheckout();
    }
  };

  return (
    <div className="w-full lg:w-1/3 animate-fade-in">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Your Order</h3>
          <Badge className="bg-irctc-blue hover:bg-irctc-blue/90 transition-colors">
            <ShoppingCart className="h-4 w-4 mr-1 animate-pulse" />
            {getTotalItems()} items
          </Badge>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center py-12 animate-scale-in">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 animate-float" />
            <p className="text-gray-500 mt-4 font-medium">Your cart is empty</p>
            <p className="text-gray-400 text-sm mt-2">Add items from the menu to get started</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-auto mb-4 pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {cart.map((item, index) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "flex justify-between border-b pb-3 transition-all hover:bg-gray-50 p-2 rounded",
                    "animate-slide-in",
                    index % 2 === 0 ? "bg-gray-50/40" : ""
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start">
                    <Badge className={item.veg ? "bg-green-600 h-5 w-5 mr-2 flex items-center justify-center" : "bg-red-600 h-5 w-5 mr-2 flex items-center justify-center"} variant="outline">
                      <div className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`}></div>
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <div className="flex items-center mt-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-7 w-7 rounded-full border-gray-300 hover:bg-gray-100"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-3 w-3 text-gray-600" />
                        </Button>
                        <span className="mx-3 text-sm font-semibold min-w-[20px] text-center">{item.quantity}</span>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-7 w-7 rounded-full border-gray-300 hover:bg-gray-100"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-3 w-3 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">₹{item.price * item.quantity}</p>
                    <p className="text-xs text-gray-500 mt-1">₹{item.price} × {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-2 animate-fade-in" style={{ animationDelay: "300ms" }}>
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
              <div className="flex justify-between font-semibold text-lg mt-4 border-t border-dashed pt-4">
                <span>Total</span>
                <span className="text-irctc-orange">₹{getTotalAmount() + 50}</span>
              </div>
              
              <AnimatedButton 
                className="w-full mt-6 bg-gradient-to-r from-irctc-orange to-orange-500 hover:from-orange-500 hover:to-irctc-orange text-white font-medium py-6 shadow-lg hover:shadow-orange-200/50" 
                size="lg"
                onClick={handleProceed}
                animateHover={true}
              >
                {!isAuthenticated ? (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login to Checkout
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </AnimatedButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSection;
