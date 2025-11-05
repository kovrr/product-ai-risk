import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  step?: number;
  className?: string;
};

export const DualRangeSlider: React.FC<Props> = ({ min, max, value, onChange, step = 1, className }) => {
  const [low, high] = value;
  const handleLow = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), high);
    onChange([v, high]);
  };
  const handleHigh = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), low);
    onChange([low, v]);
  };
  const left = ((low - min) / (max - min)) * 100;
  const right = ((high - min) / (max - min)) * 100;
  return (
    <div className={cn('relative h-6', className)}>
      <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-fill-base-4" />
      <div className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-primary" style={{ left: `${left}%`, right: `${100 - right}%` }} />
      <input type="range" min={min} max={max} step={step} value={low} onChange={handleLow} className="absolute h-6 w-full appearance-none bg-transparent" />
      <input type="range" min={min} max={max} step={step} value={high} onChange={handleHigh} className="absolute h-6 w-full appearance-none bg-transparent" />
    </div>
  );
};


