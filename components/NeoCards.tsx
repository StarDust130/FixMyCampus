// components/ui/NeoCard.tsx
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NeoCardProps {
  children: ReactNode;
  className?: string;
  color?: "pink" | "yellow" | "purple" | "blue" | "green" | "white" | "orange";
  onClick?: () => void;
}

const colorMap = {
  pink: "bg-[#FFB7B2]",
  yellow: "bg-[#FFDE59]",
  purple: "bg-[#CBACF9]",
  blue: "bg-[#A2E2F9]",
  green: "bg-[#4ADE80]", // Bright neo green
  orange: "bg-[#FF9F68]",
  white: "bg-white",
};

export const NeoCard = ({
  children,
  className,
  color = "white",
  onClick,
}: NeoCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "border-2 border-black rounded-xl p-4 relative transition-transform",
        "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", // The hard shadow
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]", // Click effect
        colorMap[color],
        className
      )}
    >
      {children}
    </div>
  );
};
