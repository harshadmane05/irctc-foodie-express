
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
      'bg-gradient-gold text-irctc-charcoal rounded-full font-medium flex items-center gap-1 animate-fade-in',
      sizeClasses[size],
      className
    )}>
      <Shield className="h-3.5 w-3.5" />
      <span>Premium</span>
    </div>
  );
};

export default PremiumBadge;
