
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, LogIn } from 'lucide-react';
import { CartItem } from '@/types/restaurant';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

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
              
              <Button 
                className="w-full mt-6 bg-irctc-orange hover:bg-irctc-orange/90 py-6" 
                size="lg"
                onClick={handleProceed}
              >
                {!isAuthenticated ? (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login to Checkout
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSection;
