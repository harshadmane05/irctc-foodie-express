import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Home, Plus, Pencil, Trash2, ImageIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/layout/Footer';

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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };
  
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

  const getFallbackImage = (name: string) => {
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('cheese') || nameLower.includes('pizza')) {
      return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop';
    } else if (nameLower.includes('biryani') || nameLower.includes('rice')) {
      return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop';
    } else if (nameLower.includes('chicken') || nameLower.includes('meat')) {
      return 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop';
    }
    
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/vendor" className="flex items-center">
            <span className="font-bold text-xl">IRCTC <span className="text-irctc-orange">Foodie</span></span>
            <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">Vendor</span>
          </Link>
          <Link to="/vendor" className="flex items-center gap-1 text-sm">
            <Home size={16} /> Dashboard
          </Link>
        </div>
      </header>
      
      <main className="flex-grow bg-gray-50 px-4 py-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Menu</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
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
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Current Menu Items</h2>
                {menuItems.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {menuItems.map((item) => (
                      <div key={item.id} className="py-4">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-4">
                            <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                              {item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = getFallbackImage(item.name);
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <ImageIcon className="text-gray-400" />
                                </div>
                              )}
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
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleDeleteItem(item.id, item.name)}
                              className="text-red-500 hover:text-red-600"
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageMenu;
