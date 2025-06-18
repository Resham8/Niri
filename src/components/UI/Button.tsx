import type { ReactElement } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  text: string;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const baseClasses =
  "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed capitalize";

const variantClasses = {
  primary:
    "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-102",
  secondary: "bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-50",
};

const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  text,
  size = "md",
  startIcon,
  onClick,
  fullWidth = false, 
  loading 
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? " w-full flex justify-center items-center" : ""} `} onClick={onClick} disabled={loading}
    >
       {startIcon && <span className="pr-2">{startIcon}</span>} {text}
    </button>
  );
}
