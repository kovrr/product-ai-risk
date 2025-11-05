import React from 'react';
import { cn } from '../../lib/utils';

export interface UserAvatarProps {
  name: string;
  email?: string;
  avatar?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showName?: boolean;
  showEmail?: boolean;
  className?: string;
}

const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const sizeConfig = {
  xs: {
    avatar: 'w-[24px] h-[24px] text-[10px]',
    text: 'text-[12px]',
  },
  sm: {
    avatar: 'w-[32px] h-[32px] text-[12px]',
    text: 'text-[13px]',
  },
  md: {
    avatar: 'w-[40px] h-[40px] text-[14px]',
    text: 'text-[14px]',
  },
  lg: {
    avatar: 'w-[48px] h-[48px] text-[16px]',
    text: 'text-[16px]',
  },
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  email,
  avatar,
  size = 'md',
  showName = true,
  showEmail = false,
  className,
}) => {
  const config = sizeConfig[size];

  return (
    <div className={cn('flex items-center gap-[8px]', className)}>
      {/* Avatar */}
      <div
        className={cn(
          'flex items-center justify-center rounded-full flex-shrink-0',
          'bg-fill-brand-primary text-white font-[600]',
          config.avatar
        )}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {/* Text */}
      {(showName || showEmail) && (
        <div className="flex flex-col min-w-0">
          {showName && (
            <span
              className={cn(
                'text-text-base-primary font-[600] truncate',
                config.text
              )}
            >
              {name}
            </span>
          )}
          {showEmail && email && (
            <span className="text-text-base-tertiary text-[11px] truncate">
              {email}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
