
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const FeedbackForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    orderNumber: '',
    foodRating: '0',
    deliveryRating: '0',
    comments: '',
    name: '',
    email: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRatingChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.foodRating === '0' || formData.deliveryRating === '0') {
      toast({
        title: "Please provide ratings",
        description: "Food quality and delivery ratings are required",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Thank you for your feedback!",
        description: "Your feedback has been submitted successfully."
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your feedback. Please try again.",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderRatingStars = (
    name: 'foodRating' | 'deliveryRating', 
    value: string, 
    label: string
  ) => {
    return (
      <div className="space-y-3">
        <Label>{label}</Label>
        <RadioGroup 
          value={formData[name]} 
          onValueChange={(val) => handleRatingChange(name, val)}
          className="flex space-x-2"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <RadioGroupItem 
              key={star}
              value={star.toString()} 
              id={`${name}-${star}`}
              className="sr-only"
            >
              <Label htmlFor={`${name}-${star}`}>{star}</Label>
            </RadioGroupItem>
          ))}
        </RadioGroup>
        
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingChange(name, star.toString())}
              className="p-1 focus:outline-none"
            >
              <Star
                size={24}
                className={parseInt(formData[name]) >= star 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-gray-300"
                }
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {formData[name] === '0' ? 'No rating yet' : `${formData[name]} stars`}
          </span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 px-4 py-8">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">Share Your Feedback</h1>
            <p className="text-gray-600 mb-6">
              Your feedback helps us improve our service. Please take a moment to share your experience.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="orderNumber">Order Number (optional)</Label>
                <Input
                  id="orderNumber"
                  name="orderNumber"
                  placeholder="e.g., ORD12345"
                  value={formData.orderNumber}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  If you have your order number, please provide it for better tracking.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Your Rating</h3>
                {renderRatingStars('foodRating', formData.foodRating, 'Food Quality')}
                {renderRatingStars('deliveryRating', formData.deliveryRating, 'Delivery Service')}
              </div>
              
              <div>
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  placeholder="Tell us about your experience..."
                  rows={4}
                  value={formData.comments}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your Name (optional)</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Your Email (optional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-irctc-orange hover:bg-irctc-orange/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeedbackForm;
