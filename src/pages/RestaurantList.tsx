
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Search, Filter, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

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

// Sample data
const allRestaurants: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Punjab Express',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
    cuisine: 'North Indian, Punjabi',
    rating: 4.5,
    deliveryTime: '30-35 min',
    discount: '20% OFF',
    veg: true
  },
  {
    id: 'rest-2',
    name: 'Dosa Corner',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&auto=format&fit=crop',
    cuisine: 'South Indian',
    rating: 4.3,
    deliveryTime: '25-30 min',
    veg: true
  },
  {
    id: 'rest-3',
    name: 'Delhi Darbar',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop',
    cuisine: 'Mughlai, Biryani',
    rating: 4.1,
    deliveryTime: '35-40 min',
    discount: '10% OFF',
    veg: false
  },
  {
    id: 'rest-4',
    name: 'Chai & Snacks',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&auto=format&fit=crop',
    cuisine: 'Beverages, Snacks',
    rating: 4.4,
    deliveryTime: '15-20 min',
    veg: true
  },
  {
    id: 'rest-5',
    name: 'Bombay Brasserie',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
    cuisine: 'Maharashtrian, Street Food',
    rating: 4.0,
    deliveryTime: '30-40 min',
    discount: '15% OFF',
    veg: false
  },
  {
    id: 'rest-6',
    name: 'Hyderabadi Biryani House',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop',
    cuisine: 'Biryani, Hyderabadi',
    rating: 4.6,
    deliveryTime: '40-45 min',
    veg: false
  },
  {
    id: 'rest-7',
    name: 'The Veggie Delight',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop',
    cuisine: 'Pure Vegetarian, Jain Options',
    rating: 4.2,
    deliveryTime: '25-35 min',
    discount: '10% OFF',
    veg: true
  },
  {
    id: 'rest-8',
    name: 'Train Meal Box',
    image: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=800&auto=format&fit=crop',
    cuisine: 'Meal Boxes, Multi-Cuisine',
    rating: 3.9,
    deliveryTime: '20-25 min',
    veg: true
  }
];

const cuisineTypes = [
  'All',
  'North Indian',
  'South Indian',
  'Chinese',
  'Fast Food',
  'Biryani',
  'Beverages'
];

const RestaurantList = () => {
  const [searchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>(allRestaurants);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [filterVeg, setFilterVeg] = useState(false);
  
  // Get search parameters
  const pnr = searchParams.get('pnr');
  const station = searchParams.get('station');
  const category = searchParams.get('category');
  
  useEffect(() => {
    // In a real app, we would fetch restaurants based on pnr/station/category
    console.log('Search params:', { pnr, station, category });
    
    // For now, just simulating filtering based on the category
    if (category) {
      const filtered = allRestaurants.filter(
        (restaurant) => restaurant.cuisine.toLowerCase().includes(category.replace('-', ' '))
      );
      setRestaurants(filtered.length > 0 ? filtered : allRestaurants);
    } else {
      setRestaurants(allRestaurants);
    }
  }, [pnr, station, category]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      const filtered = allRestaurants.filter(
        (restaurant) => 
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setRestaurants(filtered);
    } else {
      setRestaurants(allRestaurants);
    }
  };
  
  const handleCuisineChange = (value: string) => {
    setSelectedCuisine(value);
    if (value === 'All') {
      setRestaurants(allRestaurants);
    } else {
      const filtered = allRestaurants.filter(
        (restaurant) => restaurant.cuisine.includes(value)
      );
      setRestaurants(filtered);
    }
  };
  
  const handleVegFilter = () => {
    setFilterVeg(!filterVeg);
    if (!filterVeg) {
      setRestaurants(allRestaurants.filter(restaurant => restaurant.veg));
    } else {
      setRestaurants(allRestaurants);
    }
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCuisine('All');
    setFilterVeg(false);
    setRestaurants(allRestaurants);
  };
  
  const renderLocationInfo = () => {
    if (pnr) {
      return `Showing restaurants for PNR: ${pnr}`;
    } else if (station) {
      return `Showing restaurants near ${station} station`;
    } else if (category) {
      return `Showing ${category.replace('-', ' ')} restaurants`;
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
              <div className="mt-4 md:mt-0">
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
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="relative mb-6">
              <Input 
                type="text" 
                placeholder="Search for restaurants or cuisines..." 
                className="pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Button 
                type="submit" 
                className="absolute right-1 top-1 bg-irctc-orange hover:bg-irctc-orange/90"
              >
                Search
              </Button>
            </form>
            
            <Tabs defaultValue={selectedCuisine} onValueChange={handleCuisineChange}>
              <div className="overflow-x-auto">
                <TabsList className="mb-4 w-full">
                  {cuisineTypes.map((cuisine) => (
                    <TabsTrigger 
                      key={cuisine} 
                      value={cuisine}
                      className="px-4 py-2"
                    >
                      {cuisine}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                  <Card className="overflow-hidden card-hover">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-full object-cover"
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
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <Badge className="bg-green-600 text-white flex items-center">
                            <Star className="w-3 h-3 mr-1" fill="white" />
                            {restaurant.rating}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          {restaurant.deliveryTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold">No restaurants found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantList;
