
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
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-irctc-orange"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-irctc-blue"></div>
        <div className="absolute top-40 right-30 w-20 h-20 rounded-full bg-irctc-purple"></div>
      </div>
      
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="heading-xl mb-6 leading-tight animate-fade-in">
            Delicious Food <span className="text-irctc-orange">Delivered</span> to Your Train Seat
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in animation-delay-100">
            Order from a wide variety of restaurants along your route and get food delivered directly to your seat. 
            No more compromising on taste during your journey!
          </p>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto border border-white/10 animate-fade-in animation-delay-200">
            <div className="flex justify-center space-x-4 mb-6">
              <Button 
                variant={searchType === 'pnr' ? 'default' : 'outline'}
                onClick={() => setSearchType('pnr')}
                className={searchType === 'pnr' ? 'bg-irctc-orange hover:bg-irctc-orange/90 shadow-lg shadow-orange-900/20' : 'border-white/20 text-white hover:bg-white/10 hover:text-white'}
              >
                <Train className="mr-2 h-4 w-4" />
                Search by PNR
              </Button>
              <Button 
                variant={searchType === 'station' ? 'default' : 'outline'}
                onClick={() => setSearchType('station')}
                className={searchType === 'station' ? 'bg-irctc-orange hover:bg-irctc-orange/90 shadow-lg shadow-orange-900/20' : 'border-white/20 text-white hover:bg-white/10 hover:text-white'}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Search by Station
              </Button>
            </div>

            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={searchType === 'pnr' ? "Enter your 10-digit PNR number" : "Enter station code (e.g., NDLS)"}
                  className="pl-12 pr-28 py-7 rounded-full w-full text-gray-800 text-lg border-white/20 shadow-xl focus:border-irctc-orange"
                  value={searchType === 'pnr' ? pnrNumber : stationCode}
                  onChange={(e) => {
                    if (searchType === 'pnr') {
                      setPnrNumber(e.target.value);
                    } else {
                      setStationCode(e.target.value);
                    }
                  }}
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Button 
                  type="submit" 
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-irctc-orange hover:bg-irctc-orange/90 rounded-full px-6 py-6 shadow-lg"
                >
                  Find Food
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-white/80 text-sm flex flex-wrap justify-center items-center gap-x-3 gap-y-2 animate-fade-in animation-delay-300">
            <span>Popular searches:</span>
            <a href="/restaurants?station=NDLS" className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">New Delhi</a>
            <a href="/restaurants?station=CSTM" className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">Mumbai CST</a>
            <a href="/restaurants?station=HWH" className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">Howrah</a>
            <a href="/restaurants?station=MAS" className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">Chennai</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
