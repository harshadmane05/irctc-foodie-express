
import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePremium } from '@/context/PremiumContext';

interface PremiumRestaurantTagProps {
  className?: string;
}

const PremiumRestaurantTag: React.FC<PremiumRestaurantTagProps> = ({ className }) => {
  const { isPremium } = usePremium();
  
  return (
    <div className={cn(
      'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full',
      isPremium 
        ? 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-300'
        : 'bg-gray-100 text-gray-600 border border-gray-200',
      className
    )}>
      <Shield className="h-3 w-3" />
      <span className="font-medium">Premium Items</span>
    </div>
  );
};

export default PremiumRestaurantTag;
