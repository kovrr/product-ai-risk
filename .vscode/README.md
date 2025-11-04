# VS Code Configuration for AIKovrr

This folder contains VS Code workspace configuration for debugging and development.

## Files

### `launch.json` - Debug Configurations

**Available Debug Configurations:**

1. **Django: Backend Server** - Start Django development server with debugging
   - Runs on port 8000
   - Enables Django-specific debugging features
   - Sets breakpoints in Python code

2. **Django: Current File** - Debug the currently open Python file
   - Useful for testing individual modules

3. **Python: Attach to Django** - Attach debugger to running Django process
   - Requires Django to be started with debugpy on port 5678

4. **Django: Run Tests** - Run Django unit tests with debugging
   - Uses `--keepdb` flag for faster test runs

5. **Django: Migrations** - Debug migration creation
   - Useful when troubleshooting migration issues

6. **Django: Shell** - Launch Django shell with debugger
   - Interactive Python shell with Django context

**Compound Configuration:**

- **Full Stack: Django + React** - Starts both backend and frontend
  - Launches Django debugger
  - Starts React dev server in background (via preLaunchTask)

### `tasks.json` - Build Tasks

**Available Tasks:**

- **Start React Dev Server** - Launches Vite dev server (port 5173)
- **Stop React Dev Server** - Kills the Vite process
- **Install Backend Dependencies** - Runs `pip install -r requirements.txt`
- **Install Frontend Dependencies** - Runs `npm install`
- **Django: Run Migrations** - Applies database migrations
- **Django: Create Superuser** - Interactive superuser creation
- **Database: Import Schema** - Imports PostgreSQL schema
- **Database: Import Data** - Imports demo data

### `settings.json` - Workspace Settings

**Python Settings:**
- Python 3.9 as default interpreter
- Black formatter with 88 character line length
- Flake8 linting enabled
- Auto-format on save
- Auto-organize imports on save

**JavaScript/React Settings:**
- Prettier formatter
- 2-space indentation
- Format on save
- Emmet for JSX
- TailwindCSS IntelliSense

**File Exclusions:**
- `__pycache__`, `*.pyc` (Python cache)
- `node_modules` (npm packages)
- `.DS_Store` (macOS files)

## Usage

### Starting Full Stack Development

**Option 1: Using Compound Configuration**
1. Press `F5` or `Cmd+Shift+D` to open Run and Debug
2. Select "Full Stack: Django + React" from dropdown
3. Click the green play button

This will:
- Start React dev server (http://localhost:5173)
- Start Django with debugger (http://localhost:8000)

**Option 2: Manual Start**
1. Run task: `Start React Dev Server` (Cmd+Shift+P → Tasks: Run Task)
2. Start debug: `Django: Backend Server` (F5)

### Setting Breakpoints

1. Open any Python file (e.g., `backend/core/views.py`)
2. Click in the gutter (left of line numbers) to set breakpoint
3. Start debugging
4. Trigger the code path (e.g., login via frontend)
5. Debugger will pause at breakpoint

### Debugging Tips

**Backend:**
- Set breakpoints in views, models, serializers
- Inspect request/response objects
- Step through authentication logic
- View database queries in debug console

**Frontend:**
- Use browser DevTools (F12) for React debugging
- React DevTools extension recommended
- Console logs visible in browser

### Running Tasks

**Via Command Palette:**
1. Press `Cmd+Shift+P`
2. Type "Tasks: Run Task"
3. Select desired task

**Via Terminal:**
- Tasks run in integrated terminal
- Output visible in Terminal panel

## Requirements

**VS Code Extensions:**
- Python (ms-python.python)
- Pylance (ms-python.vscode-pylance)
- Python Debugger (ms-python.debugpy)
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)

**System Requirements:**
- Python 3.9
- Node.js & npm
- PostgreSQL

## Troubleshooting

**Django won't start:**
- Check PostgreSQL is running
- Verify database exists: `psql -l | grep aikovrr`
- Check port 8000 is not in use: `lsof -i :8000`

**React won't start:**
- Check port 5173 is not in use: `lsof -i :5173`
- Run `npm install` in frontend folder
- Clear cache: `rm -rf node_modules/.vite`

**Debugger not hitting breakpoints:**
- Ensure "justMyCode" is set to false
- Check breakpoint is in executed code path
- Verify Django is started via debugger (not terminal)

**Import errors:**
- Check `python.analysis.extraPaths` includes backend folder
- Reload VS Code window: `Cmd+Shift+P` → "Reload Window"
