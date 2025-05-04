
import React from 'react';
import { Check, ChefHat, Package, Clock } from 'lucide-react';

interface OrderStatusIconProps {
  status: string;
}

const OrderStatusIcon: React.FC<OrderStatusIconProps> = ({ status }) => {
  switch (status) {
    case 'confirmed':
      return <Check className="h-6 w-6 text-green-600" />;
    case 'preparing':
      return <ChefHat className="h-6 w-6 text-irctc-orange" />;
    case 'outForDelivery':
      return <Package className="h-6 w-6 text-irctc-blue" />;
    case 'delivered':
      return <Check className="h-6 w-6 text-green-600" />;
    default:
      return <Clock className="h-6 w-6 text-gray-400" />;
  }
};

export default OrderStatusIcon;
