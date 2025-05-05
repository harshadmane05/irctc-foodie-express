
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin, Info, Phone, Calendar, Award } from 'lucide-react';
import { Restaurant } from '@/types/restaurant';
import { Button } from '@/components/ui/button';

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
        
        {/* Restaurant name overlay for mobile */}
        <div className="absolute bottom-4 left-4 md:hidden text-white">
          <h1 className="text-2xl font-bold drop-shadow-lg">{restaurant.name}</h1>
          <p className="text-white/90 drop-shadow-md">{restaurant.cuisine}</p>
        </div>
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
                  className="w-24 h-24 rounded-lg object-cover mr-4 shadow-md"
                />
                <div>
                  <div className="flex items-center flex-wrap gap-2">
                    <h1 className="text-2xl font-bold hidden md:block">{restaurant.name}</h1>
                    <Badge className={restaurant.veg ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                      {restaurant.veg ? "Pure Veg" : "Non-Veg"}
                    </Badge>
                  </div>
                  <p className="text-gray-500 hidden md:block">{restaurant.cuisine}</p>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-green-600 text-white flex items-center mr-2">
                      <Star className="w-3 h-3 mr-1" fill="white" />
                      {restaurant.rating}
                    </Badge>
                    <span className="text-sm text-gray-500">{restaurant.ratingCount} ratings</span>
                  </div>
                  
                  {restaurant.priceRange && (
                    <div className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Price:</span> {restaurant.priceRange}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3 mt-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Delivery: {restaurant.deliveryTime}</span>
                </div>
                {restaurant.openingHours && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Hours: {restaurant.openingHours}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{restaurant.address}</span>
                </div>
                {restaurant.contactNumber && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{restaurant.contactNumber}</span>
                  </div>
                )}
              </div>
              
              {restaurant.description && (
                <div className="mt-5 p-4 bg-gray-50 rounded-md">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <p className="text-gray-600">{restaurant.description}</p>
                  </div>
                </div>
              )}
              
              {restaurant.featuredDishes && restaurant.featuredDishes.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center text-gray-700">
                    <Award className="h-4 w-4 mr-2 text-irctc-orange" />
                    <span className="font-medium">Featured Dishes:</span>
                    <div className="ml-2 flex flex-wrap gap-1">
                      {restaurant.featuredDishes.map((dish, index) => (
                        <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700">
                          {dish}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-full md:w-1/4 mt-6 md:mt-0 space-y-4">
              {restaurant.discount && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-irctc-orange mb-2">Offers & Discounts</h3>
                  <div className="flex items-center">
                    <Badge className="bg-irctc-orange text-white px-3 py-1">
                      {restaurant.discount}
                    </Badge>
                    <span className="ml-2 text-gray-700">on all orders</span>
                  </div>
                </div>
              )}
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Restaurant
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantHeader;
