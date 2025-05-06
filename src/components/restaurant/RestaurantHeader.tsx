
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Utensils } from 'lucide-react';
import { Restaurant } from '@/types/restaurant';
import RestaurantActions from './RestaurantActions';

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {
  return (
    <div className="w-full bg-white shadow-md mb-6">
      <div className="h-48 md:h-64 w-full bg-gray-200 overflow-hidden">
        <img 
          src={restaurant.coverImage} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white rounded-full shadow-lg overflow-hidden mr-4 -mt-12 border-4 border-white">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                <Badge className={`ml-2 ${restaurant.veg ? 'bg-green-600' : 'bg-red-600'}`}>
                  {restaurant.veg ? 'Pure Veg' : 'Non-Veg'}
                </Badge>
                {restaurant.discount && (
                  <Badge className="ml-2 bg-irctc-orange">{restaurant.discount} OFF</Badge>
                )}
              </div>
              
              <p className="text-gray-600 mt-1">{restaurant.cuisine}</p>
              <p className="text-gray-500 text-sm mt-1">{restaurant.address}</p>
              
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({restaurant.ratingCount}+)</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                
                {restaurant.priceRange && (
                  <div className="flex items-center">
                    <Utensils className="h-4 w-4 text-gray-500 mr-1" />
                    <span>{restaurant.priceRange}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <RestaurantActions restaurant={restaurant} />
          </div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">About {restaurant.name}</h2>
          <p className="text-gray-600">{restaurant.description}</p>
          
          {restaurant.openingHours && (
            <div className="mt-2 text-sm">
              <span className="font-medium">Opening Hours:</span>
              <span className="ml-2 text-gray-600">{restaurant.openingHours}</span>
            </div>
          )}
          
          {restaurant.featuredDishes && restaurant.featuredDishes.length > 0 && (
            <div className="mt-2">
              <span className="text-sm font-medium">Featured Dishes:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {restaurant.featuredDishes.map((dish, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {dish}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
