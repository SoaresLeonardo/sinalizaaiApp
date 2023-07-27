import { ComponentProps } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const button = tv({
  base: 'flex items-center justify-center text-sm focus:ring-2 rounded-lg disabled-[disabled=true]:bg-gray-300',
  variants: {
    size: {
      default: 'px-5 py-3',
      sm: 'px-4 py-2'
    },
    color: {
      default: 'bg-[#7E3AF2] text-white hover:bg-[#8d4ff8]'
    }
  },
  defaultVariants: {
    size: 'default',
    color: 'default'
  }
});

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    children: React.ReactNode;
    className?: string | undefined;
    disabled?: boolean;
  };

const Button = ({ children = '', disabled = false, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${button()} ${props.className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
