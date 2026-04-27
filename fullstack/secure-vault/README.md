# SecureVault Explorer

SecureVault Explorer is a React + Vite file explorer demo with:

- folder/file tree navigation
- keyboard navigation (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Enter`)
- search with inline clear action
- breadcrumb path navigation
- file metadata panel
- custom icon mapping using Material Theme SVG assets
- Tailwind CSS v4 styling with semantic theme tokens

## Figma Prototype

- [Secure Vault Explorer Prototype](https://www.figma.com/design/Vios91f2DbkH7vzjmbE1mP/Secure-Vault-Explorer?node-id=0-1&t=Bl6tDOiKN3nNc9VF-1)

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- ESLint 10

## Project Structure

- `src/App.jsx` - app state and orchestration
- `src/components/` - UI components (`Navbar`, `SidebarPanel`, `MainPanel`, `TreeNode`, etc.)
- `src/data/data.json` - file tree data source
- `src/utils/treeUtils.js` - tree helpers (filtering, flattening, lookup maps)
- `src/assets/icons/material/` - local SVG icons used in the tree
- `src/index.css` - Tailwind import + theme tokens

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
