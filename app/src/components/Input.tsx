import React, {
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useId,
  useState
} from 'react';

import { Eye, EyeClosed } from 'phosphor-react';
import clsx from 'clsx';

type Props = {
  label?: string;
  startAdorment?: React.ReactNode;
  endAdorment?: React.ReactNode;
  error?: boolean;
  textHelp?: string;
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props;

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    label = '',
    type = 'text',
    startAdorment,
    endAdorment,
    error = false,
    textHelp = '',
    ...rest
  },
  ref
) => {
  const inputId = useId();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const typeVisible = isVisiblePassword ? 'text' : 'password';
  const typeChangePassword = type === 'password' ? typeVisible : type;

  const handleVisiblePassword = useCallback(() => {
    setIsVisiblePassword((state) => !state);
  }, []);

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="text-sm">
          {label}
        </label>
      )}
      <div
        className={clsx(
          `py-3 border-b border-b-gray-300 flex items-center`,
          error ? ' border-b-red-500 mb-2' : ''
        )}
      >
        {startAdorment && (
          <span className={clsx(`text-zinc-600`, error ? 'text-red-500' : '')}>
            {startAdorment}
          </span>
        )}
        <input
          type={typeChangePassword}
          ref={ref}
          className="outline-none w-full pl-3 placeholder:text-sm"
          id={inputId}
          {...rest}
        />
        {endAdorment && <span className="text-zinc-600">{endAdorment}</span>}
        {type === 'password' && (
          <button type="button" onClick={handleVisiblePassword}>
            {isVisiblePassword ? (
              <Eye size={20} className="text-zinc-600" />
            ) : (
              <EyeClosed size={20} className="text-zinc-600" />
            )}
          </button>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{textHelp}</span>}
    </div>
  );
};

export default forwardRef(Input);
