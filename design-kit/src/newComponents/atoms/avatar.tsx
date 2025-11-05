import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
};

export const Avatar: React.FC<Props> = ({ src, alt, name, className }) => {
  const initials = React.useMemo(() => {
    if (!name) return '';
    const parts = name.trim().split(' ').filter(Boolean);
    return parts.slice(0, 2).map(p => p[0]?.toUpperCase()).join('');
  }, [name]);
  return (
    <div className={cn('flex h-8 w-8 items-center justify-center rounded-full bg-fill-base-3 text-xs font-[700] text-text-base-primary overflow-hidden', className)}>
      {src ? <img src={src} alt={alt ?? name ?? 'avatar'} className="h-full w-full object-cover" /> : initials}
    </div>
  );
};


