
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/animated-card';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Package, MessageSquare, LogOut, Clock, Search, Award } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PassengerDashboard = () => {
  const { user, logout } = useAuth();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow px-4 py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold">{greeting}, {user?.name?.split(' ')[0] || 'Passenger'}!</h1>
              <p className="text-gray-600 mt-1">Welcome to your passenger dashboard</p>
            </div>
            
            <Button variant="outline" onClick={logout} className="flex items-center gap-2 bg-white">
              <LogOut size={16} /> Logout
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl shadow-sm border border-orange-100 mb-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-orange-200 rounded-full opacity-30 -mr-10 -mt-10"></div>
            <div className="absolute left-20 bottom-0 w-16 h-16 bg-orange-200 rounded-full opacity-30 -mb-8"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-medium mb-2 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-irctc-orange" /> Quick Actions
              </h2>
              <p className="text-gray-600 mb-4">
                Access your most-used features quickly from here
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50">
                  <Link to="/restaurants">
                    <Search className="mr-2 h-4 w-4" /> Find Restaurants
                  </Link>
                </Button>
                <Button asChild className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50">
                  <Link to="/track-order">
                    <Package className="mr-2 h-4 w-4" /> Track Order
                  </Link>
                </Button>
                <Button asChild className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50">
                  <Link to="/help">
                    <MessageSquare className="mr-2 h-4 w-4" /> Get Help
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AnimatedCard delayIndex={0}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Utensils className="h-5 w-5 text-irctc-orange" />
                  Browse Restaurants
                </CardTitle>
                <CardDescription>
                  Find restaurants at your station
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500">
                  Explore food options available at your destination or station along your route.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-irctc-orange text-irctc-orange hover:bg-orange-50">
                  <Link to="/restaurants">Browse Now</Link>
                </Button>
              </CardFooter>
            </AnimatedCard>
            
            <AnimatedCard delayIndex={1}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5 text-irctc-orange" />
                  Track Orders
                </CardTitle>
                <CardDescription>
                  Monitor your food delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500">
                  Check the status of your current or past food orders in real-time.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-irctc-orange text-irctc-orange hover:bg-orange-50">
                  <Link to="/track-order">Track Now</Link>
                </Button>
              </CardFooter>
            </AnimatedCard>
            
            <AnimatedCard delayIndex={2}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5 text-irctc-orange" />
                  Give Feedback
                </CardTitle>
                <CardDescription>
                  Rate your experience
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500">
                  Share your experience and help us improve our service quality.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-irctc-orange text-irctc-orange hover:bg-orange-50">
                  <Link to="/feedback">Leave Feedback</Link>
                </Button>
              </CardFooter>
            </AnimatedCard>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-fade-in animation-delay-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium flex items-center">
                <Award className="mr-2 h-5 w-5 text-irctc-orange" /> Recent Orders
              </h2>
              <Button asChild variant="ghost" className="text-sm">
                <Link to="/track-order">View All</Link>
              </Button>
            </div>
            
            <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <p className="mb-4">No recent orders found.</p>
              <Button asChild className="bg-irctc-orange hover:bg-irctc-orange/90">
                <Link to="/restaurants">Order Food Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PassengerDashboard;
