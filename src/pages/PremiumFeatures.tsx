
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/animated-card';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ShieldCheck, Star, BadgeCheck } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PremiumFeatures = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [processingPayment, setProcessingPayment] = useState(false);
  
  const plans = {
    monthly: {
      price: '₹149',
      period: 'per month',
      discount: null,
    },
    yearly: {
      price: '₹1299',
      period: 'per year',
      discount: 'Save ₹489',
    }
  };
  
  const handlePayNowClick = () => {
    if (!isAuthenticated) {
      localStorage.setItem('redirectAfterLogin', '/premium');
      toast({
        title: "Login required",
        description: "Please log in to continue with premium subscription",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    setProcessingPayment(true);
    
    // Mock payment process
    setTimeout(() => {
      setProcessingPayment(false);
      toast({
        title: "Payment successful!",
        description: "Welcome to IRCTC Foodie Premium",
      });
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Premium Hero Section */}
        <section className="bg-gradient-premium text-white py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-irctc-gold" />
              <h1 className="text-4xl font-bold">IRCTC Foodie Premium</h1>
            </div>
            <p className="text-xl mb-6">Elevate your railway dining experience with exclusive benefits and privileges</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-irctc-gold" />
                <span>Priority Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-irctc-gold" />
                <span>Exclusive Discounts</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-irctc-gold" />
                <span>Special Menu Items</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-irctc-gold" />
                <span>Premium Support</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Premium Plan Selection */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Premium Plan</h2>
              <p className="text-gray-600">Select the plan that works best for you</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 inline-flex gap-2 mb-8 mx-auto">
              <button 
                className={`px-6 py-2 rounded-lg font-medium ${selectedPlan === 'monthly' ? 'bg-irctc-orange text-white' : 'text-gray-600'}`}
                onClick={() => setSelectedPlan('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`px-6 py-2 rounded-lg font-medium ${selectedPlan === 'yearly' ? 'bg-irctc-orange text-white' : 'text-gray-600'}`}
                onClick={() => setSelectedPlan('yearly')}
              >
                Yearly
              </button>
            </div>
            
            <AnimatedCard className="max-w-lg mx-auto bg-white shadow-xl border-2 border-irctc-gold p-2">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center">
                      <span>Premium Plan</span>
                      {selectedPlan === 'yearly' && (
                        <span className="ml-2 text-xs bg-irctc-orange text-white px-2 py-1 rounded-full">Best Value</span>
                      )}
                    </h3>
                    <p className="text-gray-600">{selectedPlan === 'monthly' ? 'Billed monthly' : 'Billed annually'}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-irctc-gold text-irctc-gold" />
                    <Star className="h-5 w-5 fill-irctc-gold text-irctc-gold" />
                    <Star className="h-5 w-5 fill-irctc-gold text-irctc-gold" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl font-bold">{plans[selectedPlan].price}</span>
                    <span className="text-gray-600 pb-1">{plans[selectedPlan].period}</span>
                  </div>
                  {plans[selectedPlan].discount && (
                    <div className="text-green-600 font-medium">{plans[selectedPlan].discount}</div>
                  )}
                </div>
                
                <Button 
                  onClick={handlePayNowClick}
                  className="w-full bg-irctc-orange hover:bg-irctc-orange/90 font-medium py-3 text-lg"
                  disabled={processingPayment}
                >
                  {processingPayment ? "Processing..." : "Pay Now"}
                </Button>
              </div>
            </AnimatedCard>
          </div>
        </section>
        
        {/* Premium Benefits */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Exclusive Premium Benefits</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                IRCTC Foodie Premium members enjoy special privileges designed to make your journey more delightful
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatedCard delayIndex={0} className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-lg mb-4">
                    <ShieldCheck className="h-6 w-6 text-irctc-orange" />
                  </div>
                  <CardTitle className="text-xl">Priority Delivery</CardTitle>
                  <CardDescription>Your order gets priority processing and delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Skip the queue! Your orders will be prepared and delivered first, ensuring your food arrives hot and fresh.
                  </p>
                </CardContent>
              </AnimatedCard>
              
              <AnimatedCard delayIndex={1} className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-lg mb-4">
                    <Star className="h-6 w-6 text-irctc-orange" />
                  </div>
                  <CardTitle className="text-xl">Exclusive Discounts</CardTitle>
                  <CardDescription>Special pricing available only to premium members</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Enjoy up to 20% discount on all your orders, special seasonal offers, and exclusive promotional deals.
                  </p>
                </CardContent>
              </AnimatedCard>
              
              <AnimatedCard delayIndex={2} className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-lg mb-4">
                    <BadgeCheck className="h-6 w-6 text-irctc-orange" />
                  </div>
                  <CardTitle className="text-xl">Premium Menu Items</CardTitle>
                  <CardDescription>Access to exclusive gourmet selections</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Unlock special menu items from top restaurants that are exclusively available to premium members.
                  </p>
                </CardContent>
              </AnimatedCard>
              
              <AnimatedCard delayIndex={3} className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-lg mb-4">
                    <Shield className="h-6 w-6 text-irctc-orange" />
                  </div>
                  <CardTitle className="text-xl">Dedicated Support</CardTitle>
                  <CardDescription>Priority customer service</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Get instant access to our premium customer support team for any assistance you might need during your journey.
                  </p>
                </CardContent>
              </AnimatedCard>
              
              <AnimatedCard delayIndex={4} className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-lg mb-4">
                    <BadgeCheck className="h-6 w-6 text-irctc-orange" />
                  </div>
                  <CardTitle className="text-xl">Free Delivery</CardTitle>
                  <CardDescription>No more delivery charges</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Enjoy free delivery on all your orders, regardless of order value or distance.
                  </p>
                </CardContent>
              </AnimatedCard>
              
              <AnimatedCard delayIndex={5} className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-lg mb-4">
                    <Star className="h-6 w-6 text-irctc-orange" />
                  </div>
                  <CardTitle className="text-xl">Early Access</CardTitle>
                  <CardDescription>Be the first to try new features</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Get early access to new restaurants, seasonal menus, and app features before they're available to everyone.
                  </p>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">What Our Premium Members Say</h2>
              <p className="text-gray-600">Hear from travelers who've upgraded their journey with IRCTC Foodie Premium</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md relative">
                <div className="text-irctc-gold text-4xl opacity-30 absolute top-4 right-4">"</div>
                <p className="mb-4 text-gray-700">
                  The premium membership has been a game-changer for my weekly travels. The priority delivery ensures I never miss my meal even during short stops!
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium">Rahul Singh</h4>
                    <div className="text-sm text-gray-600">Premium member for 6 months</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md relative">
                <div className="text-irctc-gold text-4xl opacity-30 absolute top-4 right-4">"</div>
                <p className="mb-4 text-gray-700">
                  The exclusive discounts have saved me so much money over time. Plus, the premium menu items are absolutely delicious. Worth every rupee!
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium">Priya Sharma</h4>
                    <div className="text-sm text-gray-600">Premium member for 1 year</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md relative">
                <div className="text-irctc-gold text-4xl opacity-30 absolute top-4 right-4">"</div>
                <p className="mb-4 text-gray-700">
                  I love the dedicated support. Once my train was delayed, and they helped me reschedule my food delivery immediately. Exceptional service!
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium">Amit Patel</h4>
                    <div className="text-sm text-gray-600">Premium member for 3 months</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-gray-600">Everything you need to know about IRCTC Foodie Premium</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">How does priority delivery work?</h3>
                <p className="text-gray-700">Premium orders are flagged in our system and given preference by restaurant partners and delivery personnel, ensuring your food arrives as quickly as possible.</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Can I cancel my premium subscription?</h3>
                <p className="text-gray-700">Yes, you can cancel your subscription at any time from your account settings. Refunds are processed as per our refund policy.</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">How do I access premium-only menu items?</h3>
                <p className="text-gray-700">Premium menu items are highlighted with a gold star in participating restaurants. Simply log in with your premium account to view and order these exclusive items.</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Is there a family plan available?</h3>
                <p className="text-gray-700">Currently, we offer individual premium plans only. However, we're working on introducing family plans in the near future.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 px-4 bg-gradient-premium text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Journey?</h2>
            <p className="mb-6 text-lg">Join thousands of travelers who enjoy premium benefits with every order</p>
            <Button 
              onClick={handlePayNowClick} 
              className="bg-white text-irctc-orange hover:bg-gray-100 font-bold px-8 py-3 text-lg"
            >
              Get Premium Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PremiumFeatures;
