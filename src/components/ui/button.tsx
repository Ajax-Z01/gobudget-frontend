import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary" }) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold focus:outline-none transition";
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;