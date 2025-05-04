
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Search, CheckCircle, Package, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/layout/Footer';

type OrderStatus = 'accepted' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: OrderStatus;
  trainDetails: string;
  platform: string;
  deliveryTime: string;
  trackingId: string;
}

const statusSteps: Record<OrderStatus, { label: string; icon: React.ReactNode; color: string }> = {
  accepted: { label: 'Accepted', icon: <CheckCircle size={16} />, color: 'bg-blue-500' },
  preparing: { label: 'Preparing', icon: <Clock size={16} />, color: 'bg-yellow-500' },
  ready: { label: 'Ready', icon: <Package size={16} />, color: 'bg-indigo-500' },
  out_for_delivery: { label: 'Out for Delivery', icon: <Package size={16} />, color: 'bg-purple-500' },
  delivered: { label: 'Delivered', icon: <CheckCircle size={16} />, color: 'bg-green-500' }
};

const UpdateStatus = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD12345',
      trackingId: 'TRK-12345',
      customerName: 'Rahul Sharma',
      items: [
        { name: 'Butter Chicken x 1', quantity: 1 },
        { name: 'Naan x 2', quantity: 2 }
      ],
      total: 330,
      status: 'preparing',
      trainDetails: 'Rajdhani Express (12301) • Coach B2 • Seat 42',
      platform: '1',
      deliveryTime: '12:30 PM'
    },
    {
      id: 'ORD12346',
      trackingId: 'TRK-12346',
      customerName: 'Priya Patel',
      items: [
        { name: 'Paneer Tikka x 1', quantity: 1 },
        { name: 'Roti x 3', quantity: 3 }
      ],
      total: 240,
      status: 'ready',
      trainDetails: 'Shatabdi Express (12002) • Coach C4 • Seat 15',
      platform: '3',
      deliveryTime: '1:15 PM'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredOrders(orders);
      return;
    }
    
    const filtered = orders.filter(order => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.trackingId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredOrders(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "No results found",
        description: "Try a different order ID or tracking number."
      });
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    setFilteredOrders(
      filteredOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Order ${orderId} status updated to ${statusSteps[newStatus].label}`
    });
  };
  
  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const statusFlow: OrderStatus[] = ['accepted', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    
    if (currentIndex < statusFlow.length - 1) {
      return statusFlow[currentIndex + 1];
    }
    
    return null;
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
          <h1 className="text-2xl font-bold mb-6">Update Order Status</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex gap-2">
              <Input 
                placeholder="Search by Order ID or Tracking Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSearch}>
                <Search size={16} className="mr-2" /> Search
              </Button>
            </div>
          </div>
          
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <Card key={order.id} className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                      <div className="flex justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">Order {order.id}</h3>
                          <p className="text-sm text-gray-600">Tracking ID: {order.trackingId}</p>
                          <p className="text-sm text-gray-500 mt-1">{order.customerName}</p>
                        </div>
                        <Badge className={`hidden md:inline-flex ${order.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'}`}>
                          {statusSteps[order.status].label}
                        </Badge>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-1">Items</h4>
                        <ul className="text-sm">
                          {order.items.map((item, index) => (
                            <li key={index}>{item.name}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Delivery Details</h4>
                        <p className="text-sm">{order.trainDetails}</p>
                        <p className="text-sm">Platform: {order.platform}</p>
                        <p className="text-sm">Delivery Time: {order.deliveryTime}</p>
                      </div>
                      
                      <div className="mt-6 md:hidden">
                        <Badge className={`mb-4 ${order.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'}`}>
                          {statusSteps[order.status].label}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-64 flex flex-col">
                      <h4 className="text-sm font-medium mb-3">Update Status</h4>
                      <div className="space-y-2">
                        {(['accepted', 'preparing', 'ready', 'out_for_delivery', 'delivered'] as OrderStatus[]).map((status, idx, arr) => (
                          <div key={status} className="flex items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                              order.status === status || arr.indexOf(order.status) > idx ? statusSteps[status].color : 'bg-gray-200'
                            } text-white`}>
                              {statusSteps[status].icon}
                            </div>
                            <span className="text-sm">{statusSteps[status].label}</span>
                          </div>
                        ))}
                      </div>
                      
                      {getNextStatus(order.status) && (
                        <Button 
                          onClick={() => handleStatusChange(order.id, getNextStatus(order.status)!)}
                          className="mt-4"
                        >
                          Update to {statusSteps[getNextStatus(order.status)!].label}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-500">
                {searchQuery ? 'No orders found matching your search.' : 'No orders to process at the moment.'}
              </p>
              {searchQuery && (
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchQuery('');
                    setFilteredOrders(orders);
                  }}
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UpdateStatus;
