import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type VariantButton = 'primary' | 'secondary' | 'border';

type ButtonProps = {
  children: React.ReactNode;
  className?: string | undefined;
  variant?: VariantButton;
  rounded?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children = '',
  variant = 'primary',
  rounded = false,
  className = '',
  ...rest
}) => {
  return (
    <button
      className={clsx(
        `px-5 py-3 flex items-center justify-center text-sm ${className}`,
        variant === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-500 transition-colors focus:ring-2'
          : '',
        rounded ? 'rounded-lg' : ''
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
