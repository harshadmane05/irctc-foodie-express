
import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface PremiumCountdownProps {
  endDate: Date;
  className?: string;
  onComplete?: () => void;
}

const PremiumCountdown: React.FC<PremiumCountdownProps> = ({ 
  endDate, 
  className,
  onComplete 
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [endDate, onComplete]);
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Timer className="h-4 w-4 text-amber-600" />
      <div className="flex gap-1 text-sm font-medium">
        <div className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
          {timeLeft.days.toString().padStart(2, '0')}d
        </div>
        <div className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
          {timeLeft.hours.toString().padStart(2, '0')}h
        </div>
        <div className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
          {timeLeft.minutes.toString().padStart(2, '0')}m
        </div>
        <div className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
          {timeLeft.seconds.toString().padStart(2, '0')}s
        </div>
      </div>
    </div>
  );
};

export default PremiumCountdown;
