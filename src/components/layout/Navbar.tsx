
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X, ShoppingCart, Train, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, role, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md' 
        : 'bg-white'
      }`}>
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-premium p-2 rounded-lg mr-3 group-hover:shadow-lg transition-all duration-300">
                <Train size={28} className="text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="font-bold text-xl">IRCTC <span className="text-irctc-orange">Foodie</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`px-3 py-2 rounded-md transition-colors ${isActiveLink('/') ? 'text-irctc-orange font-medium gold-border' : 'text-gray-700 hover:text-irctc-orange hover:bg-orange-50'}`}>
              Home
            </Link>
            <Link to="/restaurants" className={`px-3 py-2 rounded-md transition-colors ${isActiveLink('/restaurants') ? 'text-irctc-orange font-medium gold-border' : 'text-gray-700 hover:text-irctc-orange hover:bg-orange-50'}`}>
              Restaurants
            </Link>
            <Link to="/track-order" className={`px-3 py-2 rounded-md transition-colors ${isActiveLink('/track-order') ? 'text-irctc-orange font-medium gold-border' : 'text-gray-700 hover:text-irctc-orange hover:bg-orange-50'}`}>
              Track Order
            </Link>
            <Link to="/help" className={`px-3 py-2 rounded-md transition-colors ${isActiveLink('/help') ? 'text-irctc-orange font-medium gold-border' : 'text-gray-700 hover:text-irctc-orange hover:bg-orange-50'}`}>
              Help
            </Link>
          </div>

          {/* Search, Cart and Login - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                type="text" 
                placeholder="Search restaurants or food..." 
                className="premium-input pl-10 pr-4 py-2 rounded-full w-64 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>

            <Link to="/cart" className="relative group">
              <div className="p-2 rounded-full hover:bg-orange-50 transition-colors">
                <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-irctc-orange transition-colors" />
                <span className="absolute -right-1 -top-1 bg-irctc-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md">
                  0
                </span>
              </div>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link 
                  to={role === 'passenger' ? '/passenger' : '/vendor'} 
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gradient-premium text-white hover:shadow-lg transition-all duration-300"
                >
                  <User size={18} />
                  <span className="font-medium">{user?.name?.split(' ')[0] || 'Dashboard'}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" className="hover:bg-orange-50 hover:text-irctc-orange" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="bg-gradient-premium hover:shadow-lg shadow-orange-200 transition-all duration-300" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              <span className="absolute -right-1 -top-1 bg-irctc-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md">
                0
              </span>
            </Link>
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-slide-in border-t border-gray-100">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Input 
              type="text" 
              placeholder="Search restaurants or food..." 
              className="premium-input pl-10 pr-4 py-2 rounded-full w-full border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>

          <div className="flex flex-col space-y-1">
            <Link 
              to="/" 
              className={`px-3 py-3 rounded-md ${isActiveLink('/') ? 'bg-orange-50 text-irctc-orange font-medium' : 'hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/restaurants" 
              className={`px-3 py-3 rounded-md ${isActiveLink('/restaurants') ? 'bg-orange-50 text-irctc-orange font-medium' : 'hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Restaurants
            </Link>
            <Link 
              to="/track-order" 
              className={`px-3 py-3 rounded-md ${isActiveLink('/track-order') ? 'bg-orange-50 text-irctc-orange font-medium' : 'hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Track Order
            </Link>
            <Link 
              to="/help" 
              className={`px-3 py-3 rounded-md ${isActiveLink('/help') ? 'bg-orange-50 text-irctc-orange font-medium' : 'hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>

            {isAuthenticated ? (
              <Link 
                to={role === 'passenger' ? '/passenger' : '/vendor'} 
                className="flex items-center space-x-2 px-3 py-3 mt-2 bg-gradient-premium text-white rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                <span className="font-medium">Dashboard</span>
              </Link>
            ) : (
              <div className="flex space-x-2 pt-4">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button className="bg-gradient-premium flex-1 shadow-md" asChild>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
