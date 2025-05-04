
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, ShoppingBag, Package, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Footer from '@/components/layout/Footer';

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl">IRCTC <span className="text-irctc-orange">Foodie</span></span>
            <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">Vendor</span>
          </Link>
          <Button variant="outline" onClick={logout} className="flex items-center gap-2">
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </header>
      
      <main className="flex-grow bg-gray-50 px-4 py-8">
        <div className="container mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome to Vendor Dashboard</h1>
            <p className="text-gray-600">
              {user?.name} - Manage your restaurant, process orders, and update status.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-irctc-orange" />
                  Manage Menu
                </CardTitle>
                <CardDescription>
                  Update your restaurant menu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Add new items, update prices, or remove dishes from your menu.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/vendor/menu">Manage Menu</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-irctc-orange" />
                  Process Orders
                </CardTitle>
                <CardDescription>
                  View and manage incoming orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Accept or reject orders and manage food preparation.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/vendor/orders">View Orders</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-irctc-orange" />
                  Update Status
                </CardTitle>
                <CardDescription>
                  Update delivery status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Mark orders as prepared, out for delivery, or delivered.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/vendor/status">Update Status</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium mb-4">Recent Orders</h2>
            <div className="text-center text-gray-500 py-8">
              <p>No new orders at the moment.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorDashboard;
