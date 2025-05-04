
import { useState } from 'react';

export interface OrderData {
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

export const useOrderSearch = () => {
  const [orderSearched, setOrderSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const searchOrder = (searchMethod: string, searchValue: string) => {
    if (!searchValue) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setOrderSearched(true);
      setOrderData(mockOrderData);
    }, 1000);
  };

  return {
    orderSearched,
    isSearching,
    orderData,
    searchOrder
  };
};
