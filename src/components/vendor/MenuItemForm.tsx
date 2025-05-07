
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface MenuItemFormProps {
  newItem: Omit<MenuItem, 'id'>;
  setNewItem: React.Dispatch<React.SetStateAction<Omit<MenuItem, 'id'>>>;
  handleAddItem: () => void;
  handleUpdateItem: () => void;
  handleCancelEdit: () => void;
  editMode: boolean;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({
  newItem,
  setNewItem,
  handleAddItem,
  handleUpdateItem,
  handleCancelEdit,
  editMode
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        {editMode ? 'Edit Menu Item' : 'Add New Menu Item'}
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Item Name *</Label>
          <Input 
            id="name"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="e.g., Butter Chicken"
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category *</Label>
          <Input 
            id="category"
            name="category"
            value={newItem.category}
            onChange={handleInputChange}
            placeholder="e.g., Main Course, Starters"
          />
        </div>
        
        <div>
          <Label htmlFor="price">Price (₹) *</Label>
          <Input 
            id="price"
            name="price"
            type="number"
            value={newItem.price}
            onChange={handleInputChange}
            min="0"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description"
            name="description"
            value={newItem.description}
            onChange={handleInputChange}
            placeholder="Brief description of the dish"
            rows={3}
          />
        </div>
        
        {editMode ? (
          <div className="flex gap-2">
            <Button onClick={handleUpdateItem} className="flex-1">
              Update Item
            </Button>
            <Button variant="outline" onClick={handleCancelEdit} className="flex-1">
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={handleAddItem} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add to Menu
          </Button>
        )}
      </div>
    </div>
  );
};

export default MenuItemForm;
