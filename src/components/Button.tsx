import React from 'react';

interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  text, 
  variant = 'primary', 
  isLoading = false, 
  onClick,
  disabled 
}) => {
  return (
    <button 
      className={`button button_variant_${variant} ${disabled || isLoading ? 'button_disabled' : ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      <span className="button__text">
        {isLoading ? 'Загрузка...' : text}
      </span>
    </button>
  );
};