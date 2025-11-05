## Design Kit Guide for AI Coding Agents

Purpose
- This guide tells an AI agent how to apply the design kit to any React/Next + Tailwind project to match the Foqus FE look-and-feel.
- Follow the checklists and rules verbatim. Prefer tokens and provided atoms/molecules over ad-hoc styles.

What’s in this kit
- Tailwind setup and tokens: `tailwind.config.js`
- Global styles and CSS variables: `src/pages/globals.css`
- Utilities: `src/lib/utils.ts` (exports `cn`)
- Atoms: `src/newComponents/atoms/*`
- Molecules: `src/newComponents/molecules/*`
- Hooks: `src/newComponents/hooks/*`
- Example: `examples/Showcase.tsx`
- Paths example: `tsconfig.json`
- Dependencies: `deps.md`
- Integration notes: `README.md`

Install & Wire-Up (Do this first)
1) Install packages
   - Run the exact install blocks in `deps.md`.
2) Tailwind
   - Copy or merge `design-kit/tailwind.config.js` into project root Tailwind config.
   - Ensure `darkMode: ['class']` and the `tailwindcss-animate` plugin.
   - Add appropriate `content` globs for the host project.
3) Global CSS
   - Copy `design-kit/src/pages/globals.css` and ensure it is imported once (e.g., in `_app.tsx` or `app/layout.tsx`).
4) Paths alias
   - Merge `design-kit/tsconfig.json` `baseUrl` and `paths` into host `tsconfig.json`.
5) Utilities
   - Copy `src/lib/utils.ts`. Use `cn` for class merging.

Golden Rules (must follow)
- Always use design tokens (Tailwind theme and CSS vars) for colors, spacing, and radius.
  - Examples: `bg-fill-base-1`, `text-text-base-primary`, `border-input`, `rounded-[15px]`, `gap-sm`, `p-md`.
- Compose new UIs from atoms and molecules. Do not re-implement primitives.
- Prefer exact pixel sizes only when the design system specifies them (`text-[16px]`, `rounded-[10px|15px|20px]`).
- Keep components typed; extend HTML attributes where appropriate.
- Use `cn` to combine classes and allow consumer overrides via `className`.

Tokens & Utilities
- Colors: Defined in Tailwind theme and CSS variables in `globals.css`.
- Spacing scale: `xs=10px`, `sm=20px`, `md=32px`, `lg=48px`, `xl=64px`.
- Radius: base `--radius` with fixed `10px`, `15px`, `20px` also available.
- Typography: use weights `font-[400|600|700]` and sizes including `text-[16px]`, `text-[26px]`.
- Utility: `cn(...classes)` merges class names safely.

Atoms (how to use)
- Button (`button.tsx`): supports `variant`, `size`, and `loading`. Includes `TabButton` for tab-like actions.
  ```tsx
  import { Button, TabButton } from '@/newComponents/atoms/button';
  <Button>Action</Button>
  <Button variant="destructive" loading>Delete</Button>
  <TabButton active>Tab</TabButton>
  ```
- Card (`card.tsx`): rounded `[20px]`, padding `[20px]`, title `text-[26px] font-[700]`.
  ```tsx
  import { Card, CardHeader, CardTitle, CardContent } from '@/newComponents/atoms/card';
  <Card>
    <CardHeader><CardTitle>Title</CardTitle></CardHeader>
    <CardContent>Content</CardContent>
  </Card>
  ```
- Dialog (`dialog.tsx`): has `overlayClassName`, auto close button.
  ```tsx
  import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/newComponents/atoms/dialog';
  <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader>
    </DialogContent>
  </Dialog>
  ```
