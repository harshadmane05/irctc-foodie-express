
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
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

const restaurants: Restaurant[] = [
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
  }
];

const PopularRestaurants = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="heading-lg">Popular Restaurants</h2>
            <p className="text-gray-600">Top-rated restaurants for your journey</p>
          </div>
          <Link to="/restaurants" className="text-irctc-orange hover:underline font-semibold">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRestaurants;
