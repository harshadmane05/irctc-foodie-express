
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
      <div className="h-56 md:h-72 w-full bg-gray-200 overflow-hidden relative">
        <img 
          src={restaurant.coverImage} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="inline-flex items-center bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="font-medium">{restaurant.rating}</span>
            <span className="text-white/80 text-sm ml-1">({restaurant.ratingCount}+)</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex items-center md:items-start md:flex-row flex-col">
            <div className="w-24 h-24 bg-white rounded-xl shadow-lg overflow-hidden -mt-12 border-4 border-white">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:ml-5 mt-4 md:mt-0 text-center md:text-left">
              <div className="flex items-center flex-col md:flex-row">
                <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                <div className="flex mt-2 md:mt-0">
                  <Badge className={`md:ml-2 ${restaurant.veg ? 'bg-green-600' : 'bg-red-600'}`}>
                    {restaurant.veg ? 'Pure Veg' : 'Non-Veg'}
                  </Badge>
                  {restaurant.discount && (
                    <Badge className="ml-2 bg-irctc-gold text-irctc-charcoal">{restaurant.discount} OFF</Badge>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 mt-1">{restaurant.cuisine}</p>
              <p className="text-gray-500 text-sm mt-1">{restaurant.address}</p>
              
              <div className="flex items-center mt-3 justify-center md:justify-start space-x-6">
                <div className="flex items-center px-3 py-1 bg-gray-50 rounded-full">
                  <Clock className="h-4 w-4 text-irctc-orange mr-2" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                
                {restaurant.priceRange && (
                  <div className="flex items-center px-3 py-1 bg-gray-50 rounded-full">
                    <Utensils className="h-4 w-4 text-irctc-orange mr-2" />
                    <span>{restaurant.priceRange}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 w-full md:w-auto flex justify-center md:block">
            <RestaurantActions restaurant={restaurant} />
          </div>
        </div>
        
        <div className="mt-8 premium-card p-6">
          <h2 className="text-lg font-semibold mb-3">About {restaurant.name}</h2>
          <p className="text-gray-600">{restaurant.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {restaurant.openingHours && (
              <div className="premium-card p-4">
                <div className="text-sm">
                  <span className="font-medium text-irctc-orange">Opening Hours:</span>
                  <span className="ml-2 text-gray-600">{restaurant.openingHours}</span>
                </div>
              </div>
            )}
            
            {restaurant.featuredDishes && restaurant.featuredDishes.length > 0 && (
              <div className="premium-card p-4">
                <span className="text-sm font-medium text-irctc-orange">Featured Dishes:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {restaurant.featuredDishes.map((dish, index) => (
                    <Badge key={index} variant="outline" className="bg-orange-50 border-orange-100">
                      {dish}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
