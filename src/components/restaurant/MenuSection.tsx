
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '@/types/restaurant';

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

  return (
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
              <MenuItem
                key={item.id}
                item={item}
                quantity={getItemQuantityInCart(item.id)}
                onAdd={addToCart}
                onRemove={removeFromCart}
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuSection;
