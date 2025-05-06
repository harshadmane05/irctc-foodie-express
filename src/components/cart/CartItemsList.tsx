
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '@/types/restaurant';

interface CartItemsListProps {
  cartItems: CartItemType[];
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
  removeItem: (itemId: string) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  cartItems,
  incrementQuantity,
  decrementQuantity,
  removeItem
}) => {
  if (cartItems.length === 0) return null;
  
  const restaurantId = cartItems[0].restaurantId;
  const restaurantName = cartItems[0].restaurant;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Items in Your Cart</h2>
      
      <div className="border-b pb-3 mb-3">
        <div className="flex items-center">
          <Badge className="bg-irctc-blue mr-2">
            {restaurantName}
          </Badge>
          <Link to={`/restaurant/${restaurantId}`} className="text-irctc-blue hover:underline text-sm">
            View Restaurant
          </Link>
        </div>
      </div>
      
      {cartItems.map((item) => (
        <CartItem 
          key={item.id}
          item={item}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

export default CartItemsList;