- Input / Textarea (`input.tsx`, `textarea.tsx`): rounded `[10px]`, `border-input`, number input hides spinners.
- Select (`select.tsx`): Radix-based select.
- Tooltip (`tooltip.tsx`): default delay 100ms, dark background.
- Table (`table.tsx`): semantics only; style via tokens.
- Form (`form.tsx`, `label.tsx`): labels, description, message wrappers (use with react-hook-form in app code).
- Tabs (`tabs.tsx`), Checkbox (`checkbox.tsx`), Slider (`slider.tsx`), Dropdown Menu (`dropdown-menu.tsx`), Separator (`separator.tsx`), Avatar (`avatar.tsx`), Skeleton (`skeleton.tsx`).
- Toast (`toast.tsx`, `toaster.tsx`, `sonner.tsx`): production-ready toasts via `sonner`.
- DualRangeSlider (`dual-range-slider.tsx`): simple 2-thumb range.

Molecules (how to use)
- DataTable (`molecules/DataTable`): TanStack Table wrapper + pagination.
  ```tsx
  import { DataTable } from '@/newComponents/molecules/DataTable';
  const columns = [...];
  <DataTable
    columns={columns}
    data={rows}
    pagination={{ pageCount, pageSize, pageIndex, setPageIndex, totalCount }}
    isLoading={false}
    isFetching={false}
  />
  ```
- LikelihoodBadge: colored tag for risk likelihood.
  ```tsx
  import { LikelihoodBadge } from '@/newComponents/molecules/LikelihoodBadge';
  <LikelihoodBadge value="Likely" />
  ```
- AsyncSelect: search-as-you-type select using dropdown menu.
  ```tsx
  import { AsyncSelect } from '@/newComponents/molecules/AsyncSelect';
  <AsyncSelect value={value} onChange={setValue} loadOptions={fetchOptions} placeholder="Search..." />
  ```
- BasicTooltip, ConfirmationDialog, Pagination, TableHeaderCell, Dropdown (menu wrapper).

Hooks
- use-debounce: debounces a value in ms.
  ```tsx
  import { useDebounce } from '@/newComponents/hooks/use-debounce';
  const debounced = useDebounce(search, 500);
  ```
- use-toast: thin wrapper; for production toasts import `toast` from atoms toast.

Styling Rules (enforced)
- Use tokens: never hardcode colors like `bg-gray-100`. Prefer `bg-fill-base-1`, `text-text-base-primary`.
- Spacing: use `gap-sm`, `p-md`, `space-y-xs`; avoid arbitrary values unless specified by the system.
- Corners: use `rounded-[10px|15px|20px]` and tokenized radii; no ad-hoc radii.
- Merge classes with `cn`. Always accept `className` props and spread to root element.

Imports & Paths
- The kit assumes `baseUrl: ./src` and path alias `@/*`.
  ```tsx
  import { Button } from '@/newComponents/atoms/button';
  import { DataTable } from '@/newComponents/molecules/DataTable';
  import { cn } from '@/lib/utils';
  ```

Accessibility & Interactions
- All interactive atoms use keyboard-focusable patterns and Radix primitives where applicable.
- Ensure focus rings via token `ring` are preserved on focus-visible.

Verification Checklist (run these)
1) Build compiles with Tailwind and tokens available.
2) Render `examples/Showcase.tsx` or a simple page using `Card`, `Button`, `Select`, `Tooltip`, `LikelihoodBadge`.
3) Visual check: background/text colors, spacing, and radii align with system.
4) Ensure `sonner` toaster is mounted once (e.g., app root) when using toasts.
5) DataTable renders headers, rows, and pagination; loading and empty states work.

When to add custom code
- Build new components by composing atoms in `src/newComponents/molecules/`.
- Only introduce new tokens if the design system expands. Update Tailwind theme and `globals.css` accordingly.

Anti-patterns (do not do)
- Do not re-create primitives (Button, Input, Dialog) from scratch.
- Do not hardcode color hex values or arbitrary spacing instead of tokens.
- Do not bypass `cn` or drop `className` pass-through on components.

References
- Explore `examples/Showcase.tsx` for a quick visual smoke test.
- See `README.md` for project integration steps; `deps.md` for packages.


