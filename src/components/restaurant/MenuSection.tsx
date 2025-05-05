
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '@/types/restaurant';
import { Badge } from '@/components/ui/badge';

interface MenuSectionProps {
  menuItems: MenuItemType[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  getItemQuantityInCart: (itemId: string) => number;
  addToCart: (item: MenuItemType) => void;
  removeFromCart: (itemId: string) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  categories,
  selectedCategory,
  setSelectedCategory,
  getItemQuantityInCart,
  addToCart,
  removeFromCart
}) => {
  const filteredItems = menuItems.filter(item => item.category === selectedCategory);
  const popularItems = filteredItems.filter(item => item.popular);
  const regularItems = filteredItems.filter(item => !item.popular);
  
  // Sort items: popular first, then regular
  const sortedItems = [...popularItems, ...regularItems];

  return (
    <div className="w-full lg:w-2/3">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      
      <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="mb-6 w-full h-auto flex flex-nowrap">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="px-4 py-2 whitespace-nowrap"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-6">
            {popularItems.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Badge className="bg-irctc-orange text-white">Popular Items</Badge>
                </div>
                <div className="space-y-4">
                  {popularItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      quantity={getItemQuantityInCart(item.id)}
                      onAdd={addToCart}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {regularItems.length > 0 && (
              <div className="space-y-4">
                {regularItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    quantity={getItemQuantityInCart(item.id)}
                    onAdd={addToCart}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            )}
            
            {filteredItems.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-500">No items available in this category</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuSection;
