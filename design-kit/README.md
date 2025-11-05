Design Kit (Foqus FE Look & Feel)

This folder is a drop-in design kit that gives a new React/Next + Tailwind project the same look & feel as Foqus FE.

What’s included
- Tailwind config with tokens (colors, spacing, radius, typography)
- Global CSS with CSS variables and base styles
- `cn` utility
- Path alias example `tsconfig.json`
- Dependencies list and install commands
- (Next steps) Atoms & Molecules scaffold

How to integrate
1) Install dependencies
   See `deps.md` and run the install commands.

2) Tailwind setup
   - Copy `design-kit/tailwind.config.js` to your project root or merge into existing.
   - Ensure `content` globs include your source files.
   - Add plugin `tailwindcss-animate`.

3) Global styles
   - Copy `design-kit/src/pages/globals.css` to your app’s global stylesheet location and import it once (e.g., in `_app.tsx` or `app/layout.tsx`).

4) Utilities
   - Copy `design-kit/src/lib/utils.ts` to `src/lib/utils.ts` and import `cn` from `@/lib/utils`.

5) Path aliases
   - Merge `design-kit/tsconfig.json` `baseUrl` and `paths` into your project `tsconfig.json`.

6) Verify
   - Start the dev server and verify background/text colors match.
   - Use Tailwind classes like `bg-fill-base-1`, `text-text-base-primary`, `rounded-[15px]`, `gap-sm`, `p-md`.

Next steps (atoms & molecules)
- We will provide `src/newComponents/atoms` and `src/newComponents/molecules` next so you can import components like `Button`, `Card`, `Dialog`, `Select`, `Tooltip`, and `DataTable`.


