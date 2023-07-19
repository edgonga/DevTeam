# 🦋 To do app

⚡ Project built with Typescript and Node.js using Test Driven Development (TDD) practices.

🚀 Frontend construct with React

### 📥 Installation

To get started with this template, you first need to clone the repository:

```bash
git clone https://github.com/edgonga/DevTeam
```

Then, install the project dependencies:

```bash
npm install
```

### 🏁 How To Start

To start the server in development mode, run the following script:
```bash
npm run dev
```
Then, open http://localhost:8000 to access the server.


### 🚀 Production

To run the server in production mode, first build the TypeScript code into JavaScript by running:

```bash
npm run build
```

This will generate the dist directory with the compiled JavaScript files.

Then, start the server by running:

```bash
npm start
```

This will start the server and make it available at http://localhost:3000.

** Take note that the last command should be launched inside src/frontend folder.


### 🏗️ Scripts
This project comes with several predefined scripts in the package.json file:

```test```: Runs tests using Jest.

```lint```: Runs ESLint to check code quality.

```lint:fix```: Runs ESLint to fix code style issues.

```dev```: Starts the development server with ts-node-dev and allows debugging

```build```: Removes the ./dist folder and compiles the TypeScript code into JavaScript in the ./dist folder.

```start```: Starts the server in production using the compiled files in the dist/ folder.

### 📝 Dependencies

- cors: middleware for handling Cross-Origin Resource Sharing (CORS)

- date-fns: to work with date data

- dotenv: loads environment variables from a .env file

- express: web framework for Node.js

- express-promise-router: promise-based router for Express

- helmet: middleware for adding security headers

- luxon: library to set the correct timezone

- moment-timezone: similar to luxon

- mongodb: driver for MongoDB

- mysql2: MySQL client for Node.js

- sequelize: ORM (Object Relational Mapper) to work with MySQL

### 🛠️ Dev Dependencies

- @types/cors: TypeScript definitions for cors

- @types/express: TypeScript definitions for express

- @types/jest: TypeScript definitions for jest

- @types/luxon: Typescript definitions for luxon

- @types/mysql: TypeScript definitions for mysql

- @types/uuid: TypeScript definitions for creating identificators

- eslint: linter for TypeScript

- eslint-config-codely: ESLint configuration used by CodelyTV

- mysql: MySQL driver for Node.js

- node-json-db: db client for json

- rimraf: cross-platform tool for removing files and directories

- ts-jest: TypeScript preprocessor for Jest

- ts-node-dev: TypeScript execution and development environment for Node.js

- tsc-watch: TypeScript compiler with file watching

- uuid: to implement safer identificators

### 🗂️ Folder structure

In this folder structure, the code is organized according to the principles of Hexagonal Architecture. 

```
📦backend
 ┣ 📂dependencies
 ┃ ┣ 📜DateGenerator.ts
 ┃ ┗ 📜IDGenerator.ts
 ┣ 📂node-express
 ┃ ┣ 📜App.ts
 ┃ ┣ 📜server.start.ts
 ┃ ┗ 📜Server.ts
 ┣ 📂task
 ┃ ┣ 📂application
 ┃ ┃ ┗ 📂use-cases
 ┃ ┃ ┃ ┣ 📜CreateTask.ts
 ┃ ┃ ┃ ┣ 📜DeleteTask.ts
 ┃ ┃ ┃ ┣ 📜FindTask.ts
 ┃ ┃ ┃ ┣ 📜GetAllTask.ts
 ┃ ┃ ┃ ┗ 📜UpdateTask.ts
 ┃ ┣ 📂domain
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┗ 📜Task.ts
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜TaskRepository.ts
 ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┗ 📜ITaskService.ts
 ┃ ┃ ┗ 📂value-object
 ┃ ┃ ┃ ┗ 📜Status.ts
 ┃ ┗ 📂infrastructure
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┣ 📜CreateTaskController.ts
 ┃ ┃ ┃ ┣ 📜DeleteTaskController.ts
 ┃ ┃ ┃ ┣ 📜FindTaskController.ts
 ┃ ┃ ┃ ┣ 📜GetAllTaskController.ts
 ┃ ┃ ┃ ┗ 📜UpdateTaskController.ts
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┣ 📜TaskInMemoryRepository.ts
 ┃ ┃ ┃ ┣ 📜TaskJsonRepository.ts
 ┃ ┃ ┃ ┣ 📜TaskMongoDBRepository.ts
 ┃ ┃ ┃ ┗ 📜TaskSQLRepository.ts
 ┃ ┃ ┗ 📂routers
 ┃ ┃ ┃ ┗ 📜TaskRouter.ts
 ┗ 📂user
 ┃ ┣ 📂application
 ┃ ┃ ┗ 📂use-cases
 ┃ ┃ ┃ ┣ 📜CreateUser.ts
 ┃ ┃ ┃ ┗ 📜GetAllUsers.ts
 ┃ ┣ 📂domain
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┗ 📜User.ts
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜UserRepository.ts
 ┃ ┃ ┗ 📂value-objects
 ┃ ┃ ┃ ┣ 📜Name.ts
 ┃ ┃ ┃ ┗ 📜Password.ts
 ┃ ┗ 📂infrastructure
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┣ 📜CreateUserController.ts
 ┃ ┃ ┃ ┗ 📜GetAllUsersController.ts
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┣ 📜UserInMemoryRepository.ts
 ┃ ┃ ┃ ┣ 📜UserMongoDBRespository.ts
 ┃ ┃ ┃ ┗ 📜UserSQLRespository.ts
 ┃ ┃ ┗ 📂routers
 ┃ ┃ ┃ ┗ 📜UserRouter.ts
```



