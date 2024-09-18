# Express TS Server

This is a TypeScript-based Express server skeleton that can be used as a starting point for new projects. It includes basic middleware setup, routing, and error handling.

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
express-ts-server/
├── node_modules/
├── dist/
├── src/
│ ├── app.ts
│ ├── bin/
│ │ └── www.ts
│ ├── routes/
│ │ ├── index.ts
│ │ └── users.ts
│ ├── types/
├── .gitignore
├── package.json
├── tsconfig.json
├── package-lock.json
├── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/BradleyParkerDev/express-ts-server.git
    cd express-ts-server
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Create a `.env` file in the root directory and add your environment variables. For example:**

    ```env
    PORT=3000
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
- **http-errors**: Create HTTP errors for Express
- **morgan**: HTTP request logger middleware
- **nodemon**: Tool to automatically restart the server on file changes
- **rimraf**: A deep deletion module for node (like rm -rf)

## Dev Dependencies

- **@types/cookie-parser**: TypeScript definitions for cookie-parser
- **@types/cors**: TypeScript definitions for cors
- **@types/debug**: TypeScript definitions for debug
- **@types/dotenv**: TypeScript definitions for dotenv
- **@types/express**: TypeScript definitions for Express
- **@types/morgan**: TypeScript definitions for morgan
- **@types/node**: TypeScript definitions for Node.js
- **typescript**: TypeScript language

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or new features you would like to add.

## License

This project is licensed under the ISC License.

