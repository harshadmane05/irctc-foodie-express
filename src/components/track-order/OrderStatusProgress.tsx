
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Check, ChefHat, Package, Train } from 'lucide-react';

interface OrderStatusProgressProps {
  statusPercent: number;
}

const OrderStatusProgress: React.FC<OrderStatusProgressProps> = ({ statusPercent }) => {
  return (
    <div className="mb-8">
      <Progress value={statusPercent} className="h-2 mb-4" />
      
      <div className="grid grid-cols-4 gap-2">
        <div className="text-center">
          <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${statusPercent >= 0 ? 'bg-green-100' : 'bg-gray-100'}`}>
            <Check className={`h-4 w-4 ${statusPercent >= 0 ? 'text-green-600' : 'text-gray-400'}`} />
          </div>
          <p className="text-xs mt-1">Confirmed</p>
        </div>
        
        <div className="text-center">
          <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${statusPercent >= 33 ? 'bg-green-100' : 'bg-gray-100'}`}>
            <ChefHat className={`h-4 w-4 ${statusPercent >= 33 ? 'text-green-600' : 'text-gray-400'}`} />
          </div>
          <p className="text-xs mt-1">Preparing</p>
        </div>
        
        <div className="text-center">
          <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${statusPercent >= 66 ? 'bg-green-100' : 'bg-gray-100'}`}>
            <Package className={`h-4 w-4 ${statusPercent >= 66 ? 'text-green-600' : 'text-gray-400'}`} />
          </div>
          <p className="text-xs mt-1">On the way</p>
        </div>
        
        <div className="text-center">
          <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${statusPercent >= 100 ? 'bg-green-100' : 'bg-gray-100'}`}>
            <Train className={`h-4 w-4 ${statusPercent >= 100 ? 'text-green-600' : 'text-gray-400'}`} />
          </div>
          <p className="text-xs mt-1">Delivered</p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusProgress;
