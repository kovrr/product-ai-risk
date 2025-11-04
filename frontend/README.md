# AIKovrr Frontend - React Application

Modern React frontend for the AIKovrr AI governance platform with Kovrr design system.

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library
- **Headless UI** - Unstyled accessible components

## Kovrr Design System

### Colors
- **Primary**: `#5E5694` (Purple)
- **Secondary**: `#00A3E0` (Blue)
- **Success**: `#28A745`
- **Warning**: `#FFC107`
- **Error**: `#DC3545`
- **Info**: `#17A2B8`

### Typography
- **Font Family**: Source Sans Pro
- **Sizes**: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px

### Spacing Scale
- 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

## Setup

### 1. Install Dependencies

```bash
cd /Users/liransorani/CascadeProjects/aikovrr/frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API service layer
│   ├── utils/          # Utility functions
│   ├── styles/         # Additional styles
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles + Tailwind
├── public/             # Static assets
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## Main Screens

1. **Login** - Authentication screen
2. **Dashboard** - Main overview with metrics
3. **Assets Visibility** - AI asset inventory
4. **Risk Register** - Risk scenarios management
5. **Quantification Board** - Risk quantification
6. **Third-Party AI Supply Chain** - Vendor management
7. **Controls Maturity** - Compliance gaps
8. **Self-Assessment** - Compliance tasks

## API Integration

The frontend connects to the Django backend at `http://localhost:8000/api/`

### Endpoints
- `/api/auth/login/` - Login
- `/api/auth/me/` - Current user
- `/api/visibility/assets/` - AI Assets
- `/api/risk/scenarios/` - Risk Scenarios
- `/api/governance/tasks/` - Self-assessment tasks

## Development Notes

- Uses session-based authentication
- CORS enabled for localhost:5173
- Tailwind CSS warnings in IDE are normal (Tailwind directives)
- Hot module replacement (HMR) enabled
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
