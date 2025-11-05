import * as React from 'react';
import { Input } from '@/newComponents/atoms/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/newComponents/atoms/dropdown-menu';
import { useDebounce } from '@/newComponents/hooks/use-debounce';

type Option = { label: string; value: string };

type Props = {
  value: Option | null;
  onChange: (v: Option | null) => void;
  loadOptions: (q: string) => Promise<Option[]>;
  placeholder?: string;
};

export const AsyncSelect: React.FC<Props> = ({ value, onChange, loadOptions, placeholder }) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [options, setOptions] = React.useState<Option[]>([]);
  const [loading, setLoading] = React.useState(false);
  const debounced = useDebounce(query, 300);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    loadOptions(debounced).then((opts) => {
      if (mounted) setOptions(opts);
    }).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [debounced, loadOptions]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="w-full">
          <Input
            value={value?.label ?? query}
            placeholder={placeholder}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
        {loading && <div className="px-2 py-1.5 text-sm text-text-base-secondary">Loading...</div>}
        {!loading && options.length === 0 && <div className="px-2 py-1.5 text-sm text-text-base-tertiary">No results</div>}
        {options.map((opt) => (
          <DropdownMenuItem key={opt.value} onClick={() => { onChange(opt); setOpen(false); }}>
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


