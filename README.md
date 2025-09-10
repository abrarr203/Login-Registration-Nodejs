# Login and Registration

This is a practice project to learn how to implement user authentication with Node.js, Express, and MongoDB.
It includes:

- User registration.
- User login.
- JWT token generation.
- Protected routes middleware.

> ⚠️ Note: This project can be expanded in the future.

## How to Run

1. Clone the project:

```bash
git clone <repo-url>
```

2. Install Dependencies:

```bash
npm i
```

3. Create .env file in the root of the project then define all the environment variables used in './config/env.js'.
   For example:
   PORT=8080
   JWT_SECURE=YOUR_SECRET_KEY

   > Make sure to replace the value with your own configuration.

4. Start the app:

```bash
npm run dev
```

Routes

/// Authentication Routes ///

1. /api/v1/auth/sign-up POST {fullname, username, email, password, confirmPassword}
2. /api/v1/auth/sign-in POST {email/username, password}
3. /api/v1/auth/log-out POST {-}

/// Google Authentication Routes ///

1. /api/v1/auth/google/ GET Redirect user to google OAuth login page
2. /api/v1/auth/google/callback GET Receives google response, create jwt, and return token

/// User Routes ///

1. /api/v1/users/ GET {-}
2. /api/v1/users/profile/:id GET {-}
3. /api/v1/users/:id DELETE {user ID}
4. /api/v1/users/profile/:id PUT {user ID}
