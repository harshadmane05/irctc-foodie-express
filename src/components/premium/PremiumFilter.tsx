
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge, ShieldCheck } from 'lucide-react';
import { usePremium } from '@/context/PremiumContext';
import { PremiumFilterType } from '@/utils/premiumUtils';

interface PremiumFilterProps {
  currentFilter: PremiumFilterType;
  onChange: (filter: PremiumFilterType) => void;
  className?: string;
}

const PremiumFilter: React.FC<PremiumFilterProps> = ({ 
  currentFilter, 
  onChange,
  className
}) => {
  const { isPremium } = usePremium();
  
  return (
    <div className={cn("flex gap-2 mb-4", className)}>
      <button
        onClick={() => onChange('all')}
        className={cn(
          "px-3 py-1.5 text-sm rounded-full border transition-all",
          currentFilter === 'all' 
            ? "bg-gray-100 text-gray-800 border-gray-300 font-medium" 
            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
        )}
      >
        All Restaurants
      </button>
      
      <button
        onClick={() => onChange('premium')}
        disabled={!isPremium}
        className={cn(
          "px-3 py-1.5 text-sm rounded-full border transition-all flex items-center gap-1.5",
          currentFilter === 'premium' 
            ? "premium-filter-active font-medium" 
            : isPremium 
              ? "bg-white text-gray-600 border-gray-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200" 
              : "bg-gray-100 text-gray-400 border-gray-200 opacity-60 cursor-not-allowed"
        )}
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        Premium Only
      </button>
      
      {!isPremium && currentFilter === 'premium' && (
        <div className="text-xs text-amber-600 flex items-center ml-2">
          <Badge className="h-3 w-3 mr-1" />
          Upgrade to access premium restaurants
        </div>
      )}
    </div>
  );
};

export default PremiumFilter;
