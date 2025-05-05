
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin, Info } from 'lucide-react';
import { Restaurant } from '@/types/restaurant';

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {
  return (
    <>
      {/* Cover Image */}
      <div className="h-64 md:h-80 w-full relative">
        <img 
          src={restaurant.coverImage} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Restaurant Info */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4">
              <div className="flex items-start">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  className="w-24 h-24 rounded-lg object-cover mr-4 shadow"
                />
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                    <Badge className={restaurant.veg ? "bg-green-600 text-white ml-2" : "bg-red-600 text-white ml-2"}>
                      {restaurant.veg ? "Pure Veg" : "Non-Veg"}
                    </Badge>
                  </div>
                  <p className="text-gray-500">{restaurant.cuisine}</p>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-green-600 text-white flex items-center mr-2">
                      <Star className="w-3 h-3 mr-1" fill="white" />
                      {restaurant.rating}
                    </Badge>
                    <span className="text-sm text-gray-500">{restaurant.ratingCount} ratings</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Delivery Time: {restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{restaurant.address}</span>
                </div>
              </div>
              
              {restaurant.description && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <p className="text-gray-600">{restaurant.description}</p>
                  </div>
                </div>
              )}
            </div>
            
            {restaurant.discount && (
              <div className="w-full md:w-1/4 mt-6 md:mt-0">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-irctc-orange mb-2">Offers & Discounts</h3>
                  <div className="flex items-center">
                    <Badge className="bg-irctc-orange text-white px-3 py-1">
                      {restaurant.discount}
                    </Badge>
                    <span className="ml-2 text-gray-700">on all orders</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantHeader;
