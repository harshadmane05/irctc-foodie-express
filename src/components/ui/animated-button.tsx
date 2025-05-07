
import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  animateHover?: boolean;
}

const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(({ className, animateHover = true, children, ...props }, ref) => {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        animateHover && "hover:translate-y-[-2px] hover:shadow-md",
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white/10 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
    </Button>
  );
});

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
