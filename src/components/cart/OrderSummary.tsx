
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Ticket, ArrowRight } from 'lucide-react';

interface OrderSummaryProps {
  getSubtotal: () => number;
  getTotal: () => number;
  discount: number;
  appliedCode: string;
  promoCode: string;
  setPromoCode: React.Dispatch<React.SetStateAction<string>>;
  applyPromoCode: () => void;
  removePromoCode: () => void;
  handleCheckout: (e: React.FormEvent) => void;
  isProcessing: boolean;
  cartItemsLength: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  getSubtotal,
  getTotal,
  discount,
  appliedCode,
  promoCode,
  setPromoCode,
  applyPromoCode,
  removePromoCode,
  handleCheckout,
  isProcessing,
  cartItemsLength
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{getSubtotal()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span>₹40</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Platform Fee</span>
          <span>₹10</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center">
              <Ticket className="h-4 w-4 mr-1" />
              Discount ({appliedCode})
            </span>
            <span>-₹{discount}</span>
          </div>
        )}
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{getTotal()}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
        {appliedCode ? (
          <div className="flex items-center bg-green-50 border border-green-200 p-2 rounded-md">
            <Badge className="bg-green-600 mr-2 flex items-center">
              <Ticket className="h-3 w-3 mr-1" />
              {appliedCode}
            </Badge>
            <span className="text-sm text-green-700 flex-1">Applied successfully</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
              onClick={removePromoCode}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="flex">
            <Input 
              className="rounded-r-none"
              placeholder="Enter code" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button 
              className="rounded-l-none bg-irctc-blue hover:bg-irctc-blue/90"
              onClick={applyPromoCode}
            >
              Apply
            </Button>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">Available codes: WELCOME20, TRAIN10, IRCTC50, FOODIE15</p>
      </div>
      
      <Button 
        className="w-full bg-irctc-orange hover:bg-irctc-orange/90 py-6"
        onClick={handleCheckout}
        disabled={isProcessing || cartItemsLength === 0}
      >
        {isProcessing ? "Processing..." : "Proceed to Payment"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default OrderSummary;
