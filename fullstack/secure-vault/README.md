# SecureVault Explorer

SecureVault Explorer is a React + Vite file explorer for navigating nested vault folders without page reloads. It targets a dark, precise “secure operations” aesthetic using Tailwind CSS v4 semantic tokens and custom-built UI (no Bootstrap, Material UI, Chakra UI, or Ant Design).

## Features

- Recursive folder/file tree from `src/data/data.json`
- Expand/collapse folders; arbitrary nesting depth
- File selection with distinct visual states and a properties panel (name, extension, size)
- Search with clear control, match highlighting, and automatic expansion of folders that contain matches
- **Breadcrumb path navigation** (jump to any ancestor in one click)
- Keyboard navigation from anywhere except text fields (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Enter`)
- Status bar summary for vault-wide context

## Figma design

- [Secure Vault Explorer screens](https://www.figma.com/design/Vios91f2DbkH7vzjmbE1mP/Secure-Vault-Explorer?node-id=0-1)
- [Design System page](https://www.figma.com/design/Vios91f2DbkH7vzjmbE1mP/Secure-Vault-Explorer?node-id=9-2)

## Recursive strategy

The JSON tree is an array of nodes (`folder` with `children`, `file` with optional `size`). Rendering is **recursive**:

- `FileTree` maps each root node to `TreeNode`.
- Each `TreeNode` renders its row and, when the folder is expanded, maps `children` to new `TreeNode` instances with `depth + 1`. Indentation uses `depth`, so depth is structural only, performance stays predictable for deep trees.

Supporting logic stays outside render-heavy paths:

- **`buildLookupMaps`** walks the tree once and fills `byId`, `pathById` (breadcrumb/extra UI), and `parentById` (keyboard parent jumps).
- **`flattenVisibleNodes`** walks the visible subtree in screen order using `expandedIds`, producing the list used for Up/Down navigation.
- **`filterTree`** (search) returns a pruned tree plus **`autoExpanded`** ancestor IDs so matches deep in the hierarchy stay visible; those IDs merge with manually toggled expansion.

This splits **presentation** (recursive components), **navigation order** (flatten), and **search projection** (filtered tree + auto-expand).

## Wildcard feature: breadcrumb navigation

**Gap addressed:** Deep vaults force repeated collapsing and scrolling to reach a parent or sibling branch, a pain for auditors and paralegals jumping between matters.

**What we shipped:** A **breadcrumb** built from `pathById` for the active item (selection or keyboard focus). Each segment is a control that focuses that node, expands along the path, and for files opens selection, so users can “pop up” many levels without manual tree gymnastics.

**Why it matters for SecureVault:** Faster orientation in large hierarchies reduces mis-clicks on similarly named files and shortens review sessions, which maps directly to client trust and billable efficiency in legal and financial workflows.

## Keyboard navigation

Explorer keys are handled at the **document** level when focus is **not** in a text field (`input`, `textarea`, `select`) or `contenteditable`, so arrow keys work without first tabbing into the tree. Search remains typeable without the tree stealing arrow keys.

## Tech stack

- React 19
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- ESLint 10

**Icons:** Files under `src/assets/icons/material/` are **local SVG assets** (From Material Theme Icons). They are imported as static URLs. This project does **not** use Material UI or other third-party component libraries.

## Project structure

- `src/App.jsx`: state (`useReducer`), lookup maps, search + expand merge, keyboard routing
- `src/components/`: UI (`Navbar`, `SidebarPanel`, `MainPanel`, `FileTree`, `TreeNode`, etc.)
- `src/data/data.json`: vault tree source
- `src/utils/treeUtils.js`: `getExtension`, maps, filter, flatten
- `src/index.css`: Tailwind import + theme tokens

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: start development server
- `npm run build`: production build
- `npm run preview`: preview production build
- `npm run lint`: run ESLint
