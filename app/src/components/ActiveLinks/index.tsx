import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
type Props = {
  children: ReactNode;
} & LinkProps;

const ActiveLinks = ({ children, href, ...props }: Props) => {
  const pathname = usePathname();

  const isCurrentPath = pathname === href;
  return (
    <Link href={href} {...props} passHref legacyBehavior>
      <a
        className={clsx(
          `flex items-center rounded-lg p-3 cursor-pointer transition duration-150 text-base font-semibold space-x-4`,
          isCurrentPath
            ? 'bg-[#0812250a] text-indigo-600'
            : 'hover:bg-gray-100 hover:text-gray-800 text-gray-800'
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default ActiveLinks;
