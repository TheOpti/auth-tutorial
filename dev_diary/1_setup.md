# 📓 Dev Diary: Monorepo Architecture Setup

## 🎯 Overview

The goal was to set up a scalable monorepo for a full-stack application. By keeping the frontend and backend in a single repository, I can manage shared logic, streamline dependency updates, and simplify the local development environment.

## 🏗️ The Architecture: npm Workspaces
I chose npm Workspaces as the primary orchestration layer. It provides a native way to manage multiple packages within a single root project.
Folder Structure

```
my-monorepo/
├── apps/
│   ├── frontend/        # React + Vite (TS)
│   └── backend/         # Node + Express (TS)
├── package.json         # Root config & workspaces definition
└── package-lock.json    # Single source of truth for dependencies
```

## Key Benefits Realized
- **Hoisting**: All dependencies are hoisted to the root node_modules. This ensures a single lockfile, reducing disk space and preventing version conflicts between the frontend and backend.
- **Orchestration**: Used concurrently in the root package.json to launch both development servers with a single command: npm run dev.

## 🚀 Implementation Steps
1. Workspace Initialization: Defined "workspaces": ["apps/*"] in the root package.json.
1. Frontend Setup: Scaffolded a Vite React-TS project within apps/frontend.
1. Backend Setup: 
   * Initialized a Node.js project in apps/backend.
   * Configured tsconfig.json for ESM (ECMAScript Modules) support.
   * Created a Hello World Express entry point at src/index.ts.
1. Dev Runner: Integrated tsx in the backend to allow real-time code updates during development.

## 💡 Lessons Learned & Troubleshooting

- **Missing Lifecycle Scripts**: Encountered an error where npm run dev failed because the backend workspace lacked a dev script. I learned that root scripts targeting workspaces (using -w) require the child package.json to have an identical script name defined.

- **Module System**: Configured "type": "module" in the backend to align with modern JavaScript standards, ensuring compatibility with Vite's ecosystem.


## To read more in the future

- [Managing Dependencies with NPM and Yarn Workspaces](https://blog.pixelfreestudio.com/managing-dependencies-with-npm-and-yarn-workspaces/)