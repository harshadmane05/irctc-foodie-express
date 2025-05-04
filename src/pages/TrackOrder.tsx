
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OrderSearchForm from '@/components/track-order/OrderSearchForm';
import OrderDetails from '@/components/track-order/OrderDetails';
import { useOrderSearch } from '@/hooks/useOrderSearch';

const TrackOrder = () => {
  const { orderSearched, isSearching, orderData, searchOrder } = useOrderSearch();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>
          
          <div className="max-w-3xl mx-auto">
            <OrderSearchForm 
              onSearch={searchOrder}
              isSearching={isSearching}
            />
            
            {orderSearched && orderData && (
              <OrderDetails orderData={orderData} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;
