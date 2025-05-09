
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, ImageIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface MenuItemListProps {
  menuItems: MenuItem[];
  handleEditClick: (item: MenuItem) => void;
  handleDeleteItem: (id: string, name: string) => void;
  getFallbackImage: (name: string) => string;
}

const MenuItemList: React.FC<MenuItemListProps> = ({
  menuItems,
  handleEditClick,
  handleDeleteItem,
  getFallbackImage
}) => {
  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, itemName: string) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite error loops
    target.src = getFallbackImage(itemName);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md premium-glass">
      <h2 className="text-lg font-semibold mb-4">Current Menu Items</h2>
      {menuItems.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {menuItems.map((item) => (
            <div key={item.id} className="py-4 premium-effect hover:bg-gray-50/50 p-2 rounded">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0 premium-image">
                    <img 
                      src={item.image || getFallbackImage(item.name)} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e, item.name)}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    <div className="flex gap-3 mt-2 text-sm">
                      <span className="text-gray-600">₹{item.price}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleEditClick(item)}
                    className="hover:bg-blue-50 transition-colors"
                    aria-label="Edit item"
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleDeleteItem(item.id, item.name)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    aria-label="Delete item"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No menu items yet. Add your first dish!</p>
        </div>
      )}
    </div>
  );
};

export default MenuItemList;
