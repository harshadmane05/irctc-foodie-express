
import { useState, useEffect } from 'react';
import { CartItem } from '@/types/restaurant';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Available promo codes with their discount values
const availablePromoCodes = {
  'WELCOME20': 0.2,   // 20% discount
  'TRAIN10': 0.1,     // 10% discount
  'IRCTC50': 0.5,     // 50% discount (for first-time users)
  'FOODIE15': 0.15,   // 15% discount
};

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

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'item-1',
      name: 'Butter Chicken',
      price: 250,
      quantity: 1,
      restaurant: 'Punjab Express',
      restaurantId: 'rest-1',
      veg: false,
      description: '',
      category: 'Main Course'
    },
    {
      id: 'item-5',
      name: 'Butter Naan',
      price: 50,
      quantity: 2,
      restaurant: 'Punjab Express',
      restaurantId: 'rest-1',
      veg: true,
      description: '',
      category: 'Breads'
    },
    {
      id: 'item-7',
      name: 'Sweet Lassi',
      price: 80,
      quantity: 1,
      restaurant: 'Punjab Express',
      restaurantId: 'rest-1',
      veg: true,
      description: '',
      category: 'Beverages'
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

  return {
    cartItems,
    promoCode,
    setPromoCode,
    appliedCode,
    discount,
    trainInfo,
    setTrainInfo,
    stations,
    deliveryTimes,
    isProcessing,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    handleStationChange,
    applyPromoCode,
    removePromoCode,
    getSubtotal,
    getTotal,
    handleCheckout
  };
};
