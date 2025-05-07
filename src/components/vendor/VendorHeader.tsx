
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const VendorHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/vendor" className="flex items-center">
          <span className="font-bold text-xl">IRCTC <span className="text-irctc-orange">Foodie</span></span>
          <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">Vendor</span>
        </Link>
        <Link to="/vendor" className="flex items-center gap-1 text-sm">
          <Home size={16} /> Dashboard
        </Link>
      </div>
    </header>
  );
};

export default VendorHeader;
