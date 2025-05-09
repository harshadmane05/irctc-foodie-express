
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Phone, MapPin } from 'lucide-react';
import { Restaurant } from '@/types/restaurant';

interface RestaurantActionsProps {
  restaurant: Restaurant;
}

const RestaurantActions: React.FC<RestaurantActionsProps> = ({ restaurant }) => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [directionsDialogOpen, setDirectionsDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!name.trim() || !phone.trim() || !message.trim()) {
      toast({
        title: "Form incomplete",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would send this data to a backend API
    console.log('Contact message sent:', { name, phone, message, restaurant: restaurant.name });
    
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${restaurant.name}. They will contact you shortly.`,
    });
    
    setContactDialogOpen(false);
    setMessage('');
    setName('');
    setPhone('');
  };

  const openMapsInNewTab = () => {
    try {
      // Default to restaurant's address if no coordinates are provided
      if (!restaurant.location) {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
      } else {
        const { lat, lng } = restaurant.location;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
      }
      
      setDirectionsDialogOpen(false);
      
      toast({
        title: "Directions opened",
        description: "Google Maps has been opened in a new tab with directions to the restaurant.",
      });
    } catch (error) {
      toast({
        title: "Could not open maps",
        description: "There was an error opening Google Maps. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          className="flex-1 hover:bg-gray-50 transition-colors" 
          onClick={() => setContactDialogOpen(true)}
        >
          <Phone className="mr-2 h-4 w-4" />
          Contact Restaurant
        </Button>
        
        <Button 
          variant="outline" 
          className="flex-1 hover:bg-gray-50 transition-colors"
          onClick={() => setDirectionsDialogOpen(true)}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Get Directions
        </Button>
      </div>
      
      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="premium-glass">
          <DialogHeader>
            <DialogTitle>Contact {restaurant.name}</DialogTitle>
            <DialogDescription>
              Fill out this form to send a message to the restaurant.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleContactSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="focus:border-amber-300"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Phone</label>
                <Input 
                  placeholder="Enter your phone number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="focus:border-amber-300"
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  placeholder="What would you like to ask?" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                  className="focus:border-amber-300"
                />
              </div>
              
              {restaurant.contactNumber && (
                <div className="bg-gray-50 p-3 rounded-md text-sm">
                  <p className="font-medium">Restaurant Contact:</p>
                  <p className="text-gray-600">{restaurant.contactNumber}</p>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-irctc-orange hover:bg-irctc-orange/90">Send Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Directions Dialog */}
      <Dialog open={directionsDialogOpen} onOpenChange={setDirectionsDialogOpen}>
        <DialogContent className="premium-glass">
          <DialogHeader>
            <DialogTitle>Get Directions to {restaurant.name}</DialogTitle>
            <DialogDescription>
              View the restaurant location and get directions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <h4 className="font-medium mb-1">Restaurant Address:</h4>
              <p className="text-gray-700">{restaurant.address}</p>
            </div>
            
            <div className="bg-gray-200 h-48 rounded-md flex items-center justify-center mb-4 premium-image">
              <MapPin className="h-8 w-8 text-gray-500" />
              <span className="ml-2 text-gray-600">Map Preview</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Click below to open Google Maps and get directions to this restaurant.
            </p>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={openMapsInNewTab} className="bg-irctc-orange hover:bg-irctc-orange/90">
              <MapPin className="mr-2 h-4 w-4" />
              Open in Google Maps
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RestaurantActions;
