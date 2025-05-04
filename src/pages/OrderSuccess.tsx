
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Package, MapPin, Home } from 'lucide-react';
import Footer from '@/components/layout/Footer';

const OrderSuccess = () => {
  const orderDetails = {
    orderId: 'IRF' + Math.floor(100000 + Math.random() * 900000),
    restaurant: 'Punjab Express',
    deliveryTime: '12:30 PM',
    station: 'New Delhi Railway Station',
    platform: '1',
    trainDetails: 'Rajdhani Express (12301) • Coach B2 • Seat 42',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Your food is being prepared and will be delivered to your train seat.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Restaurant</span>
              <span className="font-medium">{orderDetails.restaurant}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Delivery Time</span>
              <span className="font-medium">{orderDetails.deliveryTime}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Delivery Location</span>
              <div className="text-right">
                <span className="font-medium block">{orderDetails.station}</span>
                <span className="text-sm text-gray-500">Platform {orderDetails.platform}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Train Details</span>
              <span className="font-medium text-right">{orderDetails.trainDetails}</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
              asChild
            >
              <Link to="/track-order">
                <Package className="mr-2 h-4 w-4" />
                Track Order
              </Link>
            </Button>
            
            <Button 
              className="bg-irctc-orange hover:bg-irctc-orange/90"
              asChild
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
