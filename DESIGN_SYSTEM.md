# Design System Documentation

> **Auto-generated documentation for the Foqus FE design system**
> Last updated: November 2025

This document captures the design system patterns, components, and conventions used in this React/TypeScript/Tailwind/shadcn project for reuse in future projects.

---

## Table of Contents

- [Design Tokens](#design-tokens)
- [Component Library](#component-library)
- [Code Patterns](#code-patterns)
- [File Structure Conventions](#file-structure-conventions)
- [Usage Guidelines](#usage-guidelines)

---

## Design Tokens

### Color System

The design system uses a comprehensive color system based on CSS custom properties with Tailwind integration.

#### Base Colors

```css
/* Light Mode */
--background: #ffffff
--foreground: #1c1c2d
--card: #ffffff
--card-foreground: #1c1c2d
--primary: #5551f7
--primary-foreground: #ffffff
--secondary: #f5f7ff
--destructive: #eb491f
--border: #f1f1f1
--input: #ced7de
--ring: #5551f7
```

#### Fill Colors

The system uses a semantic fill color hierarchy:

**Base Fills (Neutral grays)**
```javascript
fill-base-n1   // #f8f8f8 - Lightest gray
fill-base-0    // #ffffff - White
fill-base-1    // #f5f7ff - Very light blue
fill-base-2    // #eaf4ff - Light blue
fill-base-3    // #eaf1fc - Lighter blue
fill-base-4    // #dce5f2 - Medium blue-gray
fill-base-5    // #ced7de - Darker blue-gray
```

**Brand Fills**
```javascript
fill-brand-primary              // #5551f7 - Primary brand purple
fill-brand-primary-transparent  // rgba(84, 82, 247, 0.2)
fill-brand-secondary            // #8b9ff8 - Secondary brand purple
```

**Specific Use Cases**
```javascript
fill-specific-tooltip           // rgba(28, 28, 30, 0.9)
fill-specific-background        // #eaf1fc
fill-specific-divider           // #dce5f2
fill-specific-sidebar-primary   // #303045
fill-specific-sidebar-child     // #1c1c2d
fill-specific-icon-default      // #7a7f86
fill-specific-icon-hover        // #f8f8f8
fill-specific-icon-onpress      // #f1f1f1
```

**Information States**
```javascript
fill-information-error    // #eb491f - Red
fill-information-warning  // #fbbc09 - Yellow
fill-information-success  // #0dc783 - Green
fill-information-info     // #154dab - Blue
```

#### Text Colors

```javascript
// Base text hierarchy
text-base-primary    // #303045 - Main text
text-base-secondary  // #7a7f86 - Secondary text
text-base-tertiary   // #a9b4bc - Tertiary/muted text
text-base-invert     // #ffffff - White text

// Brand text
text-brand-primary   // #5551f7
text-brand-secondary // #8b9ff8

// Specific contexts
text-specific-sidebar-idle    // #a9b4bc
text-specific-sidebar-hover   // #ced7de
text-specific-sidebar-active  // #ffffff

// Information states
text-information-error   // #eb491f
text-information-success // #0dc783
text-information-info    // #154dab
```

#### Visualization Colors

**Event Types**
```javascript
viz-event-attritional   // #8a8da9 - Gray
viz-event-databreach    // #ff9900 - Orange
viz-event-interruption  // #0dc783 - Green
viz-event-ransomware    // #de5b58 - Red
```

**Impact Types**
```javascript
viz-impact-ransomware    // #154dab - Dark blue
viz-impact-interruption  // #5551f7 - Purple
viz-impact-provider      // #bbbafc - Light purple
viz-impact-liability     // #9f3c00 - Dark orange
viz-impact-databreach    // #ff802e - Orange
viz-impact-regulation    // #fcd4a4 - Light orange
```

**Severity Tags**
```javascript
viz-impact-tags-severe       // #eb491f - Red
viz-impact-tags-significant  // #ff802e - Orange
viz-impact-tags-moderate     // #fbbc09 - Yellow
viz-impact-tags-minor        // #7cd011 - Light green
viz-impact-tags-negligible   // #0dc783 - Green
```

**Likelihood Tags**
```javascript
viz-likelihood-tags-expected  // #eb491f - Red
viz-likelihood-tags-likely    // #ff802e - Orange
viz-likelihood-tags-possible  // #fbbc09 - Yellow
viz-likelihood-tags-unlikely  // #7cd011 - Light green
viz-likelihood-tags-rare      // #0dc783 - Green
```

**Priority Tags**
```javascript
viz-priority-tags-low       // #7cd011 - Green
viz-priority-tags-medium    // #fbbc09 - Yellow
viz-priority-tags-high      // #ff802e - Orange
viz-priority-tags-critical  // #eb491f - Red
```

### Spacing System

Custom spacing scale for consistent layout:

```javascript
xs: '10px'  // gap-xs, p-xs, m-xs, space-y-xs
sm: '20px'  // gap-sm, p-sm, m-sm, space-y-sm
md: '32px'  // gap-md, p-md, m-md, space-y-md
lg: '48px'  // gap-lg, p-lg, m-lg, space-y-lg
xl: '64px'  // gap-xl, p-xl, m-xl, space-y-xl
```

**Usage Examples:**
```tsx
<div className="gap-sm p-md space-y-xs">
  {/* 20px gap, 32px padding, 10px vertical spacing */}
</div>
```

### Border Radius

Dynamic border radius based on CSS variable:

```javascript
--radius: 0.5rem  // Base radius value

// Available utilities
rounded-sm  // calc(var(--radius) - 4px)
rounded-md  // calc(var(--radius) - 2px)
rounded-lg  // var(--radius)
```

### Typography

The project uses system fonts with specific weight conventions:

```javascript
font-[400]  // Regular - Default body text
font-[600]  // Semi-bold - Emphasized text, button text
font-[700]  // Bold - Headings, active states

// Font sizes
text-xs    // Extra small (0.75rem)
text-sm    // Small (0.875rem)
text-base  // Base (1rem)
text-lg    // Large (1.125rem)
text-[16px], text-[26px]  // Custom sizes used throughout
```

---

## Component Library

### shadcn/ui Components

Located in `/src/newComponents/atoms/`, these are customized shadcn components:

#### Core Components

**Button** (`button.tsx`)
```tsx
import { Button, TabButton } from '@/newComponents/atoms/button';

// Variants
<Button variant="default">Primary Action</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Secondary</Button>
<Button variant="secondary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>

// Loading state (custom enhancement)
<Button loading={isLoading}>Submit</Button>

// TabButton (custom variant)
<TabButton active={isActive}>Tab Name</TabButton>
```

**Customizations:**
- Added `loading` prop with spinner animation
- Custom `TabButton` component with active state
- Rounded corners: `rounded-[15px]`
- Font weight: `font-[600]` for default variant

**Badge** (`badge.tsx`)
```tsx
import { Badge } from '@/newComponents/atoms/badge';

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

**Card** (`card.tsx`)
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/newComponents/atoms/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer actions</CardFooter>
</Card>
```

**Customizations:**
- Border radius: `rounded-[20px]`
- Padding: `p-[20px]`
- Title font: `text-[26px] font-[700]`

**Dialog** (`dialog.tsx`)
```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/newComponents/atoms/dialog';

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button>Action</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Customizations:**
- Custom `overlayClassName` prop for overlay styling
- Border radius: `rounded-[15px]`
- Auto-included close button with X icon

**Select** (`select.tsx`)
```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/newComponents/atoms/select';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

**Customizations:**
- Border radius: `rounded-[10px]`
- Border: `border-[1px] border-solid border-input`

**Input** (`input.tsx`)
```tsx
import { Input } from '@/newComponents/atoms/input';

<Input type="text" placeholder="Enter text" />
<Input type="number" placeholder="Enter number" />
```

**Customizations:**
- Border radius: `rounded-[10px]`
- Border: `border-[1px] border-solid border-input`
- Number input: Hides spinner arrows

**Form Components** (`form.tsx`)
```tsx
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/newComponents/atoms/form';

// Use with react-hook-form
<Form {...form}>
  <FormField
    control={form.control}
    name="fieldName"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormDescription>Helper text</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

**Tooltip** (`tooltip.tsx`)
```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/newComponents/atoms/tooltip';

<TooltipProvider>
  <Tooltip delayDuration={100}>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>Tooltip content</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Customizations:**
- Custom default delay: 100ms
- Background: `bg-fill-specific-tooltip`
- Text color: `text-text-base-invert`

**Table** (`table.tsx`)
```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell
} from '@/newComponents/atoms/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Header</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Cell</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Full Component List

```
✓ avatar.tsx
✓ badge.tsx
✓ button.tsx (+ TabButton)
✓ card.tsx
✓ chart.tsx (recharts wrapper)
✓ checkbox.tsx
✓ collapsible.tsx
✓ command.tsx (cmdk)
✓ dialog.tsx
✓ dropdown-menu.tsx
✓ dual-range-slider.tsx (custom)
✓ form.tsx
✓ hover-card.tsx
✓ input.tsx
✓ label.tsx
✓ popover.tsx
✓ radio-group.tsx
✓ select.tsx
✓ separator.tsx
✓ skeleton.tsx
✓ slider.tsx
✓ sonner.tsx (toast notifications)
✓ table.tsx
✓ tabs.tsx
✓ textarea.tsx
✓ toast.tsx
✓ toaster.tsx
✓ tooltip.tsx
```

### Custom Molecules

Located in `/src/newComponents/molecules/`:

**DataTable** - TanStack Table wrapper with pagination
```tsx
import { DataTable } from '@/newComponents/molecules/DataTable';

<DataTable
  table={table}
  pagination={{
    pageCount,
    pageSize,
    pageIndex,
    setPageIndex,
    setPageSize,
    totalCount,
    currentPageSize
  }}
  isLoading={false}
  isFetching={false}
/>
```

**LikelihoodBadge** - Risk likelihood indicator
```tsx
import { LikelihoodBadge } from '@/newComponents/molecules/LikelihoodBadge';

<LikelihoodBadge value="Expected" />
<LikelihoodBadge value="Likely" />
<LikelihoodBadge value="Possible" />
```

**AsyncSelect** - Async searchable select
```tsx
import { AsyncSelect } from '@/newComponents/molecules/AsyncSelect';

<AsyncSelect
  value={value}
  onChange={setValue}
  loadOptions={fetchOptions}
  placeholder="Search..."
/>
```

**BasicTooltip** - Simple tooltip wrapper
```tsx
import { BasicTooltip } from '@/newComponents/molecules/BasicTooltip';

<BasicTooltip content="Tooltip text">
  <span>Hover me</span>
</BasicTooltip>
```

**ConfirmationDialog** - Confirmation modal
```tsx
import { ConfirmationDialog } from '@/newComponents/molecules/ConfirmationDialog';

<ConfirmationDialog
  open={open}
  onOpenChange={setOpen}
  onConfirm={handleConfirm}
  title="Confirm action"
  description="Are you sure?"
/>
```

**Other Molecules:**
- `BackButton` - Navigation back button
- `BackWithLabel` - Back button with custom label
- `Dropdown` - Custom dropdown component
- `DropdownMenu` - Menu wrapper
- `Pagination` - Pagination controls
- `RadialChart` - Radial chart component
- `SeverityBullet` - Severity indicator
- `TableHeaderCell` - Enhanced table header

### Legacy Components (Chakra UI)

Located in `/src/components/ui/`:

These are older Chakra UI based components being phased out. For new development, use shadcn components instead.

---

## Code Patterns

### TypeScript Conventions

#### Component Props Patterns

**Using Type:**
```tsx
type Props = {
  title: string;
  description?: string;
  onSubmit: (data: FormData) => void;
};

export const Component: FC<Props> = ({ title, description, onSubmit }) => {
  // ...
};
```

**Extending HTML Elements:**
```tsx
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}
```

**Generic Components:**
```tsx
type Props<TData> = {
  data: TData[];
  renderItem: (item: TData) => React.ReactNode;
};

export const List = <TData,>({ data, renderItem }: Props<TData>) => {
  // ...
};
```

#### Forward Refs Pattern

```tsx
const Component = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('base-classes', className)} {...props} />
));
Component.displayName = 'Component';
```

#### Class Variance Authority (CVA) Pattern

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const componentVariants = cva(
  'base classes applied to all variants',
  {
    variants: {
      variant: {
        default: 'default variant classes',
        secondary: 'secondary variant classes',
      },
      size: {
        sm: 'small size classes',
        lg: 'large size classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}
```

### React Patterns

#### Custom Hooks

**Debounce Hook** (`use-debounce.ts`)
```tsx
import { useDebounce } from '@/newComponents/hooks/use-debounce';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);

useEffect(() => {
  // Perform search with debouncedSearch
}, [debouncedSearch]);
```

**Toast Hook** (`use-toast.ts`)
```tsx
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

toast({
  title: 'Success',
  description: 'Operation completed',
  variant: 'default',
});
```

#### Form Handling

**React Hook Form + Zod:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    email: '',
    name: '',
  },
});
```

**Final Form (Legacy):**
```tsx
import { Form } from 'react-final-form';

