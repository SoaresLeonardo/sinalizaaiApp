import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
type Props = {
  children: ReactNode;
  params: {
    id: string[];
  };
} & LinkProps;

const ActiveLinks = ({ children, href, params, ...props }: Props) => {
  const pathname = usePathname();

  const isCurrentPathParams = pathname === `${href}/${params.id}`;

  const isCurrentPath = pathname === href || isCurrentPathParams;
  return (
    <Link href={href} {...props} passHref legacyBehavior>
      <a
        className={clsx(
          `flex items-center rounded-md p-3 cursor-pointer transition duration-150 text-base space-x-7`,
          isCurrentPath
            ? 'bg-indigo-600 text-white'
            : 'hover:bg-gray-900 hover:text-indigo-500 text-gray-400'
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default ActiveLinks;
