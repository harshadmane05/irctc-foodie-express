
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/layout/Footer';
import VendorHeader from '@/components/vendor/VendorHeader';
import MenuItemForm from '@/components/vendor/MenuItemForm';
import MenuItemList from '@/components/vendor/MenuItemList';
import { getFallbackImage } from '@/utils/imageUtils';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

const ManageMenu = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Butter Chicken',
      description: 'Tender chicken cooked in a creamy tomato sauce',
      price: 250,
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop'
    },
    {
      id: '2',
      name: 'Paneer Tikka',
      description: 'Chunks of paneer marinated and grilled to perfection',
      price: 180,
      category: 'Starters',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a254b3bd4?w=800&auto=format&fit=crop'
    }
  ]);
  
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: ''
  });
  
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  
  const handleAddItem = () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const itemToAdd = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    setMenuItems([...menuItems, itemToAdd]);
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: ''
    });
    
    toast({
      title: "Item added",
      description: `${itemToAdd.name} has been added to your menu.`
    });
  };
  
  const handleEditClick = (item: MenuItem) => {
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category
    });
    setEditMode(true);
    setEditItemId(item.id);
  };
  
  const handleUpdateItem = () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedItems = menuItems.map(item => 
      item.id === editItemId ? { ...item, ...newItem } : item
    );
    
    setMenuItems(updatedItems);
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: ''
    });
    setEditMode(false);
    setEditItemId(null);
    
    toast({
      title: "Item updated",
      description: "Menu item has been updated successfully."
    });
  };
  
  const handleCancelEdit = () => {
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: ''
    });
    setEditMode(false);
    setEditItemId(null);
  };
  
  const handleDeleteItem = (id: string, name: string) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedItems);
    
    toast({
      title: "Item removed",
      description: `${name} has been removed from your menu.`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <VendorHeader />
      
      <main className="flex-grow bg-gray-50 px-4 py-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Menu</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <MenuItemForm 
                newItem={newItem}
                setNewItem={setNewItem}
                handleAddItem={handleAddItem}
                handleUpdateItem={handleUpdateItem}
                handleCancelEdit={handleCancelEdit}
                editMode={editMode}
              />
            </div>
            
            <div className="lg:col-span-2">
              <MenuItemList 
                menuItems={menuItems}
                handleEditClick={handleEditClick}
                handleDeleteItem={handleDeleteItem}
                getFallbackImage={getFallbackImage}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageMenu;
