
import React from 'react';
import { Lock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePremium } from '@/context/PremiumContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface PremiumMenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  className?: string;
  onAddToCart?: () => void;
}

const PremiumMenuItem: React.FC<PremiumMenuItemProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  className,
  onAddToCart
}) => {
  const { isPremium, getPremiumDiscount } = usePremium();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const discount = getPremiumDiscount(price);
  const finalPrice = price - discount;
  
  const handleClick = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Upgrade to premium to access this exclusive menu item",
        variant: "default",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/premium')}
            className="bg-amber-500 hover:bg-amber-600 text-white border-none"
          >
            Upgrade
          </Button>
        ),
      });
      return;
    }
    
    if (onAddToCart) {
      onAddToCart();
    }
  };
  
  return (
    <div className={cn(
      'relative rounded-lg overflow-hidden border',
      isPremium ? 'border-amber-200 bg-amber-50' : 'border-gray-200',
      className
    )}>
      <div className="absolute top-2 right-2 z-10">
        <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs px-2 py-0.5 rounded-full">
          <Shield className="h-3 w-3" />
          <span>Premium</span>
        </div>
      </div>
      
      {imageUrl && (
        <div className="h-32 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-3">
        <h3 className="font-medium text-base">{name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        
        <div className="mt-2 flex justify-between items-center">
          <div>
            {isPremium ? (
              <div className="flex items-end gap-1">
                <span className="font-bold">₹{finalPrice.toFixed(2)}</span>
                <span className="text-xs text-gray-500 line-through">₹{price.toFixed(2)}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Lock className="h-3 w-3 mr-1 text-gray-400" />
                <span className="text-gray-400 text-sm">Unlock with Premium</span>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleClick}
            variant="ghost"
            size="sm"
            className={isPremium ? "bg-amber-100 hover:bg-amber-200 text-amber-800" : "text-gray-500"}
          >
            {isPremium ? "Add to Cart" : "Upgrade"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumMenuItem;
