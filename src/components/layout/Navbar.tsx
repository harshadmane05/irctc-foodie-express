
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X, ShoppingCart, Train } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to restaurants page with search query
      navigate(`/restaurants?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      // Close mobile menu if open
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Train size={28} className="text-irctc-orange mr-2" />
              <span className="font-bold text-xl">IRCTC <span className="text-irctc-orange">Foodie</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-irctc-orange transition-colors">Home</Link>
            <Link to="/restaurants" className="text-gray-700 hover:text-irctc-orange transition-colors">Restaurants</Link>
            <Link to="/track-order" className="text-gray-700 hover:text-irctc-orange transition-colors">Track Order</Link>
            <Link to="/help" className="text-gray-700 hover:text-irctc-orange transition-colors">Help</Link>
          </div>

          {/* Search, Cart and Login - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                type="text" 
                placeholder="Search restaurants or food..." 
                className="pl-10 pr-4 py-2 rounded-full w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-irctc-orange transition-colors" />
              <span className="absolute -right-1 -top-1 bg-irctc-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </Link>
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-irctc-orange hover:bg-irctc-orange/90" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              <span className="absolute -right-1 -top-1 bg-irctc-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </Link>
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-slide-in">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Input 
              type="text" 
              placeholder="Search restaurants or food..." 
              className="pl-10 pr-4 py-2 rounded-full w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-irctc-orange transition-colors py-2 border-b border-gray-100">Home</Link>
            <Link to="/restaurants" className="text-gray-700 hover:text-irctc-orange transition-colors py-2 border-b border-gray-100">Restaurants</Link>
            <Link to="/track-order" className="text-gray-700 hover:text-irctc-orange transition-colors py-2 border-b border-gray-100">Track Order</Link>
            <Link to="/help" className="text-gray-700 hover:text-irctc-orange transition-colors py-2 border-b border-gray-100">Help</Link>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-irctc-orange hover:bg-irctc-orange/90 flex-1" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