<Form
  onSubmit={handleSubmit}
  initialValues={initialValues}
  render={({ handleSubmit, submitting }) => (
    <form onSubmit={handleSubmit}>
      {/* Fields */}
    </form>
  )}
/>
```

### Styling Patterns

#### Using `cn` Utility

The `cn` utility combines `clsx` and `tailwind-merge`:

```tsx
import { cn } from '@/lib/utils';

// Conditional classes
<div className={cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class',
  className  // Allow prop override
)} />

// Merging Tailwind classes (prevents conflicts)
cn('p-4', 'p-6')  // → 'p-6' (later value wins)
```

#### Component Styling Convention

```tsx
const Component = ({ className, variant, ...props }) => {
  return (
    <div
      className={cn(
        // 1. Base/layout classes
        'flex items-center',
        // 2. Spacing
        'gap-2 p-4',
        // 3. Typography
        'text-sm font-medium',
        // 4. Colors
        'bg-background text-foreground',
        // 5. Borders/shadows
        'rounded-md border',
        // 6. Interactions
        'hover:bg-accent',
        // 7. Variants (CVA or conditional)
        variant === 'primary' && 'bg-primary',
        // 8. Allow override
        className
      )}
      {...props}
    />
  );
};
```

#### Custom Pixel Values

The project uses exact pixel values for specific design requirements:

```tsx
// Preferred: Use design tokens
<div className="gap-sm p-md" />

