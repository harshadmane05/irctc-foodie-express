
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const EmptyCart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
      <Button 
        className="bg-irctc-orange hover:bg-irctc-orange/90"
        asChild
      >
        <Link to="/restaurants">Browse Restaurants</Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
