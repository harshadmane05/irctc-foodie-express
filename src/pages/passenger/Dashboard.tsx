
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Package, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PassengerDashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 px-4 py-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Passenger Dashboard</h1>
            <Button variant="outline" onClick={logout} className="flex items-center gap-2">
              <LogOut size={16} /> Logout
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-medium mb-2">Welcome, {user?.name}!</h2>
            <p className="text-gray-600">
              Here you can browse restaurants, track your orders, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-irctc-orange" />
                  Browse Restaurants
                </CardTitle>
                <CardDescription>
                  Find restaurants at your station
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Explore food options available at your destination or station.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/restaurants">Browse Now</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-irctc-orange" />
                  Track Orders
                </CardTitle>
                <CardDescription>
                  Monitor your food delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Check the status of your current or past food orders.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/track-order">Track Now</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-irctc-orange" />
                  Give Feedback
                </CardTitle>
                <CardDescription>
                  Rate your experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Share your experience and help us improve our service.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/feedback">Leave Feedback</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium mb-4">Recent Orders</h2>
            <div className="text-center text-gray-500 py-8">
              <p>No recent orders found.</p>
              <Button asChild className="mt-4">
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
