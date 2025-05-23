
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Info, AlertTriangle } from 'lucide-react';
import { MenuItem as MenuItemType } from '@/types/restaurant';
import { getFallbackImage } from '@/utils/imageUtils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuItemProps {
  item: MenuItemType;
  quantity: number;
  onAdd: (item: MenuItemType) => void;
  onRemove: (itemId: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, quantity, onAdd, onRemove }) => {
  // Generate spicy level indicator
  const renderSpicyLevel = () => {
    if (!item.spicyLevel) return null;
    
    const levels = {
      mild: { color: "bg-yellow-400", text: "Mild" },
      medium: { color: "bg-orange-500", text: "Medium" },
      hot: { color: "bg-red-600", text: "Hot" }
    };
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge className={`${levels[item.spicyLevel].color} ml-1`}>
              {levels[item.spicyLevel].text}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Spicy Level: {levels[item.spicyLevel].text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite error loops
    target.src = getFallbackImage(item.name);
  };

  return (
    <Card key={item.id} className="overflow-hidden hover:shadow-md transition-all duration-300 premium-effect">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-4 flex-1">
            <div className="flex items-center flex-wrap gap-1 mb-2">
              <Badge className={item.veg ? "bg-green-600" : "bg-red-600"} variant="outline">
                <div className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`}></div>
              </Badge>
              
              {item.popular && (
                <Badge className="bg-irctc-orange text-white">Popular</Badge>
              )}
              
              {renderSpicyLevel()}
              
              {item.allergens && item.allergens.length > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="bg-yellow-100">
                        <AlertTriangle size={12} className="mr-1 text-yellow-600" />
                        Allergens
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Contains: {item.allergens.join(", ")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600 mt-1">₹{item.price}</p>
              </div>
              
              {item.preparationTime && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="bg-blue-50 text-blue-600">
                        {item.preparationTime}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Preparation time</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.description}</p>
            
            <div className="mt-4">
              {quantity > 0 ? (
                <div className="flex items-center">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={() => onRemove(item.id)}
                    aria-label="Decrease quantity"
                    className="hover:bg-red-50"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-3 w-6 text-center font-medium">{quantity}</span>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={() => onAdd(item)}
                    aria-label="Increase quantity"
                    className="hover:bg-green-50"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => onAdd(item)}
                  className="bg-irctc-orange hover:bg-irctc-orange/90 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Add to cart
                </Button>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-1/3 h-32 md:h-auto relative">
            <img 
              src={item.image || getFallbackImage(item.name)}
              alt={item.name} 
              className="w-full h-full object-cover premium-image"
              onError={handleImageError}
              loading="lazy"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
