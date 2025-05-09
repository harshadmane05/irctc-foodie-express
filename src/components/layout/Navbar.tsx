
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils, ShoppingCart, User, Menu, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePremium } from '@/context/PremiumContext';
import PremiumBadge from '@/components/premium/PremiumBadge';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const { isPremium } = usePremium();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center mr-4 lg:mr-6">
          <Utensils className="h-5 w-5 mr-2 text-irctc-orange" />
          <span className="font-bold text-xl">IRCTC <span className="text-irctc-orange">Foodie</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-irctc-orange"
          >
            Home
          </Link>
          <Link
            to="/restaurants"
            className="text-sm font-medium transition-colors hover:text-irctc-orange"
          >
            Restaurants
          </Link>
          <Link
            to="/track-order"
            className="text-sm font-medium transition-colors hover:text-irctc-orange"
          >
            Track Order
          </Link>
          <Link
            to="/help"
            className="text-sm font-medium transition-colors hover:text-irctc-orange"
          >
            Help
          </Link>
          <Link
            to="/premium"
            className="text-sm font-medium text-irctc-orange transition-colors hover:text-irctc-orange/80 flex items-center gap-1"
          >
            <Shield className="h-4 w-4" />
            Premium
          </Link>
        </nav>
        
        <div className="ml-auto flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {user && user.role === 'passenger' && (
                <Link to="/passenger" className="hidden md:block text-sm font-medium transition-colors hover:text-irctc-orange">
                  <User className="h-4 w-4 mr-1 inline-block" />
                  Dashboard
                </Link>
              )}
              {user && user.role === 'vendor' && (
                <Link to="/vendor" className="hidden md:block text-sm font-medium transition-colors hover:text-irctc-orange">
                  <User className="h-4 w-4 mr-1 inline-block" />
                  Dashboard
                </Link>
              )}
              <Link to="/cart" className="text-gray-600 hover:text-irctc-orange transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </Link>
              {/* Premium Badge - Now using the context */}
              {isPremium && <PremiumBadge className="hidden md:flex" />}
            </>
          ) : (
            <>
              <Link to="/login" className="hidden md:block text-sm font-medium transition-colors hover:text-irctc-orange">
                Login
              </Link>
              <Link to="/register" className="hidden md:block text-sm font-medium transition-colors hover:text-irctc-orange">
                Register
              </Link>
            </>
          )}
          <Menu className="md:hidden h-6 w-6 cursor-pointer text-gray-600 hover:text-irctc-orange transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
