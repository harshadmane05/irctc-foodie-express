
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Search, Filter, XIcon, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allRestaurants } from '@/data/restaurantData';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  discount?: string;
  veg: boolean;
}

const cuisineTypes = [
  'All',
  'North Indian',
  'South Indian',
  'Chinese',
  'Fast Food',
  'Biryani',
  'Beverages',
  'Pizza',
  'Healthy'
];

const RestaurantList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>(allRestaurants);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(allRestaurants);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [filterVeg, setFilterVeg] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Get search parameters
  const pnr = searchParams.get('pnr');
  const station = searchParams.get('station');
  const category = searchParams.get('category');
  const initialQuery = searchParams.get('q');
  
  useEffect(() => {
    // Initialize search term from URL if present
    if (initialQuery) {
      setSearchTerm(initialQuery);
      handleSearchWithTerm(initialQuery);
    }
    
    // In a real app, we would fetch restaurants based on pnr/station/category
    console.log('Search params:', { pnr, station, category });
    
    // For now, just simulating filtering based on the category
    if (category) {
      const filtered = allRestaurants.filter(
        (restaurant) => restaurant.cuisine.toLowerCase().includes(category.toLowerCase().replace('-', ' '))
      );
      setRestaurants(filtered.length > 0 ? filtered : allRestaurants);
      setFilteredRestaurants(filtered.length > 0 ? filtered : allRestaurants);
      
      // Set cuisine filter if it matches
      const matchedCuisine = cuisineTypes.find(cuisine => 
        cuisine.toLowerCase() === category.toLowerCase().replace('-', ' ')
      );
      if (matchedCuisine) {
        setSelectedCuisine(matchedCuisine);
      }
    } else {
      setRestaurants(allRestaurants);
      setFilteredRestaurants(allRestaurants);
    }
  }, [pnr, station, category, initialQuery]);
  
  const handleSearchWithTerm = (term: string) => {
    setIsSearching(true);
    
    if (term) {
      // Update URL search parameter
      setSearchParams(params => {
        params.set('q', term);
        return params;
      });
      
      // Apply search filter
      applyFilters(term, selectedCuisine, filterVeg);
    } else {
      // Remove search query from URL
      setSearchParams(params => {
        params.delete('q');
        return params;
      });
      
      // Reset to apply only cuisine and veg filters
      applyFilters('', selectedCuisine, filterVeg);
    }
    
    setTimeout(() => setIsSearching(false), 300);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchWithTerm(searchTerm);
  };
  
  const applyFilters = (term = searchTerm, cuisine = selectedCuisine, vegOnly = filterVeg) => {
    let filtered = [...allRestaurants];
    
    // Apply cuisine filter
    if (cuisine !== 'All') {
      filtered = filtered.filter(
        (restaurant) => restaurant.cuisine.includes(cuisine)
      );
    }
    
    // Apply veg filter
    if (vegOnly) {
      filtered = filtered.filter(restaurant => restaurant.veg);
    }
    
    // Apply search term if present
    if (term) {
      filtered = filtered.filter(
        (restaurant) => 
          restaurant.name.toLowerCase().includes(term.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    setFilteredRestaurants(filtered);
  };
  
  const handleCuisineChange = (value: string) => {
    setSelectedCuisine(value);
    
    // Update URL
    setSearchParams(params => {
      if (value !== 'All') {
        params.set('category', value.toLowerCase().replace(' ', '-'));
      } else {
        params.delete('category');
      }
      return params;
    });
    
    // Apply filters with new cuisine
    applyFilters(searchTerm, value, filterVeg);
  };
  
  const handleVegFilter = () => {
    const newVegValue = !filterVeg;
    setFilterVeg(newVegValue);
    applyFilters(searchTerm, selectedCuisine, newVegValue);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCuisine('All');
    setFilterVeg(false);
    
    // Clear URL parameters
    setSearchParams({});
    
    setFilteredRestaurants(allRestaurants);
  };
  
  const renderLocationInfo = () => {
    if (pnr) {
      return `Showing restaurants for PNR: ${pnr}`;
    } else if (station) {
      return `Showing restaurants near ${station} station`;
    } else if (category) {
      return `Showing ${category.replace('-', ' ')} restaurants`;
    } else if (searchTerm) {
      return `Search results for "${searchTerm}"`;
    } else {
      return 'All Restaurants';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h1 className="text-2xl font-bold">{renderLocationInfo()}</h1>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                {(searchTerm || selectedCuisine !== 'All' || filterVeg) && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetFilters}
                    className="mr-2"
                  >
                    <XIcon className="h-4 w-4 mr-1" /> Clear Filters
                  </Button>
                )}
                <Button 
                  variant={filterVeg ? "default" : "outline"} 
                  size="sm"
                  onClick={handleVegFilter}
                  className={filterVeg ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  Veg Only
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {}}
                  className="flex items-center"
                >
                  <Filter className="h-4 w-4 mr-1" /> More Filters
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="relative mb-6">
              <Input 
                type="text" 
                placeholder="Search for restaurants, cuisines, or dishes..." 
                className="pl-10 pr-20 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Button 
                type="submit" 
                className="absolute right-1 top-1 bg-irctc-orange hover:bg-irctc-orange/90"
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </form>
            
            <Tabs defaultValue={selectedCuisine} onValueChange={handleCuisineChange} className="w-full">
              <div className="overflow-x-auto">
                <TabsList className="mb-4 w-full h-auto flex flex-nowrap">
                  {cuisineTypes.map((cuisine) => (
                    <TabsTrigger 
                      key={cuisine} 
                      value={cuisine}
                      className="px-4 py-2 whitespace-nowrap"
                    >
                      {cuisine}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </div>
          
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                  <Card className="overflow-hidden card-hover h-full">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {restaurant.discount && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-irctc-orange text-white">
                            {restaurant.discount}
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge className={restaurant.veg ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                          {restaurant.veg ? "Veg" : "Non-Veg"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                      <p className="text-gray-500 text-sm">{restaurant.cuisine}</p>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center">
                          <Badge className="bg-green-600 text-white flex items-center">
                            <Star className="w-3 h-3 mr-1" fill="white" />
                            {restaurant.rating}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {restaurant.deliveryTime}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          Platform
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <Button onClick={resetFilters} className="bg-irctc-orange hover:bg-irctc-orange/90">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantList;
