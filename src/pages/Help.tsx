
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, HelpCircle, Phone, Mail } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen} 
      className="border border-gray-200 rounded-lg mb-3"
    >
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex w-full justify-between p-4 text-left font-medium"
        >
          <span>{question}</span>
          <ChevronDown 
            className={`h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`} 
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 pt-0 text-gray-600">
        {answer}
      </CollapsibleContent>
    </Collapsible>
  );
};

const faqs = [
  {
    question: "How does IRCTC Foodie work?",
    answer: "IRCTC Foodie allows you to order food from restaurants near railway stations. You can enter your PNR or choose your station, browse restaurants and menu items, place your order, and have food delivered directly to your train seat."
  },
  {
    question: "How do I track my order?",
    answer: "After placing your order, you can track it from the 'Track Order' section in the app. Enter your order ID or phone number to get real-time updates on your food preparation and delivery status."
  },
  {
    question: "What if my train is delayed?",
    answer: "If your train is delayed, you can update your delivery details by contacting our customer service or updating your train status in the app. Our system will adjust the delivery timing accordingly."
  },
  {
    question: "Can I cancel my order?",
    answer: "Yes, you can cancel your order up to 30 minutes before the scheduled delivery time. Cancellations made after food preparation has started may be subject to partial refunds."
  },
  {
    question: "How do I pay for my order?",
    answer: "We accept multiple payment methods including credit/debit cards, UPI, net banking, and cash on delivery. You can choose your preferred method at checkout."
  },
  {
    question: "Is there a minimum order value?",
    answer: "Minimum order values may vary by restaurant. Some restaurants might have a minimum order requirement for train delivery which will be clearly indicated before you place your order."
  },
];

const Help = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the query to a backend
    alert("Your query has been submitted. Our team will get back to you soon!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4">Help & Support</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get answers to commonly asked questions or reach out to our customer support team.
            </p>
          </div>

          {/* Search section */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <Input 
                type="text" 
                placeholder="Search for help topics..." 
                className="pl-10 pr-4 py-6 rounded-full w-full"
              />
              <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Button 
                type="submit" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-irctc-orange hover:bg-irctc-orange/90 rounded-full px-6"
              >
                Search
              </Button>
            </form>
          </div>

          {/* FAQs section */}
          <div className="mb-16">
            <h2 className="heading-md mb-6 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Contact section */}
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
            <h2 className="heading-md mb-6 text-center">Contact Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 text-center">
                <Phone className="h-10 w-10 text-irctc-blue mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                <p className="text-gray-600 mb-2">Available 24/7</p>
                <a href="tel:+918888888888" className="text-irctc-orange font-semibold text-lg">
                  +91 888-888-8888
                </a>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 text-center">
                <Mail className="h-10 w-10 text-irctc-blue mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Email Us</h3>
                <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
                <a href="mailto:support@irctcfoodie.com" className="text-irctc-orange font-semibold">
                  support@irctcfoodie.com
                </a>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    required
                  />
                </div>
              </div>
              
              <div>
                <Input 
                  type="text" 
                  placeholder="Subject" 
                  required
                />
              </div>
              
              <div>
                <textarea 
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[150px]" 
                  placeholder="How can we help you?" 
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-irctc-orange hover:bg-irctc-orange/90"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
