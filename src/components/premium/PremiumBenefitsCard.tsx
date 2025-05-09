
import React from 'react';
import { Shield, BadgeCheck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePremium } from '@/context/PremiumContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

interface PremiumBenefitsCardProps {
  className?: string;
}

const PremiumBenefitsCard: React.FC<PremiumBenefitsCardProps> = ({ className }) => {
  const { isPremium } = usePremium();
  const navigate = useNavigate();
  
  if (isPremium) return null;
  
  return (
    <Card className={className}>
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-600" />
          <CardTitle className="text-lg">Premium Benefits</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-2">
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-amber-500" />
            <span>Priority delivery on all orders</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-amber-500" />
            <span>Exclusive premium menu items</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-amber-500" />
            <span>Up to 15% discount on all orders</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          onClick={() => navigate('/premium')}
          className="w-full bg-amber-500 hover:bg-amber-600 flex gap-2 items-center"
        >
          <CreditCard className="h-4 w-4" />
          <span>Upgrade to Premium</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumBenefitsCard;
