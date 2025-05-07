
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Info, AlertTriangle, ImageIcon } from 'lucide-react';
import { MenuItem as MenuItemType } from '@/types/restaurant';
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

  // Get appropriate fallback image based on item name
  const getFallbackImage = () => {
    const nameLower = item.name.toLowerCase();
    
    if (nameLower.includes('cheese') || nameLower.includes('pizza')) {
      return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop';
    } else if (nameLower.includes('biryani') || nameLower.includes('rice')) {
      return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop';
    } else if (nameLower.includes('asian') || nameLower.includes('chinese')) {
      return 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop';
    } else if (nameLower.includes('south indian') || nameLower.includes('dosa') || nameLower.includes('idli')) {
      return 'https://images.unsplash.com/photo-1630383249896-52bdbd3372cb?w=800&auto=format&fit=crop';
    } else if (nameLower.includes('north indian') || nameLower.includes('curry')) {
      return 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop';
    } else if (nameLower.includes('chicken') || nameLower.includes('meat')) {
      return 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop';
    } else if (nameLower.includes('seafood') || nameLower.includes('fish')) {
      return 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=800&auto=format&fit=crop';
    } else if (nameLower.includes('drink') || nameLower.includes('beverage')) {
      return 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=800&auto=format&fit=crop';
    }
    
    // Default food image as fallback
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop';
  };

  return (
    <Card key={item.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
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
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-3 w-6 text-center">{quantity}</span>
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
            <div className="w-full md:w-1/3 h-32 md:h-auto relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = getFallbackImage();
                }}
              />
            </div>
          )}
          
          {!item.image && (
            <div className="w-full md:w-1/3 h-32 md:h-auto relative bg-gray-100 flex items-center justify-center">
              <img 
                src={getFallbackImage()} 
                alt={item.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop';
                }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
