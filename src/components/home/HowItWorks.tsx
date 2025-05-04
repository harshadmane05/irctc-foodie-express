
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Train, Search, Utensils, Package } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Enter PNR or Station',
    description: 'Enter your PNR number or select your station to find restaurants available along your route',
    icon: <Train className="h-10 w-10 text-irctc-blue" />
  },
  {
    id: 2,
    title: 'Choose Restaurant & Food',
    description: 'Browse through a variety of restaurants and select your favorite dishes',
    icon: <Search className="h-10 w-10 text-irctc-blue" />
  },
  {
    id: 3,
    title: 'Place Your Order',
    description: 'Complete your order by providing your train details and making payment',
    icon: <Utensils className="h-10 w-10 text-irctc-blue" />
  },
  {
    id: 4,
    title: 'Get Food Delivered',
    description: 'Sit back and relax as your food gets delivered directly to your train seat',
    icon: <Package className="h-10 w-10 text-irctc-blue" />
  }
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-gray-100">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-3">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ordering food to your train seat has never been easier. Just follow these simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <Card key={step.id} className="border-2 hover:border-irctc-blue transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="bg-irctc-orange text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                  {step.id}
                </div>
                <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
