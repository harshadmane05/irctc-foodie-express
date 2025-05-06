
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/restaurant';

interface CartItemProps {
  item: CartItemType;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
  removeItem: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  incrementQuantity,
  decrementQuantity,
  removeItem
}) => {
  return (
    <div className="flex justify-between py-4 border-b last:border-b-0">
      <div className="flex items-start">
        <Badge className={item.veg ? "bg-green-600 h-4 w-4 mr-3 mt-1" : "bg-red-600 h-4 w-4 mr-3 mt-1"} variant="outline">
          <div className={`w-1 h-1 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`}></div>
        </Badge>
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-gray-500 text-sm">₹{item.price}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Button 
            size="icon" 
            variant="outline" 
            className="h-8 w-8"
            onClick={() => decrementQuantity(item.id)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="mx-2 w-6 text-center">{item.quantity}</span>
          <Button 
            size="icon" 
            variant="outline" 
            className="h-8 w-8"
            onClick={() => incrementQuantity(item.id)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="text-right">
          <div className="font-medium">₹{item.price * item.quantity}</div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-red-500 hover:text-red-700 p-0"
            onClick={() => removeItem(item.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
