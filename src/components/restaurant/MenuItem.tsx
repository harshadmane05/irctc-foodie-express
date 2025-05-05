
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { MenuItem as MenuItemType } from '@/types/restaurant';

interface MenuItemProps {
  item: MenuItemType;
  quantity: number;
  onAdd: (item: MenuItemType) => void;
  onRemove: (itemId: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, quantity, onAdd, onRemove }) => {
  return (
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
              {quantity > 0 ? (
                <div className="flex items-center">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={() => onRemove(item.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-3">{quantity}</span>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={() => onAdd(item)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => onAdd(item)}
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
  );
};

export default MenuItem;
