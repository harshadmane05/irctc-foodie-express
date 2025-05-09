
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  checkPremiumStatus, 
  setPremiumStatus, 
  getPremiumPlan, 
  setPremiumPlan 
} from '@/utils/premiumUtils';

interface PremiumContextType {
  isPremium: boolean;
  premiumPlan: 'monthly' | 'yearly' | null;
  activatePremium: (plan: 'monthly' | 'yearly') => void;
  cancelPremium: () => void;
}

const PremiumContext = createContext<PremiumContextType>({
  isPremium: false,
  premiumPlan: null,
  activatePremium: () => {},
  cancelPremium: () => {}
});

export const usePremium = () => useContext(PremiumContext);

export const PremiumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [premiumPlan, setPremiumPlanState] = useState<'monthly' | 'yearly' | null>(null);
  const { toast } = useToast();

  // Load premium status from localStorage on mount
  useEffect(() => {
    const status = checkPremiumStatus();
    setIsPremium(status);
    
    const plan = getPremiumPlan();
    setPremiumPlanState(plan);
  }, []);

  // Activate premium subscription
  const activatePremium = (plan: 'monthly' | 'yearly') => {
    setPremiumStatus(true);
    setPremiumPlan(plan);
    
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
    
    setIsPremium(false);
    setPremiumPlanState(null);
    
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
        activatePremium,
        cancelPremium
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};
