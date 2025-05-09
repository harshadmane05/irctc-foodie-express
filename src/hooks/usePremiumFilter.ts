
import { useState, useCallback } from 'react';
import { PremiumFilterType, hasPremiumItems } from '@/utils/premiumUtils';
import { usePremium } from '@/context/PremiumContext';

interface FilterOptions {
  initialFilter?: PremiumFilterType;
}

export const usePremiumFilter = ({ initialFilter = 'all' }: FilterOptions = {}) => {
  const [filter, setFilter] = useState<PremiumFilterType>(initialFilter);
  const { isPremium } = usePremium();
  
  const filterRestaurants = useCallback((restaurants: any[]) => {
    if (filter === 'all') {
      return restaurants;
    }
    
    if (filter === 'premium') {
      if (!isPremium) {
        return []; // No premium restaurants shown to non-premium users
      }
      return restaurants.filter(restaurant => hasPremiumItems(restaurant.id));
    }
    
    if (filter === 'regular') {
      return restaurants.filter(restaurant => !hasPremiumItems(restaurant.id));
    }
    
    return restaurants;
  }, [filter, isPremium]);
  
  return {
    filter,
    setFilter,
    filterRestaurants,
    isPremiumFilter: filter === 'premium',
    isRegularFilter: filter === 'regular',
    isAllFilter: filter === 'all'
  };
};
