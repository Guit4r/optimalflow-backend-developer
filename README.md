# OptimalFlow Backend Developer Exercise

This project is a backend API implementation for the OptimalFlow Backend Developer Exercise, using **Node.js** and **Express.js**. It satisfies all **Core Requirements**, including authentication, secure password handling, and user data storage using a local JSON file.

---

## Features (Core Requirements)

- `POST /users` – Create user with default balance of 100
- `POST /login` – Authenticate user and return JWT token
- `GET /users` – List all users (excluding passwords)
- `GET /users/:id` – Retrieve user by ID (excluding password)
- Passwords are securely hashed using **bcrypt**
- In-memory file-based storage using `users.json`
- Organized code structure: Controller / Service / Data Layer
- Included unit/integration tests using **Jest + Supertest**
- Postman collection and curl examples included
- Docker setup included (Dockerfile + optional docker-compose)

---

## Tech Stack

- Node.js + Express
- bcryptjs
- JWT (optional token generation)
- Local JSON file storage
- Jest + Supertest for testing

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Guit4r/optimalflow-backend-developer.git
cd optimalflow-backend-developer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file:
```env
PORT=3000
JWT_SECRET=your_jwt_secret
```

### 4. Run the server

```bash
npm run dev     # for development with nodemon
# or
npm start       # for production
```

---

## API Endpoints

### `POST /users`
```json
{
  "name": "test",
  "email": "test@example.com",
  "password": "12345678"
}
```

### `POST /login`
```json
{
  "email": "test@example.com",
  "password": "12345678"
}
```

### `GET /users`
Returns array of users without passwords

### `GET /users/:id`
Returns user by ID (excluding password)

---

## Running Tests

```bash
npm test
```

Tests include:
- User creation success and validation failure
- Fetching all users
- Fetching user by ID (success + 404)
- User login tests

---

## Example curl Requests

### Create User
```bash
curl -X POST http://localhost:3000/users   -H "Content-Type: application/json"   -d '{"name":"Test", "email":"test@example.com", "password":"12345678"}'
```

### Login
```bash
curl -X POST http://localhost:3000/login   -H "Content-Type: application/json"   -d '{"email":"test@example.com", "password":"12345678"}'
```

---

## Postman Collection

A ready-to-use Postman collection is included. You can import it via raw text or file.

---

## Project Structure

```
optimalflow-backend/
├── controllers/
├── data/
├── models/
├── routes/
├── services/
├── tests/
├── utils/
├── app.js
├── server.js
├── .env
└── README.md
```

---

## Notes!

- The `/transfer` endpoint and other advanced features (e.g., database, scaling document) are **not included**, focusing instead on clean and complete Core Requirement delivery.
- Bonus features such as Docker setup **are included** in this submission.

---

## Submission

Please contact me if you have any questions. Thank you for the opportunity.