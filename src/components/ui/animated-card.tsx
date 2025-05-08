
import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  animateHover?: boolean;
  delayIndex?: number;
}

const AnimatedCard = React.forwardRef<
  HTMLDivElement,
  AnimatedCardProps
>(({ className, animateHover = true, delayIndex = 0, children, ...props }, ref) => {
  const delays = [
    "animation-delay-0", 
    "animation-delay-100", 
    "animation-delay-200", 
    "animation-delay-300", 
    "animation-delay-400", 
    "animation-delay-500"
  ];
  
  const delay = delays[delayIndex % delays.length];

  return (
    <Card
      className={cn(
        "animate-fade-in opacity-0 animation-fill-mode-forwards",
        delay,
        animateHover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Card>
  );
});

AnimatedCard.displayName = "AnimatedCard";

export { AnimatedCard };
