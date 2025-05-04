
import React from 'react';
import Hero from '@/components/home/Hero';
import PopularRestaurants from '@/components/home/PopularRestaurants';
import FoodCategories from '@/components/home/FoodCategories';
import HowItWorks from '@/components/home/HowItWorks';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FoodCategories />
        <PopularRestaurants />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
