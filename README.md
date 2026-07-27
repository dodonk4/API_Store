# API Store

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" />
</p>

A RESTful API built with **Node.js**, **Express**, **TypeScript**, and **Prisma ORM** for managing an online store.

The project provides JWT authentication, role-based authorization, input validation with Zod, interactive Swagger documentation, automated integration tests, and a layered architecture designed for scalability and maintainability.

---

## 🚀 Live Demo

### API

https://api-store-qfw2.onrender.com/

or

https://p01--api-store--2fq8y7qx5g86.code.run/

### Swagger Documentation

https://api-store-qfw2.onrender.com/docs

or

https://p01--api-store--2fq8y7qx5g86.code.run/docs

---

## 📷 Preview

![alt text](image.png)

---

## ✨ Features

- JWT authentication using Access Token and Refresh Token.
- Role-based authorization.
- User management.
- Product management.
- Order management.
- Order-product relationship management.
- Request validation with Zod.
- Centralized error handling.
- PostgreSQL database with Prisma ORM.
- Interactive API documentation with Swagger UI.
- Integration tests using Jest and Supertest.
- Docker support.
- GitHub Actions CI.

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| TypeScript | Main programming language |
| PostgreSQL | Relational database |
| Prisma ORM | Database access |
| Zod | Request validation |
| JWT | Authentication |
| Swagger | API documentation |
| Jest | Testing |
| Supertest | Integration testing |
| Docker | Containerization |
| GitHub Actions | Continuous Integration |

---

## 📂 Project Structure

```text
src/
├── config/
├── controllers/
├── docs/
├── errors/
├── interfaces/
├── lib/
├── middlewares/
├── routes/
├── schemas/
├── services/
├── types/
└── utils/
```

The project follows a **layered architecture**, separating routing, business logic, validation, and infrastructure concerns to improve maintainability and scalability.

---

## ⚙️ Getting Started

### Clone the repository

```bash
git clone https://github.com/dodonk4/API_Store.git

cd API_Store
```

### Install dependencies

```bash
npm install
```

## 🔧 Environment Variables

Create a `.env.development` file in the project root with the following variables:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api_store_dev"

AUTH_SECRET="your_jwt_access_token_secret"
AUTH_SECRET_EXPIRES_IN="15m"

AUTH_REFRESH_SECRET="your_jwt_refresh_token_secret"
AUTH_REFRESH_SECRET_EXPIRES_IN="24h"

PORT=3000
```

The project also supports dedicated environment files for testing and production:

- `.env.test`
- `.env.production`

These files allow each environment to use its own database and configuration.

## 🐳 Running with Docker

Clone the repository:

```bash
git clone https://github.com/dodonk4/API_Store.git
cd API_Store
```

Build and start all services:

```bash
docker compose up --build
```

Once the containers are running, the API will be available at:

```
http://localhost:3000
```

Swagger UI:

```
http://localhost:3000/docs
```

Docker Compose automatically starts:

- PostgreSQL
- API Store

> **Note:** Make sure Docker Desktop (or Docker Engine) is running before executing the command.

## 🗄 Database

Run the database migrations:

```bash
npm run migrate:dev
```

Populate the database with seed data:

```bash
npm run seed:dev
```

Prisma ORM is used for database access and schema management.

The project includes separate databases for development and testing to prevent test execution from affecting development data.

## 📖 API Documentation

Interactive API documentation is available through Swagger UI.

### Local

```
http://localhost:3000/docs
```

### Production

```
https://api-store-qfw2.onrender.com/docs

or

https://p01--api-store--2fq8y7qx5g86.code.run/
```

Swagger allows you to:

- Explore every endpoint.
- Execute requests directly from the browser.
- Authenticate using JWT.
- View request and response schemas.
- Inspect HTTP status codes and error responses.

## 🧪 Running the Tests

Run all integration tests:

```bash
npm test
```

The project uses:

- **Jest** as the testing framework.
- **Supertest** for HTTP endpoint testing.
- **PostgreSQL** as an isolated test database.

Tests are executed against a dedicated database, ensuring that development data remains unaffected.

## 🔒 Security

The API implements several security mechanisms:

- JWT Access Token authentication.
- Refresh Token authentication using HttpOnly cookies.
- Role-based authorization.
- Password hashing with bcrypt.
- Request validation with Zod.
- Centralized error handling.
- Protected routes through authentication and authorization middlewares.

## 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more information.

## 👨‍💻 Author

**Ismael Madarieta**

GitHub: https://github.com/dodonk4

If you have any suggestions, feedback, or find an issue, feel free to open an Issue or submit a Pull Request.