
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/animated-card';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, ShoppingBag, Package, TrendingUp, ChefHat, Award } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import VendorHeader from '@/components/vendor/VendorHeader';
import Footer from '@/components/layout/Footer';

const VendorDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <VendorHeader />
      
      <main className="flex-grow px-4 py-8">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-xl shadow-sm border border-orange-100 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.name || 'Vendor'}</h1>
                <p className="text-gray-600">
                  Manage your restaurant, process orders, and update delivery status all in one place
                </p>
              </div>
              <div className="flex gap-2 self-start">
                <Button asChild size="sm" className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50">
                  <Link to="/vendor/orders">
                    <ShoppingBag className="mr-1.5 h-4 w-4" /> View Orders
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-irctc-orange hover:bg-irctc-orange/90">
                  <Link to="/vendor/menu">
                    <Utensils className="mr-1.5 h-4 w-4" /> Manage Menu
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AnimatedCard delayIndex={0}>
              <CardHeader className="pb-3">
                <div className="mb-3 bg-orange-100 text-irctc-orange w-10 h-10 rounded-lg flex items-center justify-center">
                  <ChefHat className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">
                  Manage Menu
                </CardTitle>
                <CardDescription>
                  Update your restaurant menu
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500">
                  Add new items, update prices, or remove dishes from your menu to keep it fresh.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/vendor/menu">Manage Menu</Link>
                </Button>
              </CardFooter>
            </AnimatedCard>
            
            <AnimatedCard delayIndex={1}>
              <CardHeader className="pb-3">
                <div className="mb-3 bg-blue-100 text-irctc-blue w-10 h-10 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">
                  Process Orders
                </CardTitle>
                <CardDescription>
                  View and manage incoming orders
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500">
                  Accept or reject orders and manage food preparation to provide timely service to passengers.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/vendor/orders">View Orders</Link>
                </Button>
              </CardFooter>
            </AnimatedCard>
            
            <AnimatedCard delayIndex={2}>
              <CardHeader className="pb-3">
                <div className="mb-3 bg-green-100 text-green-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">
                  Update Status
                </CardTitle>
                <CardDescription>
                  Update delivery status
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500">
                  Mark orders as prepared, out for delivery, or delivered to keep customers informed.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/vendor/status">Update Status</Link>
                </Button>
              </CardFooter>
            </AnimatedCard>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in animation-delay-300">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-irctc-orange" /> 
                  Performance Overview
                </h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50/80 p-4 rounded-lg border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Total Orders</div>
                  <div className="text-2xl font-semibold">0</div>
                  <div className="text-xs text-gray-500 mt-1">All time</div>
                </div>
                
                <div className="bg-gray-50/80 p-4 rounded-lg border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Today's Orders</div>
                  <div className="text-2xl font-semibold">0</div>
                  <div className="text-xs text-gray-500 mt-1">Last 24 hours</div>
                </div>
                
                <div className="bg-gray-50/80 p-4 rounded-lg border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Rating</div>
                  <div className="text-2xl font-semibold flex items-center">
                    <span>N/A</span> 
                    <Award className="ml-2 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">0 reviews</div>
                </div>
              </div>
              
              <div className="text-center mt-8 p-8">
                <p className="text-gray-500 mb-4">No recent orders to display.</p>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Once you start receiving orders, your performance metrics and order history will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorDashboard;
