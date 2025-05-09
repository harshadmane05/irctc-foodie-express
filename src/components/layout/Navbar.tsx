
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils, ShoppingCart, User, Menu, Shield, Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePremium } from '@/context/PremiumContext';
import PremiumBadge from '@/components/premium/PremiumBadge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const { isPremium, premiumPlan, daysRemaining } = usePremium();
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
            className={`text-sm font-medium transition-colors hover:text-irctc-orange ${isActive('/') && 'text-irctc-orange'}`}
          >
            Home
          </Link>
          <Link
            to="/restaurants"
            className={`text-sm font-medium transition-colors hover:text-irctc-orange ${isActive('/restaurants') && 'text-irctc-orange'}`}
          >
            Restaurants
          </Link>
          <Link
            to="/track-order"
            className={`text-sm font-medium transition-colors hover:text-irctc-orange ${isActive('/track-order') && 'text-irctc-orange'}`}
          >
            Track Order
          </Link>
          <Link
            to="/help"
            className={`text-sm font-medium transition-colors hover:text-irctc-orange ${isActive('/help') && 'text-irctc-orange'}`}
          >
            Help
          </Link>
          <Link
            to="/premium"
            className={`text-sm font-medium text-irctc-orange transition-colors hover:text-irctc-orange/80 flex items-center gap-1 ${isActive('/premium') && 'font-bold'}`}
          >
            <Shield className="h-4 w-4" />
            Premium
            {isPremium && daysRemaining && daysRemaining <= 7 && (
              <span className="bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded-full">
                {daysRemaining}d
              </span>
            )}
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
              
              {/* Notifications button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative p-1">
                      <Bell className="h-5 w-5 text-gray-600" />
                      {isPremium && (
                        <span className="absolute -top-1 -right-1 bg-amber-500 h-2 w-2 rounded-full"></span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isPremium 
                      ? `Premium active: ${premiumPlan} plan` 
                      : 'Notifications'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Link to="/cart" className="text-gray-600 hover:text-irctc-orange transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </Link>
              
              {/* Premium Badge with tooltip */}
              {isPremium && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="hidden md:block">
                        <PremiumBadge className="cursor-help" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <div className="font-medium">{premiumPlan === 'yearly' ? 'Yearly' : 'Monthly'} Premium</div>
                        {daysRemaining && (
                          <div className={`text-xs ${daysRemaining <= 7 ? 'text-red-500' : ''}`}>
                            {daysRemaining} days remaining
                          </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
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
