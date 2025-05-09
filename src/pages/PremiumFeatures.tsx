
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { usePremium } from '@/context/PremiumContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AnimatedCard } from '@/components/ui/animated-card';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Shield, ShieldCheck, Star, BadgeCheck, CreditCard, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import PremiumBadge from '@/components/premium/PremiumBadge';

const PremiumFeatures = () => {
  const { isAuthenticated, user } = useAuth();
  const { isPremium, premiumPlan, activatePremium } = usePremium();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  
  const plans = {
    monthly: {
      price: '₹149',
      numericPrice: 149,
      period: 'per month',
      discount: null,
      features: [
        'Priority Delivery',
        'Special Menu Items',
        'Premium Support',
      ]
    },
    yearly: {
      price: '₹1299',
      numericPrice: 1299,
      period: 'per year',
      discount: 'Save ₹489',
      features: [
        'Priority Delivery',
        'Special Menu Items', 
        'Premium Support',
        'Free Delivery',
        'Exclusive Discounts'
      ]
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
    
    setPaymentDialogOpen(true);
  };
  
  const handlePaymentSubmit = () => {
    if (paymentMethod === 'upi' && !upiId) {
      toast({
        title: "UPI ID required",
        description: "Please enter your UPI ID to proceed with payment",
        variant: "destructive"
      });
      return;
    }
    
    setProcessingPayment(true);
    
    // Mock payment process with a simple delay
    setTimeout(() => {
      setProcessingPayment(false);
      setPaymentDialogOpen(false);
      setSuccessDialogOpen(true);
      
      // Activate premium using our context
      activatePremium(selectedPlan);
    }, 1500);
  };
  
  if (isPremium) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <section className="bg-gradient-to-r from-amber-100 to-orange-100 py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8 inline-flex">
                <PremiumBadge size="lg" className="text-xl py-2 px-4" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Welcome to Premium!
              </h1>
              
              <p className="text-xl mb-10 text-gray-700">
                You're enjoying all the benefits of IRCTC Foodie Premium membership
              </p>
              
              <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Active Premium Membership
                    {premiumPlan && <span className="text-amber-500 ml-2">({premiumPlan} plan)</span>}
                  </h2>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-amber-500" />
                    <span>Priority Delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-amber-500" />
                    <span>Special Menu Items</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-amber-500" />
                    <span>Premium Support</span>
                  </li>
                  {premiumPlan === 'yearly' && (
                    <>
                      <li className="flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-amber-500" />
                        <span>Free Delivery on All Orders</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-amber-500" />
                        <span>Exclusive Discounts</span>
                      </li>
                    </>
                  )}
                </ul>
                
                <p className="text-amber-700 font-medium border-t pt-4">
                  Thank you for being a valued premium member!
                </p>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Premium Hero Section with better gradient */}
        <section className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400 text-white py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-white" />
              <h1 className="text-4xl font-bold">IRCTC Foodie Premium</h1>
            </div>
            <p className="text-xl mb-8">Elevate your railway dining experience with exclusive benefits and privileges</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <BadgeCheck className="h-5 w-5 text-white" />
                <span>Priority Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <BadgeCheck className="h-5 w-5 text-white" />
                <span>Exclusive Discounts</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <BadgeCheck className="h-5 w-5 text-white" />
                <span>Special Menu Items</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <BadgeCheck className="h-5 w-5 text-white" />
                <span>Premium Support</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Premium Plan Selection */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Premium Plan</h2>
              <p className="text-gray-600">Select the plan that works best for you</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 inline-flex gap-2 mb-8 mx-auto shadow-md">
              <button 
                className={`px-6 py-2 rounded-lg font-medium transition-all ${selectedPlan === 'monthly' ? 'bg-amber-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setSelectedPlan('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`px-6 py-2 rounded-lg font-medium transition-all ${selectedPlan === 'yearly' ? 'bg-amber-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setSelectedPlan('yearly')}
              >
                Yearly
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Monthly Plan */}
              <AnimatedCard className={`bg-white shadow-xl border-2 ${selectedPlan === 'monthly' ? 'border-amber-500' : 'border-transparent'} p-2 transition-all hover:shadow-2xl`}>
                <div className={`${selectedPlan === 'monthly' ? 'bg-amber-50' : 'bg-gray-50'} rounded-lg p-6`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">Monthly Plan</h3>
                      <p className="text-gray-600">Billed monthly</p>
                    </div>
                    {selectedPlan === 'monthly' && (
                      <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                        Selected
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-4xl font-bold">{plans.monthly.price}</span>
                      <span className="text-gray-600 pb-1">{plans.monthly.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plans.monthly.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-amber-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => {
                      setSelectedPlan('monthly');
                      handlePayNowClick();
                    }}
                    className={`w-full ${selectedPlan === 'monthly' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} font-medium py-3 text-lg`}
                  >
                    {selectedPlan === 'monthly' ? 'Select Plan' : 'Choose This Plan'}
                  </Button>
                </div>
              </AnimatedCard>
              
              {/* Yearly Plan */}
              <AnimatedCard delayIndex={1} className={`bg-white shadow-xl border-2 ${selectedPlan === 'yearly' ? 'border-amber-500' : 'border-transparent'} p-2 transition-all hover:shadow-2xl`}>
                <div className={`${selectedPlan === 'yearly' ? 'bg-amber-50' : 'bg-gray-50'} rounded-lg p-6`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">Yearly Plan</h3>
                      <p className="text-gray-600">Billed annually</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {selectedPlan === 'yearly' && (
                        <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                          Selected
                        </div>
                      )}
                      <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        Best Value
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-4xl font-bold">{plans.yearly.price}</span>
                      <span className="text-gray-600 pb-1">{plans.yearly.period}</span>
                    </div>
                    {plans.yearly.discount && (
                      <div className="text-green-600 font-medium">{plans.yearly.discount}</div>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plans.yearly.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-amber-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => {
                      setSelectedPlan('yearly');
                      handlePayNowClick();
                    }}
                    className={`w-full ${selectedPlan === 'yearly' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} font-medium py-3 text-lg`}
                  >
                    {selectedPlan === 'yearly' ? 'Select Plan' : 'Choose This Plan'}
                  </Button>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </section>
        
        {/* Premium Benefits */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-amber-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Exclusive Premium Benefits</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                IRCTC Foodie Premium members enjoy special privileges designed to make your journey more delightful
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatedCard delayIndex={0} className="border-none shadow-md bg-white hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 flex items-center justify-center rounded-lg mb-4">
                    <ShieldCheck className="h-6 w-6 text-amber-500" />
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
              
              <AnimatedCard delayIndex={1} className="border-none shadow-md bg-white hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 flex items-center justify-center rounded-lg mb-4">
                    <Star className="h-6 w-6 text-amber-500" />
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
              
              <AnimatedCard delayIndex={2} className="border-none shadow-md bg-white hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 flex items-center justify-center rounded-lg mb-4">
                    <BadgeCheck className="h-6 w-6 text-amber-500" />
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
              
              <AnimatedCard delayIndex={3} className="border-none shadow-md bg-white hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 flex items-center justify-center rounded-lg mb-4">
                    <Shield className="h-6 w-6 text-amber-500" />
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
              
              <AnimatedCard delayIndex={4} className="border-none shadow-md bg-white hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 flex items-center justify-center rounded-lg mb-4">
                    <BadgeCheck className="h-6 w-6 text-amber-500" />
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
              
              <AnimatedCard delayIndex={5} className="border-none shadow-md bg-white hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 flex items-center justify-center rounded-lg mb-4">
                    <Star className="h-6 w-6 text-amber-500" />
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
        <section className="py-16 px-4 bg-gradient-to-b from-amber-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">What Our Premium Members Say</h2>
              <p className="text-gray-600">Hear from travelers who've upgraded their journey with IRCTC Foodie Premium</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md relative">
                <div className="text-amber-500 text-4xl opacity-30 absolute top-4 right-4">"</div>
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
                <div className="text-amber-500 text-4xl opacity-30 absolute top-4 right-4">"</div>
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
                <div className="text-amber-500 text-4xl opacity-30 absolute top-4 right-4">"</div>
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
        <section className="py-12 px-4 bg-gradient-to-r from-amber-500 to-orange-400 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Journey?</h2>
            <p className="mb-6 text-lg">Join thousands of travelers who enjoy premium benefits with every order</p>
            <Button 
              onClick={handlePayNowClick} 
              className="bg-white text-amber-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-full shadow-lg"
            >
              Get Premium Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              {selectedPlan === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'} - {plans[selectedPlan].price}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Select Payment Method</h3>
              <RadioGroup 
                defaultValue="upi" 
                onValueChange={(value) => setPaymentMethod(value as 'upi' | 'card')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="upi" id="upi" />
                  <label htmlFor="upi" className="font-medium">UPI</label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <label htmlFor="card" className="font-medium">Card</label>
                </div>
              </RadioGroup>
            </div>
            
            {paymentMethod === 'upi' && (
              <div className="space-y-2">
                <label htmlFor="upi-id" className="font-medium">
                  Enter your UPI ID
                </label>
                <input
                  id="upi-id"
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}
            
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="card-number" className="font-medium">
                    Card Number
                  </label>
                  <input
                    id="card-number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expire-date" className="font-medium">
                      Expire Date
                    </label>
                    <input
                      id="expire-date"
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cvv" className="font-medium">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setPaymentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePaymentSubmit}
              disabled={processingPayment}
              className="bg-amber-500 hover:bg-amber-600"
            >
              {processingPayment ? "Processing..." : `Pay ${plans[selectedPlan].price}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Payment Successful!</h2>
            <p className="text-gray-600 text-center mb-6">
              Congratulations! You are now a Premium Member.
            </p>
            <Button 
              onClick={() => {
                setSuccessDialogOpen(false);
                window.location.reload();
              }}
              className="bg-amber-500 hover:bg-amber-600 w-full"
            >
              Continue to Premium Benefits
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PremiumFeatures;
