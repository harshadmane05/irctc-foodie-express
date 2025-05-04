
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface OrderSearchFormProps {
  onSearch: (searchMethod: string, searchValue: string) => void;
  isSearching: boolean;
}

const OrderSearchForm: React.FC<OrderSearchFormProps> = ({ onSearch, isSearching }) => {
  const [searchMethod, setSearchMethod] = useState('orderId');
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue) return;
    onSearch(searchMethod, searchValue);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Enter Order Details</h2>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <RadioGroup 
          value={searchMethod} 
          onValueChange={setSearchMethod}
          className="flex flex-wrap gap-4 mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="orderId" id="option-orderId" />
            <Label htmlFor="option-orderId">Order ID</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="option-phone" />
            <Label htmlFor="option-phone">Phone Number</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pnr" id="option-pnr" />
            <Label htmlFor="option-pnr">PNR Number</Label>
          </div>
        </RadioGroup>
        
        <div className="flex gap-2">
          <Input
            placeholder={
              searchMethod === 'orderId' 
                ? "Enter Order ID (e.g., IRF289076)" 
                : searchMethod === 'phone' 
                ? "Enter Phone Number" 
                : "Enter PNR Number"
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-grow"
          />
          <Button 
            type="submit"
            className="bg-irctc-orange hover:bg-irctc-orange/90"
            disabled={isSearching || !searchValue}
          >
            {isSearching ? "Searching..." : "Track"}
          </Button>
        </div>
        
        <p className="text-sm text-gray-500">
          Try searching with Order ID: IRF289076
        </p>
      </form>
    </div>
  );
};

export default OrderSearchForm;
