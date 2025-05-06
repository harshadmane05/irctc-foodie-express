import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Trash, Plus, Minus, ArrowRight, Ticket } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurant: string;
  restaurantId: string;
  veg: boolean;
}

// Available promo codes with their discount values
const availablePromoCodes = {
  'WELCOME20': 0.2,   // 20% discount
  'TRAIN10': 0.1,     // 10% discount
  'IRCTC50': 0.5,     // 50% discount (for first-time users)
  'FOODIE15': 0.15,   // 15% discount
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'item-1',
      name: 'Butter Chicken',
      price: 250,
      quantity: 1,
      restaurant: 'Punjab Express',
      restaurantId: 'rest-1',
      veg: false
    },
    {
      id: 'item-5',
      name: 'Butter Naan',
      price: 50,
      quantity: 2,
      restaurant: 'Punjab Express',
      restaurantId: 'rest-1',
      veg: true
    },
    {
      id: 'item-7',
      name: 'Sweet Lassi',
      price: 80,
      quantity: 1,
      restaurant: 'Punjab Express',
      restaurantId: 'rest-1',
      veg: true
    }
  ]);
  
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [trainInfo, setTrainInfo] = useState({
    trainNumber: '',
    coach: '',
    seat: '',
    station: 'New Delhi',
    deliveryTime: '12:30 PM'
  });
  
  // Available stations for selection
  const stations = [
    { value: 'New Delhi', label: 'New Delhi Railway Station' },
    { value: 'Mumbai Central', label: 'Mumbai Central' },
    { value: 'Chennai Central', label: 'Chennai Central' },
    { value: 'Howrah', label: 'Howrah Junction, Kolkata' },
    { value: 'Ahmedabad', label: 'Ahmedabad Junction' },
    { value: 'Bangalore', label: 'KSR Bangalore City Junction' },
    { value: 'Jaipur', label: 'Jaipur Junction' },
  ];
  
  // Delivery times based on selected station
  const deliveryTimes = {
    'New Delhi': '12:30 PM',
    'Mumbai Central': '1:15 PM',
    'Chennai Central': '1:45 PM',
    'Howrah': '12:00 PM',
    'Ahmedabad': '2:00 PM',
    'Bangalore': '1:30 PM',
    'Jaipur': '12:45 PM',
  };
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const incrementQuantity = (itemId: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  
  const decrementQuantity = (itemId: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };
  
  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };
  
  const handleStationChange = (value: string) => {
    setTrainInfo({
      ...trainInfo,
      station: value,
      deliveryTime: deliveryTimes[value as keyof typeof deliveryTimes] || '12:30 PM'
    });
  };
  
  const applyPromoCode = () => {
    const code = promoCode.toUpperCase();
    
    if (code in availablePromoCodes) {
      const discountPercentage = availablePromoCodes[code as keyof typeof availablePromoCodes];
      const subtotal = getSubtotal();
      const discountAmount = subtotal * discountPercentage;
      
      setDiscount(discountAmount);
      setAppliedCode(code);
      
      // Show success message
      toast({
        title: "Promo code applied",
        description: `You got ${discountPercentage * 100}% off your order!`,
      });
    } else {
      // Show error message
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code",
        variant: "destructive"
      });
      setDiscount(0);
      setAppliedCode('');
    }
  };
  
  const removePromoCode = () => {
    setPromoCode('');
    setAppliedCode('');
    setDiscount(0);
    
    toast({
      title: "Promo code removed",
      description: "Your discount has been removed",
    });
  };
  
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Update getTotal to include the discount
  const getTotal = () => {
    const subtotal = getSubtotal();
    const deliveryFee = 40;
    const platformFee = 10;
    return subtotal + deliveryFee + platformFee - discount;
  };
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trainInfo.trainNumber || !trainInfo.coach || !trainInfo.seat) {
      toast({
        title: "Missing train information",
        description: "Please enter your train details for delivery",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Your food will be delivered to your seat",
      });
      
      setIsProcessing(false);
      navigate('/order-success');
    }, 1500);
  };
  
  useEffect(() => {
    // This would be replaced with real cart data from a state management solution in a production app
    if (cartItems.length === 0) {
      // If cart becomes empty, could redirect or show empty state
    }
  }, [cartItems, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button 
                className="bg-irctc-orange hover:bg-irctc-orange/90"
                asChild
              >
                <Link to="/restaurants">Browse Restaurants</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Items in Your Cart</h2>
                  
                  <div className="border-b pb-3 mb-3">
                    <div className="flex items-center">
                      <Badge className="bg-irctc-blue mr-2">
                        {cartItems[0].restaurant}
                      </Badge>
                      <Link to={`/restaurant/${cartItems[0].restaurantId}`} className="text-irctc-blue hover:underline text-sm">
                        View Restaurant
                      </Link>
                    </div>
                  </div>
                  
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between py-4 border-b last:border-b-0">
                      <div className="flex items-start">
                        <Badge className={item.veg ? "bg-green-600 h-4 w-4 mr-3 mt-1" : "bg-red-600 h-4 w-4 mr-3 mt-1"} variant="outline">
                          <div className={`w-1 h-1 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`}></div>
                        </Badge>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-500 text-sm">₹{item.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex items-center mr-4">
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8"
                            onClick={() => decrementQuantity(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 w-6 text-center">{item.quantity}</span>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8"
                            onClick={() => incrementQuantity(item.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">₹{item.price * item.quantity}</div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-red-500 hover:text-red-700 p-0"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Train Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Train Number</label>
                        <Input 
                          placeholder="e.g. 12345" 
                          value={trainInfo.trainNumber}
                          onChange={(e) => setTrainInfo({...trainInfo, trainNumber: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Coach</label>
                        <Input 
                          placeholder="e.g. B1" 
                          value={trainInfo.coach}
                          onChange={(e) => setTrainInfo({...trainInfo, coach: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Seat Number</label>
                        <Input 
                          placeholder="e.g. 42" 
                          value={trainInfo.seat}
                          onChange={(e) => setTrainInfo({...trainInfo, seat: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Station</label>
                      <Select
                        value={trainInfo.station}
                        onValueChange={handleStationChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a station" />
                        </SelectTrigger>
                        <SelectContent>
                          {stations.map((station) => (
                            <SelectItem key={station.value} value={station.value}>
                              {station.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="mt-2 flex items-center bg-gray-100 px-3 py-2 rounded-md">
                        <span>Estimated delivery time:</span>
                        <Badge className="ml-2 bg-green-600">{trainInfo.deliveryTime}</Badge>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{getSubtotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>₹40</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fee</span>
                      <span>₹10</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center">
                          <Ticket className="h-4 w-4 mr-1" />
                          Discount ({appliedCode})
                        </span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{getTotal()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                    {appliedCode ? (
                      <div className="flex items-center bg-green-50 border border-green-200 p-2 rounded-md">
                        <Badge className="bg-green-600 mr-2 flex items-center">
                          <Ticket className="h-3 w-3 mr-1" />
                          {appliedCode}
                        </Badge>
                        <span className="text-sm text-green-700 flex-1">Applied successfully</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                          onClick={removePromoCode}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex">
                        <Input 
                          className="rounded-r-none"
                          placeholder="Enter code" 
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button 
                          className="rounded-l-none bg-irctc-blue hover:bg-irctc-blue/90"
                          onClick={applyPromoCode}
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Available codes: WELCOME20, TRAIN10, IRCTC50, FOODIE15</p>
                  </div>
                  
                  <Button 
                    className="w-full bg-irctc-orange hover:bg-irctc-orange/90 py-6"
                    onClick={handleCheckout}
                    disabled={isProcessing || cartItems.length === 0}
                  >
                    {isProcessing ? "Processing..." : "Proceed to Payment"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
