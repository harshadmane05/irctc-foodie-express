
import { cn } from "./utils";

export const fadeIn = (delay: string = "0s") => 
  `animate-fade-in opacity-0 animation-fill-mode-forwards animation-delay-${delay}`;

export const slideIn = (direction: "left" | "right" | "top" | "bottom" = "bottom", delay: string = "0s") => {
  const directionClasses = {
    left: "translate-x-[-20px]",
    right: "translate-x-[20px]",
    top: "translate-y-[-20px]",
    bottom: "translate-y-[20px]"
  };
  
  return cn(
    "opacity-0 transform",
    directionClasses[direction],
    `animate-slide-in animation-delay-${delay} animation-fill-mode-forwards`
  );
};

export const pulse = "animate-pulse";
export const bounce = "animate-bounce";
export const scaleIn = "animate-scale-in";
