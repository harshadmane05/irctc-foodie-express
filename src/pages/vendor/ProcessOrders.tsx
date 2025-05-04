
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/layout/Footer';

type OrderStatus = 'pending' | 'accepted' | 'rejected' | 'preparing' | 'ready';

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: OrderStatus;
  trainDetails: string;
  platform: string;
  deliveryTime: string;
  createdAt: string;
}

const ProcessOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD12345',
      customerName: 'Rahul Sharma',
      items: [
        { name: 'Butter Chicken', quantity: 1, price: 250 },
        { name: 'Naan', quantity: 2, price: 40 }
      ],
      total: 330,
      status: 'pending',
      trainDetails: 'Rajdhani Express (12301) • Coach B2 • Seat 42',
      platform: '1',
      deliveryTime: '12:30 PM',
      createdAt: '10:45 AM'
    },
    {
      id: 'ORD12346',
      customerName: 'Priya Patel',
      items: [
        { name: 'Paneer Tikka', quantity: 1, price: 180 },
        { name: 'Roti', quantity: 3, price: 20 }
      ],
      total: 240,
      status: 'accepted',
      trainDetails: 'Shatabdi Express (12002) • Coach C4 • Seat 15',
      platform: '3',
      deliveryTime: '1:15 PM',
      createdAt: '11:20 AM'
    }
  ]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    const statusMessages = {
      accepted: 'Order accepted successfully.',
      rejected: 'Order has been rejected.',
      preparing: 'Order marked as preparing.',
      ready: 'Order marked as ready for delivery.'
    };
    
    toast({
      title: "Status Updated",
      description: statusMessages[newStatus]
    });
  };

  const getStatusBadge = (status: OrderStatus) => {
    const statusConfig = {
      pending: { label: 'Pending', variant: 'outline' },
      accepted: { label: 'Accepted', variant: 'secondary' },
      rejected: { label: 'Rejected', variant: 'destructive' },
      preparing: { label: 'Preparing', variant: 'default' },
      ready: { label: 'Ready', variant: 'success' }
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge variant={config.variant as any}>{config.label}</Badge>
    );
  };

  const filterOrdersByStatus = (statuses: OrderStatus[]) => {
    return orders.filter(order => statuses.includes(order.status));
  };

  const pendingOrders = filterOrdersByStatus(['pending']);
  const acceptedOrders = filterOrdersByStatus(['accepted', 'preparing', 'ready']);
  const rejectedOrders = filterOrdersByStatus(['rejected']);

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
          <h1 className="text-2xl font-bold mb-6">Process Orders</h1>
          
          <Tabs defaultValue="new" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="new">
                New Orders
                {pendingOrders.length > 0 && (
                  <span className="ml-2 bg-irctc-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {pendingOrders.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="accepted">In Progress</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new">
              {pendingOrders.length > 0 ? (
                <div className="space-y-4">
                  {pendingOrders.map(order => (
                    <OrderCard 
                      key={order.id}
                      order={order}
                      onStatusChange={handleStatusChange}
                      getStatusBadge={getStatusBadge}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState message="No new orders at the moment." />
              )}
            </TabsContent>
            
            <TabsContent value="accepted">
              {acceptedOrders.length > 0 ? (
                <div className="space-y-4">
                  {acceptedOrders.map(order => (
                    <OrderCard 
                      key={order.id}
                      order={order}
                      onStatusChange={handleStatusChange}
                      getStatusBadge={getStatusBadge}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState message="No orders in progress." />
              )}
            </TabsContent>
            
            <TabsContent value="rejected">
              {rejectedOrders.length > 0 ? (
                <div className="space-y-4">
                  {rejectedOrders.map(order => (
                    <OrderCard 
                      key={order.id}
                      order={order}
                      onStatusChange={handleStatusChange}
                      getStatusBadge={getStatusBadge}
                      readonly={true}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState message="No rejected orders." />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  getStatusBadge: (status: OrderStatus) => React.ReactNode;
  readonly?: boolean;
}

const OrderCard = ({ order, onStatusChange, getStatusBadge, readonly = false }: OrderCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{order.id}</h3>
              <p className="text-sm text-gray-500">{order.customerName}</p>
              <p className="text-xs text-gray-400">Ordered at {order.createdAt}</p>
            </div>
            <div className="md:hidden">
              {getStatusBadge(order.status)}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Items</h4>
            <ul className="text-sm">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 pt-2 border-t border-dashed flex justify-between font-medium">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Delivery Details</h4>
            <p className="text-sm">{order.trainDetails}</p>
            <p className="text-sm">Platform: {order.platform}</p>
            <p className="text-sm">Delivery Time: {order.deliveryTime}</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 min-w-[200px]">
          <div className="hidden md:block mb-2 self-end">
            {getStatusBadge(order.status)}
          </div>
          
          {!readonly && (
            <>
              {order.status === 'pending' && (
                <>
                  <Button 
                    className="w-full"
                    onClick={() => onStatusChange(order.id, 'accepted')}
                  >
                    <CheckCircle size={16} className="mr-2" /> Accept Order
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-red-200 text-red-500 hover:bg-red-50"
                    onClick={() => onStatusChange(order.id, 'rejected')}
                  >
                    <XCircle size={16} className="mr-2" /> Reject Order
                  </Button>
                </>
              )}
              
              {order.status === 'accepted' && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onStatusChange(order.id, 'preparing')}
                >
                  <Clock size={16} className="mr-2" /> Mark as Preparing
                </Button>
              )}
              
              {order.status === 'preparing' && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onStatusChange(order.id, 'ready')}
                >
                  <CheckCircle size={16} className="mr-2" /> Mark as Ready
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="bg-white rounded-lg p-8 text-center">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default ProcessOrders;
