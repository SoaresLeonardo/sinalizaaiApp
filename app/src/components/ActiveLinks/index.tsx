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
          `flex items-center p-3 hover:bg-[#7e3af21e] hover:text-zinc-50 cursor-pointer transition duration-150 text-gray-500 text-base font-medium space-x-4`,
          isCurrentPath
            ? 'bg-[#7e3af21e] text-zinc-50 border-l-4 border-l-[#7e3af2ab]'
            : ''
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default ActiveLinks;
