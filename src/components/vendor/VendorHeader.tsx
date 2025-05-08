
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu as MenuIcon, Utensils, ShoppingBag, Package, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const VendorHeader: React.FC = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/vendor" className="flex items-center">
            <Utensils className="h-6 w-6 text-irctc-orange mr-2" />
            <span className="font-bold text-xl">IRCTC <span className="text-irctc-orange">Foodie</span></span>
            <span className="ml-2 text-xs bg-orange-100 text-irctc-orange px-2 py-1 rounded-full font-medium">
              Vendor
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <Link 
            to="/vendor" 
            className={`px-3 py-2 rounded-md flex items-center space-x-2 ${
              isActive('/vendor') 
                ? 'bg-orange-50 text-irctc-orange' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/vendor/menu" 
            className={`px-3 py-2 rounded-md flex items-center space-x-2 ${
              isActive('/vendor/menu') 
                ? 'bg-orange-50 text-irctc-orange' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MenuIcon size={18} />
            <span>Menu</span>
          </Link>
          
          <Link 
            to="/vendor/orders" 
            className={`px-3 py-2 rounded-md flex items-center space-x-2 ${
              isActive('/vendor/orders') 
                ? 'bg-orange-50 text-irctc-orange' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag size={18} />
            <span>Orders</span>
          </Link>
          
          <Link 
            to="/vendor/status" 
            className={`px-3 py-2 rounded-md flex items-center space-x-2 ${
              isActive('/vendor/status') 
                ? 'bg-orange-50 text-irctc-orange' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Package size={18} />
            <span>Status</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-600">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </Button>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <div className="text-right">
              <div className="font-medium text-sm">{user?.name || 'Vendor'}</div>
              <div className="text-xs text-gray-500">Restaurant Owner</div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => logout()}
              className="text-gray-600 hover:text-red-500"
              title="Logout"
            >
              <LogOut size={18} />
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <MenuIcon size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
