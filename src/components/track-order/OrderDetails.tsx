
import React, { useState } from 'react';
import OrderStatusIcon from './OrderStatusIcon';
import OrderStatusProgress from './OrderStatusProgress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';

interface OrderData {
  orderId: string;
  status: string;
  statusText: string;
  statusPercent: number;
  restaurant: string;
  items: string[];
  deliveryTime: string;
  station: string;
  platform: string;
  trainDetails: string;
}

interface OrderDetailsProps {
  orderData: OrderData;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderData }) => {
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(orderData.deliveryTime);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryTime(e.target.value);
  };

  const saveTimeChange = () => {
    setIsEditingTime(false);
    // In a real app, you would send this update to the backend
    console.log("Delivery time updated to:", deliveryTime);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Order #{orderData.orderId}</h2>
        <div className="flex items-center">
          <OrderStatusIcon status={orderData.status} />
          <span className="ml-2 font-medium">{orderData.statusText}</span>
        </div>
      </div>
      
      <OrderStatusProgress statusPercent={orderData.statusPercent} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Order Details</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-medium mb-2">{orderData.restaurant}</p>
            <ul className="space-y-1 text-sm text-gray-600">
              {orderData.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Delivery Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-600">Estimated delivery:</p>
              {isEditingTime ? (
                <div className="flex items-center">
                  <Input 
                    value={deliveryTime} 
                    onChange={handleTimeChange} 
                    className="h-8 py-1 text-sm" 
                  />
                  <Button 
                    size="sm" 
                    onClick={saveTimeChange} 
                    className="ml-2 h-8 bg-irctc-orange"
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex items-center">
                  <p className="font-medium">{deliveryTime}</p>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setIsEditingTime(true)} 
                    className="ml-2 h-6 p-0"
                  >
                    <Clock className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              <p className="text-gray-600">Station:</p>
              <p className="font-medium">{orderData.station}</p>
              
              <p className="text-gray-600">Platform:</p>
              <p className="font-medium">{orderData.platform}</p>
              
              <p className="text-gray-600">Train details:</p>
              <p className="font-medium">{orderData.trainDetails}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
