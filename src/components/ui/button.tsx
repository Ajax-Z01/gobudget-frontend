import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold focus:outline-none transition text-[var(--button-text)] hover:text-[var(--text-white)] border border-[var(--foreground)] cursor-pointer";
  const variantStyles = {
    primary: "bg-[var(--primary)] hover:bg-[var(--primary-hover)]",
    secondary: "bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]",
    danger: "bg-[var(--tertiary)] hover:bg-[var(--tertiary-hover)]",
  };  

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