// When exact values needed:
<div className="gap-[3px] h-[19px] w-[7px] text-[16px]" />
<div className="rounded-[10px] rounded-[15px] rounded-[20px]" />
```

### Import Patterns

#### Absolute Imports

```tsx
// tsconfig.json: "baseUrl": "./src"
import { Button } from '@/newComponents/atoms/button';
import { useDebounce } from '@/newComponents/hooks/use-debounce';
import { cn } from '@/lib/utils';
import { api } from '@/api/client';
```

#### Component Re-exports

```tsx
// Good: Re-export related components from index
export * from './component-a';
export * from './component-b';

// Import: Clean imports
import { ComponentA, ComponentB } from '@/components/feature';
```

### State Management

**React Query** (for server state)
```tsx
import { useQuery, useMutation } from 'react-query';

const { data, isLoading } = useQuery('key', fetchData);

const mutation = useMutation(updateData, {
  onSuccess: () => {
    queryClient.invalidateQueries('key');
  },
});
```

**MobX** (for client state - legacy)
```tsx
import { observer } from 'mobx-react-lite';

const Component = observer(() => {
  // Component automatically re-renders on observable changes
});
```

---

## File Structure Conventions

### Directory Organization

```
src/
├── _pages/                    # Page-level components (Next.js)
│   ├── FeatureName/
│   │   ├── components/       # Feature-specific components
│   │   ├── hooks/           # Feature-specific hooks
│   │   ├── utils/           # Feature-specific utilities
│   │   └── types.ts         # Feature-specific types
│
├── components/               # Shared components (legacy)
│   ├── ui/                  # UI components (Chakra)
│   ├── layout/              # Layout components
│   ├── inputs/              # Form inputs
│   └── ...
│
├── newComponents/           # New component system
│   ├── atoms/              # shadcn/ui base components
│   ├── molecules/          # Composite components
│   ├── hooks/              # Shared hooks
│   ├── icons/              # Icon components
│   └── charts/             # Chart components
│
├── hooks/                  # Global hooks
├── lib/                   # Utilities (cn, etc.)
├── types/                 # Global type definitions
├── api/                   # API client and endpoints
└── utils/                 # Global utilities
```

### Naming Conventions

**Files:**
- Components: PascalCase (`Button.tsx`, `DataTable.tsx`)
- Hooks: camelCase with 'use' prefix (`use-debounce.ts`)
- Utils: camelCase (`utils.ts`, `helpers.ts`)
- Types: camelCase (`types.ts`, `types.tsx`)

**Components:**
```tsx
// Component names match file names
export const Button = () => { };        // Button.tsx
export const DataTable = () => { };     // DataTable.tsx
export const useDebounce = () => { };   // use-debounce.ts
```

**Variables:**
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase

**CSS Classes:**
- Use Tailwind utilities
- Custom classes: kebab-case (rare)

### Component File Structure

```tsx
// 1. Imports
import * as React from 'react';
import { cn } from '@/lib/utils';
import { ComponentDependency } from './dependency';

