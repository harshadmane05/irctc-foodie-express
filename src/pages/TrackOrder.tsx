
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, Check, ChefHat, Package, Train } from 'lucide-react';

const TrackOrder = () => {
  const [orderSearched, setOrderSearched] = useState(false);
  const [searchMethod, setSearchMethod] = useState('orderId');
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setOrderSearched(true);
    }, 1000);
  };
  
  const mockOrderData = {
    orderId: 'IRF289076',
    status: 'preparing',
    statusText: 'Preparing your food',
    statusPercent: 40,
    restaurant: 'Punjab Express',
    items: [
      'Butter Chicken x 1',
      'Butter Naan x 2',
      'Sweet Lassi x 1'
    ],
    deliveryTime: '12:30 PM',
    station: 'New Delhi Railway Station',
    platform: '1',
    trainDetails: 'Rajdhani Express (12301) • Coach B2 • Seat 42'
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Check className="h-6 w-6 text-green-600" />;
      case 'preparing':
        return <ChefHat className="h-6 w-6 text-irctc-orange" />;
      case 'outForDelivery':
        return <Package className="h-6 w-6 text-irctc-blue" />;
      case 'delivered':
        return <Check className="h-6 w-6 text-green-600" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Enter Order Details</h2>
              
              <form onSubmit={handleSearch} className="space-y-4">
                <RadioGroup 
                  value={searchMethod} 
                  onValueChange={setSearchMethod}
                  className="flex flex-wrap gap-4 mb-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="orderId" id="option-orderId" />
                    <Label htmlFor="option-orderId">Order ID</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="option-phone" />
                    <Label htmlFor="option-phone">Phone Number</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pnr" id="option-pnr" />
                    <Label htmlFor="option-pnr">PNR Number</Label>
                  </div>
                </RadioGroup>
                
                <div className="flex gap-2">
                  <Input
                    placeholder={
                      searchMethod === 'orderId' 
                        ? "Enter Order ID (e.g., IRF289076)" 
                        : searchMethod === 'phone' 
                        ? "Enter Phone Number" 
                        : "Enter PNR Number"
                    }
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-grow"
                  />
                  <Button 
                    type="submit"
                    className="bg-irctc-orange hover:bg-irctc-orange/90"
                    disabled={isSearching || !searchValue}
                  >
                    {isSearching ? "Searching..." : "Track"}
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500">
                  Try searching with Order ID: IRF289076
                </p>
              </form>
            </div>
            
            {orderSearched && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Order #{mockOrderData.orderId}</h2>
                  <div className="flex items-center">
                    {getStatusIcon(mockOrderData.status)}
                    <span className="ml-2 font-medium">{mockOrderData.statusText}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <Progress value={mockOrderData.statusPercent} className="h-2 mb-4" />
                  
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center">
                      <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${mockOrderData.statusPercent >= 0 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <Check className={`h-4 w-4 ${mockOrderData.statusPercent >= 0 ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <p className="text-xs mt-1">Confirmed</p>
                    </div>
                    
                    <div className="text-center">
                      <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${mockOrderData.statusPercent >= 33 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <ChefHat className={`h-4 w-4 ${mockOrderData.statusPercent >= 33 ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <p className="text-xs mt-1">Preparing</p>
                    </div>
                    
                    <div className="text-center">
                      <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${mockOrderData.statusPercent >= 66 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <Package className={`h-4 w-4 ${mockOrderData.statusPercent >= 66 ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <p className="text-xs mt-1">On the way</p>
                    </div>
                    
                    <div className="text-center">
                      <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${mockOrderData.statusPercent >= 100 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <Train className={`h-4 w-4 ${mockOrderData.statusPercent >= 100 ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <p className="text-xs mt-1">Delivered</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Order Details</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium mb-2">{mockOrderData.restaurant}</p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {mockOrderData.items.map((item, i) => (
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
                        <p className="font-medium">{mockOrderData.deliveryTime}</p>
                        
                        <p className="text-gray-600">Station:</p>
                        <p className="font-medium">{mockOrderData.station}</p>
                        
                        <p className="text-gray-600">Platform:</p>
                        <p className="font-medium">{mockOrderData.platform}</p>
                        
                        <p className="text-gray-600">Train details:</p>
                        <p className="font-medium">{mockOrderData.trainDetails}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;
