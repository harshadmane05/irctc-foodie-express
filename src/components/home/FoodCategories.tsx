
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface FoodCategory {
  id: string;
  name: string;
  image: string;
  count: number;
}

const categories: FoodCategory[] = [
  {
    id: 'north-indian',
    name: 'North Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop',
    count: 15
  },
  {
    id: 'south-indian',
    name: 'South Indian',
    image: 'https://images.unsplash.com/photo-1630383249896-52bdbd3372cb?w=800&auto=format&fit=crop',
    count: 12
  },
  {
    id: 'chinese',
    name: 'Chinese',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop',
    count: 10
  },
  {
    id: 'fast-food',
    name: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop',
    count: 18
  },
  {
    id: 'biryani',
    name: 'Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop',
    count: 8
  },
  {
    id: 'beverages',
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=800&auto=format&fit=crop',
    count: 14
  },
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop',
    count: 9
  },
  {
    id: 'healthy',
    name: 'Healthy',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    count: 11
  }
];

const FoodCategories = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="heading-lg mb-3">Explore Food Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through a variety of cuisines available for delivery to your train seat
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/restaurants?category=${category.id}`}>
              <Card className="overflow-hidden card-hover">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-gray-500 text-sm">{category.count} items</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCategories;
