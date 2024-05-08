# Forum fullstack nodejs backend

The application functions as a forum-blog, you can publish some posts, leave comments and set likes. 

---

# Installing

## Prerequisites

Before you begin, ensure you have Node.js version 18.16.0 or later installed on your machine.

## Getting Started

To get started with the project, you need to install all dependencies:

  ```bash
  npm install
  ```

## Environment Configuration

The repository includes an `.env.example` file. You should create the following environment files:

- `.env`: Default environment for new scripts

You can use the `.env.example` file as a template.

PORT - Integer: Port for running server
DB_URI - String: Connection string to DB
DB_NAME - String: DB name
JWT_SECRET - String: Secret word for jwt
SHA256_SECRET - String: Secret word for hashing
CORS_ORIGIN - String: Link to frontend

## Running the Application

To run the application, use the following commands:

- **Development**:

  ```bash
  npm run dev
  ```

- **Production**:

  ```bash
  npm start
  ```

Once the application is running, you can access it via `http://localhost:8080/`.