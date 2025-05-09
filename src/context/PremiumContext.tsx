
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  checkPremiumStatus, 
  setPremiumStatus, 
  getPremiumPlan, 
  setPremiumPlan,
  setPremiumExpiration,
  getPremiumExpiration
} from '@/utils/premiumUtils';

interface PremiumContextType {
  isPremium: boolean;
  premiumPlan: 'monthly' | 'yearly' | null;
  premiumExpiration: Date | null;
  daysRemaining: number | null;
  activatePremium: (plan: 'monthly' | 'yearly') => void;
  cancelPremium: () => void;
  isPremiumItem: (itemId: string) => boolean;
  getPremiumDiscount: (price: number) => number;
}

const PremiumContext = createContext<PremiumContextType>({
  isPremium: false,
  premiumPlan: null,
  premiumExpiration: null,
  daysRemaining: null,
  activatePremium: () => {},
  cancelPremium: () => {},
  isPremiumItem: () => false,
  getPremiumDiscount: () => 0
});

export const usePremium = () => useContext(PremiumContext);

// Set of premium item IDs (this would typically come from your backend)
const PREMIUM_ITEMS = new Set(['item-123', 'item-456', 'item-789']);

export const PremiumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [premiumPlan, setPremiumPlanState] = useState<'monthly' | 'yearly' | null>(null);
  const [premiumExpiration, setPremiumExpirationState] = useState<Date | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const { toast } = useToast();

  // Load premium status from localStorage on mount
  useEffect(() => {
    const status = checkPremiumStatus();
    setIsPremium(status);
    
    const plan = getPremiumPlan();
    setPremiumPlanState(plan);
    
    const expDate = getPremiumExpiration();
    setPremiumExpirationState(expDate);
    
    // Calculate days remaining in subscription
    if (expDate) {
      const today = new Date();
      const diffTime = expDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays > 0 ? diffDays : 0);
    }
  }, []);

  // Function to check if an item is a premium item
  const isPremiumItem = (itemId: string): boolean => {
    return PREMIUM_ITEMS.has(itemId);
  };
  
  // Function to calculate premium discount
  const getPremiumDiscount = (price: number): number => {
    if (!isPremium) return 0;
    
    // Different discount rates based on plan type
    const discountRate = premiumPlan === 'yearly' ? 0.15 : 0.10;
    return price * discountRate;
  };

  // Activate premium subscription
  const activatePremium = (plan: 'monthly' | 'yearly') => {
    setPremiumStatus(true);
    setPremiumPlan(plan);
    
    // Set expiration date based on plan
    const expDate = new Date();
    if (plan === 'monthly') {
      expDate.setMonth(expDate.getMonth() + 1);
    } else {
      expDate.setFullYear(expDate.getFullYear() + 1);
    }
    
    setPremiumExpiration(expDate);
    setPremiumExpirationState(expDate);
    
    // Calculate days remaining
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays);
    
    setIsPremium(true);
    setPremiumPlanState(plan);
    
    toast({
      title: "Premium Activated",
      description: `You now have access to all premium features (${plan} plan)`,
    });
  };

  // Cancel premium subscription
  const cancelPremium = () => {
    setPremiumStatus(false);
    localStorage.removeItem('premiumPlan');
    localStorage.removeItem('premiumExpiration');
    
    setIsPremium(false);
    setPremiumPlanState(null);
    setPremiumExpirationState(null);
    setDaysRemaining(null);
    
    toast({
      title: "Premium Cancelled",
      description: "Your premium subscription has been cancelled",
    });
  };

  return (
    <PremiumContext.Provider 
      value={{ 
        isPremium, 
        premiumPlan,
        premiumExpiration,
        daysRemaining,
        activatePremium,
        cancelPremium,
        isPremiumItem,
        getPremiumDiscount
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};
