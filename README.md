# Login and Registration API

This project is a practice implementation of user authentication using Node.js, Express, and MongoDB.

It includes:

- User registration.
- User login.
- JWT token generation.
- Protected routes middleware.

> ⚠️ Note: This project can be expanded in the future.

---

## How to Run

1. Clone the repository:

```bash
git clone <repo-url>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and define all environment variables used in `./config/env.js`.
   Example:

```
PORT=8080
ACCESS_JWT_SECRET=YOUR_SECRET_KEY
```

> Ensure to replace value with your own secure configuration.

4. Start the application:

```bash
npm run dev
```

---

## Postman Collection

Test the API directly using Postman through the following badge:

(https://www.postman.com/abrar203/nodejs-app/collection/psrfucy/nodejs-app?action=share&creator=32615186)

> If requests require variables such as `{{auth-token}}`, create a Postman Environment with dummy values for testing.
