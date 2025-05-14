# Express Server

This is a TypeScript-based Express server skeleton that can be used as a starting point for new projects. It includes a basic middleware setup, routing, and error handling.

## Overview

This server is built with TypeScript and Express, providing a robust and scalable structure for building RESTful APIs. It includes essential middleware for parsing cookies, handling CORS, logging HTTP requests, and managing errors. The server also supports environment variable configuration using `dotenv`.

## Features

- TypeScript for type safety and better development experience
- Basic middleware setup (cookie parser, CORS, logging)
- Environment variable configuration with `dotenv`
- Error handling
- Development and production scripts

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

## Dependencies

- **concurrently**: Run multiple commands concurrently
- **cookie-parser**: Middleware to parse cookies
- **cors**: Middleware to enable CORS
- **debug**: A tiny debugging utility
- **dotenv**: Loads environment variables from a `.env` file into `process.env`
- **express**: Web framework for Node.js
- **http-errors**: Creates HTTP errors for Express
- **winston**: Logging library for structured application logging
- **nodemon**: Tool to automatically restart the server on file changes
- **rimraf**: A deep deletion module for node (like rm -rf)

## Dev Dependencies

- **@types/cookie-parser**: TypeScript definitions for cookie-parser
- **@types/cors**: TypeScript definitions for cors
- **@types/debug**: TypeScript definitions for debug
- **@types/dotenv**: TypeScript definitions for dotenv
- **@types/express**: TypeScript definitions for Express
- **@types/node**: TypeScript definitions for Node.js
- **typescript**: TypeScript language

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or new features you would like to add.

## License

This project is open for personal and educational use. No specific license applies.