// 2. Types/Interfaces
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary';
}

// 3. Constants (if needed)
const VARIANTS = {
  default: 'variant-classes',
  secondary: 'variant-classes',
};

// 4. Component
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(VARIANTS[variant], className)}
        {...props}
      />
    );
  }
);

// 5. Display name
Component.displayName = 'Component';

// 6. Export
export { Component };
```

---

## Usage Guidelines

### Setting Up a New Project

#### 1. Install Dependencies

```bash
npm install \
  tailwindcss \
  tailwindcss-animate \
  tailwind-merge \
  clsx \
  class-variance-authority \
  @radix-ui/react-slot \
  @radix-ui/react-dialog \
  @radix-ui/react-select \
  @radix-ui/react-tooltip \
  # ... other Radix UI primitives as needed
  lucide-react \
  react-hook-form \
  @hookform/resolvers \
  zod
```

#### 2. Configure Tailwind

Copy `tailwind.config.js` and `globals.css` from this project.

```js
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Copy color tokens
      colors: { /* ... */ },
      // Copy spacing scale
      spacing: { /* ... */ },
      // Copy border radius
      borderRadius: { /* ... */ },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

#### 3. Set Up Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### 4. Create Utility Functions

```tsx
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### 5. Copy Components

Copy components from `/src/newComponents/atoms/` as needed. Each component is self-contained.

### Adding shadcn Components

```bash
# If using shadcn CLI (recommended)
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add select

