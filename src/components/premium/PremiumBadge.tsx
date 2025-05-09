
import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PremiumBadge = ({ className, size = 'md' }: PremiumBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-1.5',
    md: 'text-sm py-1 px-2',
    lg: 'text-base py-1.5 px-3'
  };
  
  return (
    <div className={cn(
      'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black rounded-full font-medium flex items-center gap-1.5 shadow-lg border border-amber-200',
      'animate-pulse-slow relative overflow-hidden premium-border-card',
      sizeClasses[size],
      className
    )}>
      <Shield className="h-3.5 w-3.5 text-amber-800 animate-pulse" />
      <span className="font-bold tracking-wide">Premium</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer-premium"></div>
    </div>
  );
};

export default PremiumBadge;
