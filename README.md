# Express Server

This is a TypeScript-based Express server skeleton that can be used as a starting point for new projects. It includes a basic middleware setup, routing, linting, testing, and error handling.

## Overview

This server is built with TypeScript and Express, providing a robust and scalable structure for building RESTful APIs. It includes essential middleware for parsing cookies, handling CORS, logging HTTP requests, and managing errors. The project is configured with ESLint and Prettier for consistent code quality and formatting, and Vitest for unit testing.

## Features

- TypeScript for type safety and enhanced developer experience
- Basic middleware setup (cookie parser, CORS, structured logging with Winston)
- Environment variable configuration with `dotenv`
- Error handling and graceful shutdown support
- **Linting** with ESLint and Prettier
- **Testing** with Vitest and Supertest
- Development and production scripts for streamlined workflow

## Project Structure
```
express-server/
├── dist/                   # Compiled JavaScript output from TypeScript
├── logs/                   # Log output directory
├── node_modules/           # Installed npm dependencies
├── src/                    # Source TypeScript code
│   ├── bin/                # Entry point for the server
│   │   └── www.ts          # Script that starts the Express server
│   ├── lib/                # Utility modules (e.g., logger, server utils)
│   ├── routes/             # Route handlers for HTTP endpoints
│   ├── types/              # Custom TypeScript types and environment declarations
│   │   └── env.d.ts
│   └── app.ts              # Main app config (middleware, routes, error handling)
├── tests/                  # Vitest test files
├── .env                    # Local environment variables (not committed)
├── .gitignore              # Git ignore rules
├── .prettierignore         # Files/directories ignored by Prettier
├── .prettierrc             # Prettier configuration
├── eslint.config.mjs       # ESLint configuration (ES module format)
├── examlple.env            # Example `.env` file (typo: should be `example.env`)
├── package.json            # Project metadata, scripts, dependencies
├── package-lock.json       # Exact versions of installed npm packages
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript compiler configuration
```

## Getting Started

### Prerequisites

- Node.js (v22.13.1 or higher)
- npm (11.1.0 or higher)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/BradleyParkerDev/express-server.git
    cd express-server
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Create a `.env` file in the root directory and add your environment variables. For example:**

    ```env
    PORT=3001
    ```

4. **Build the project:**

    ```sh
    npm run build
    ```

5. **Run the server in development mode with hot-reloading:**

    ```sh
    npm run dev
    ```

6. **Run the server in production mode:**

    ```sh
    npm start
    ```

## Available Scripts

| Script             | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `npm run clean`    | Removes the `dist` and `logs` directories using `rimraf`.                  |
| `npm run build`    | Runs `clean` and then compiles TypeScript source files into `dist`.        |
| `npm run start`    | Runs the compiled server from `dist/bin/www.js`. Intended for production.  |
| `npm run dev`      | Runs the TypeScript compiler in watch mode and restarts the server on changes using `concurrently` and `nodemon`. |
| `npm run lint`     | Lints all `.ts` and `.tsx` files in the `src/` directory using ESLint.     |
| `npm run lint:fix` | Runs the linter and automatically fixes fixable issues.                    |
| `npm run test`     | Runs all unit tests once using Vitest.                                     |
| `npm run test:watch` | Runs Vitest in watch mode, re-running tests on file changes.             |
| `npm run format`   | Formats the entire codebase using Prettier.                                |

## Dependencies

- **concurrently**: Run multiple commands concurrently (e.g., `tsc -w` and `nodemon`)
- **cookie-parser**: Middleware for parsing cookies in Express
- **cors**: Middleware to enable Cross-Origin Resource Sharing
- **debug**: A tiny debugging utility
- **dotenv**: Loads environment variables from a `.env` file into `process.env`
- **express**: Fast, unopinionated, minimalist web framework for Node.js
- **http-errors**: Create HTTP errors with expressive messages for Express
- **nodemon**: Automatically restarts the server on file changes (used in development)
- **rimraf**: A deep deletion module for node (like `rm -rf`)
- **winston**: Versatile logging library for structured logging in applications

## Dev Dependencies

- **@types/cookie-parser**: TypeScript definitions for `cookie-parser`
- **@types/cors**: TypeScript definitions for `cors`
- **@types/debug**: TypeScript definitions for `debug`
- **@types/express**: TypeScript definitions for `express`
- **@types/node**: TypeScript definitions for Node.js built-ins
- **@typescript-eslint/eslint-plugin**: ESLint rules for TypeScript code
- **@typescript-eslint/parser**: Parser that allows ESLint to lint TypeScript code
- **eslint**: Linting utility for JavaScript and TypeScript
- **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier
- **eslint-import-resolver-typescript**: Resolves TypeScript paths for import linting
- **eslint-plugin-import**: ESLint rules for import/export syntax
- **eslint-plugin-prettier**: Runs Prettier as an ESLint rule
- **prettier**: Code formatter for consistent style
- **supertest**: HTTP assertions and testing utility for Express endpoints
- **typescript**: TypeScript language and compiler
- **vitest**: Blazing fast unit testing framework (used for testing your code)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or new features you would like to add.

## License

This project is open for personal and educational use. No specific license applies.