# Or copy from this project's /src/newComponents/atoms/
```

### Creating Custom Components

**Pattern: Build on shadcn atoms**

```tsx
// molecules/CustomComponent.tsx
import { Button } from '@/newComponents/atoms/button';
import { Card } from '@/newComponents/atoms/card';
import { cn } from '@/lib/utils';

interface CustomComponentProps {
  title: string;
  onAction: () => void;
  className?: string;
}

export const CustomComponent: FC<CustomComponentProps> = ({
  title,
  onAction,
  className
}) => {
  return (
    <Card className={cn('p-md', className)}>
      <h2 className="text-[26px] font-[700]">{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </Card>
  );
};
```

### Color Usage Examples

```tsx
// Background fills
<div className="bg-fill-base-1">Light background</div>
<div className="bg-fill-brand-primary">Brand background</div>

// Text colors
<p className="text-text-base-primary">Primary text</p>
<p className="text-text-base-secondary">Secondary text</p>

// Borders
<div className="border border-stroke-base-1">Bordered</div>

// Status colors
<span className="text-text-information-error">Error</span>
<span className="text-text-information-success">Success</span>

// Visualization
<div className="bg-viz-likelihood-tags-expected">Expected</div>
<div className="bg-viz-impact-tags-severe">Severe</div>
```

### Best Practices

#### 1. Always Use Design Tokens

```tsx
// ✅ Good: Use design tokens
<div className="bg-fill-base-1 text-text-base-primary" />

// ❌ Bad: Hard-coded colors
<div className="bg-gray-100 text-gray-900" />
```

#### 2. Spacing Consistency

```tsx
// ✅ Good: Use spacing scale
<div className="gap-sm p-md space-y-xs" />

// ❌ Bad: Arbitrary spacing
<div className="gap-5 p-8 space-y-2" />
```

#### 3. Component Composition

```tsx
// ✅ Good: Compose from atoms
import { Button } from '@/newComponents/atoms/button';
import { Dialog, DialogContent } from '@/newComponents/atoms/dialog';

// ❌ Bad: Recreate from scratch
const CustomButton = () => <button className="..." />;
```

#### 4. Props Spreading

```tsx
// ✅ Good: Allow extending with HTML attributes
const Component = ({ className, ...props }: ComponentProps) => (
  <div className={cn('base', className)} {...props} />
);

// ✅ Usage
<Component className="custom" data-testid="test" />
```

#### 5. Type Safety

```tsx
// ✅ Good: Use proper typing
interface Props {
  variant: 'primary' | 'secondary';
  onSubmit: (data: FormData) => Promise<void>;
}

// ❌ Bad: Any types
interface Props {
  variant: any;
  onSubmit: any;
}
```

### Migration Strategy

When updating an existing project:

1. **Install dependencies** as shown above
2. **Add Tailwind config** with design tokens
3. **Create `/newComponents` directory**
4. **Copy utility functions** (`lib/utils.ts`)
5. **Gradually migrate components:**
   - Start with new features using shadcn
   - Replace Chakra components as you touch them
   - Keep existing components working

### Common Patterns Library

#### Loading States

```tsx
import { Spinner } from '@/components/ui/Spinner';

{isLoading ? <Spinner /> : <Content />}
```

#### Error Handling

```tsx
import { toast } from '@/hooks/use-toast';

try {
  await mutation.mutateAsync(data);
  toast({ title: 'Success' });
} catch (error) {
  toast({
    title: 'Error',
    description: error.message,
    variant: 'destructive'
  });
}
```

#### Conditional Rendering

```tsx
{isVisible && <Component />}
{data?.length ? <List data={data} /> : <EmptyState />}
```

#### Modal Pattern

```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

---

## Quick Reference

### Essential Imports

```tsx
// Utilities
import { cn } from '@/lib/utils';

// Common Atoms
import { Button, TabButton } from '@/newComponents/atoms/button';
import { Badge } from '@/newComponents/atoms/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/newComponents/atoms/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/newComponents/atoms/dialog';
import { Input } from '@/newComponents/atoms/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/newComponents/atoms/select';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/newComponents/atoms/tooltip';

// Common Molecules
import { DataTable } from '@/newComponents/molecules/DataTable';
import { LikelihoodBadge } from '@/newComponents/molecules/LikelihoodBadge';

// Hooks
import { useDebounce } from '@/newComponents/hooks/use-debounce';
import { useToast } from '@/hooks/use-toast';
```

### Key Files to Copy

```
📁 Must-have files for new projects:
  ├── src/lib/utils.ts
  ├── tailwind.config.js
  ├── src/pages/globals.css
  └── tsconfig.json (paths config)

📁 shadcn components directory:
  └── src/newComponents/atoms/
      ├── button.tsx
      ├── card.tsx
      ├── dialog.tsx
      ├── input.tsx
      ├── select.tsx
      └── ... (copy as needed)
```

---

## Resources

- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **Radix UI**: https://radix-ui.com
- **CVA**: https://cva.style
- **React Hook Form**: https://react-hook-form.com
- **TanStack Table**: https://tanstack.com/table

---

*This design system is actively maintained. Update this document as patterns evolve.*
