
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItemsList from '@/components/cart/CartItemsList';
import DeliveryForm from '@/components/cart/DeliveryForm';
import OrderSummary from '@/components/cart/OrderSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import { useCart } from '@/hooks/useCart';

const Cart = () => {
  const {
    cartItems,
    promoCode,
    setPromoCode,
    appliedCode,
    discount,
    trainInfo,
    setTrainInfo,
    stations,
    deliveryTimes,
    isProcessing,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    handleStationChange,
    applyPromoCode,
    removePromoCode,
    getSubtotal,
    getTotal,
    handleCheckout
  } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items and Delivery Information */}
              <div className="lg:col-span-2">
                <CartItemsList 
                  cartItems={cartItems}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                  removeItem={removeItem}
                />
                
                <DeliveryForm 
                  trainInfo={trainInfo}
                  setTrainInfo={setTrainInfo}
                  stations={stations}
                  deliveryTimes={deliveryTimes}
                  handleStationChange={handleStationChange}
                />
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary 
                  getSubtotal={getSubtotal}
                  getTotal={getTotal}
                  discount={discount}
                  appliedCode={appliedCode}
                  promoCode={promoCode}
                  setPromoCode={setPromoCode}
                  applyPromoCode={applyPromoCode}
                  removePromoCode={removePromoCode}
                  handleCheckout={handleCheckout}
                  isProcessing={isProcessing}
                  cartItemsLength={cartItems.length}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
