import * as React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/newComponents/atoms/dropdown-menu';

type Item = { label: string; value: string };

type Props = {
  trigger: React.ReactNode;
  items: Item[];
  onSelect: (value: string) => void;
};

export const Dropdown: React.FC<Props> = ({ trigger, items, onSelect }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
    <DropdownMenuContent>
      {items.map((it) => (
        <DropdownMenuItem key={it.value} onClick={() => onSelect(it.value)}>
          {it.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);


