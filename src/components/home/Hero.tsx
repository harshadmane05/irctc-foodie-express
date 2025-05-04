
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Train } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [stationCode, setStationCode] = useState('');
  const [searchType, setSearchType] = useState<'pnr' | 'station'>('pnr');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchType === 'pnr' && pnrNumber) {
      navigate(`/restaurants?pnr=${pnrNumber}`);
    } else if (searchType === 'station' && stationCode) {
      navigate(`/restaurants?station=${stationCode}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="heading-xl mb-6 leading-tight">
            Delicious Food <span className="text-irctc-orange">Delivered</span> to Your Train Seat
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Order from a wide variety of restaurants along your route and get food delivered directly to your seat. No more compromising on taste during your journey!
          </p>

          <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl mx-auto">
            <div className="flex justify-center space-x-4 mb-6">
              <Button 
                variant={searchType === 'pnr' ? 'default' : 'outline'}
                onClick={() => setSearchType('pnr')}
                className={searchType === 'pnr' ? 'bg-irctc-orange hover:bg-irctc-orange/90' : ''}
              >
                <Train className="mr-2 h-4 w-4" />
                Search by PNR
              </Button>
              <Button 
                variant={searchType === 'station' ? 'default' : 'outline'}
                onClick={() => setSearchType('station')}
                className={searchType === 'station' ? 'bg-irctc-orange hover:bg-irctc-orange/90' : ''}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Search by Station
              </Button>
            </div>

            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder={searchType === 'pnr' ? "Enter your 10-digit PNR number" : "Enter station code (e.g., NDLS)"}
                  className="pl-10 pr-24 py-6 rounded-full w-full text-black"
                  value={searchType === 'pnr' ? pnrNumber : stationCode}
                  onChange={(e) => {
                    if (searchType === 'pnr') {
                      setPnrNumber(e.target.value);
                    } else {
                      setStationCode(e.target.value);
                    }
                  }}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Button 
                  type="submit" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-irctc-orange hover:bg-irctc-orange/90 rounded-full px-6"
                >
                  Find Food
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-white/80 text-sm flex justify-center space-x-1 items-center">
            <span>Popular searches:</span>
            <a href="/restaurants?station=NDLS" className="underline hover:text-white">New Delhi</a>
            <span>•</span>
            <a href="/restaurants?station=CSTM" className="underline hover:text-white">Mumbai CST</a>
            <span>•</span>
            <a href="/restaurants?station=HWH" className="underline hover:text-white">Howrah</a>
            <span>•</span>
            <a href="/restaurants?station=MAS" className="underline hover:text-white">Chennai</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
