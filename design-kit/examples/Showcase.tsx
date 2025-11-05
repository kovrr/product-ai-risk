import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/newComponents/atoms/card';
import { Button, TabButton } from '@/newComponents/atoms/button';
import { Input } from '@/newComponents/atoms/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/newComponents/atoms/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/newComponents/atoms/tooltip';
import { LikelihoodBadge } from '@/newComponents/molecules/LikelihoodBadge';

export const Showcase: React.FC = () => {
  const [active, setActive] = React.useState<'a' | 'b'>('a');
  const [open, setOpen] = React.useState(false);
  return (
    <div className="space-y-sm p-md bg-fill-base-1 min-h-screen">
      <div className="flex gap-sm">
        <TabButton active={active === 'a'} onClick={() => setActive('a')}>Tab A</TabButton>
        <TabButton active={active === 'b'} onClick={() => setActive('b')}>Tab B</TabButton>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-sm">
          <div className="flex items-center gap-sm">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button loading>Loading</Button>
          </div>
          <div className="grid grid-cols-1 gap-sm md:grid-cols-3">
            <Input placeholder="Text input" />
            <Input type="number" placeholder="Number input" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Hover for tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>Tooltip content</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex items-center gap-sm">
            <LikelihoodBadge value="Expected" />
            <LikelihoodBadge value="Likely" />
            <LikelihoodBadge value="Possible" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


