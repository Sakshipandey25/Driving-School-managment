# JWT Login + Profile API

A beginner-friendly REST API built with **Node.js, Express.js, MongoDB,
and JWT**. It supports user registration, login, and a protected profile
endpoint.

## Features

-   Register a new user
-   Hash passwords with `bcryptjs`
-   Login with email and password
-   Generate a JWT token after successful login
-   Protect the profile route with Bearer-token authentication
-   Store user details in MongoDB

## Tech Stack

-   Node.js and Express.js
-   MongoDB and Mongoose
-   JSON Web Token (`jsonwebtoken`)
-   `bcryptjs` and `dotenv`

## Project Structure

``` text
jwt-profile-api/
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── userModel.js
├── routes/
│   └── authRoutes.js
├── .env
├── package.json
└── server.js
```

## Requirements

-   [Node.js](https://nodejs.org/)
-   MongoDB running locally, or a MongoDB connection URI

## Setup and Run

1.  Download or clone this repository.

2.  Open a terminal in the project folder.

3.  Install dependencies:

    ``` bash
    npm install
    ```

4.  Check the `.env` file and set your environment variables:

    ``` env
    PORT=3000
    MONGO_URL=mongodb://127.0.0.1:27017/jwt_profile_db
    JWT_SECRET=replace_this_with_a_long_random_secret
    ```

5.  Make sure MongoDB is running, then start the server:

    ``` bash
    npm run dev
    ```

    Or use `npm start`.

The API runs at `http://localhost:3000` after the database connects.

## API Endpoints

Base URL: `http://localhost:3000/api/auth`

  -----------------------------------------------------------------------
  Method            Endpoint          Description       Authentication
  ----------------- ----------------- ----------------- -----------------
  POST              `/register`       Register a user   Not required

  POST              `/login`          Login and receive Not required
                                      a JWT             

  GET               `/profile`        Get the logged-in Bearer token
                                      user's profile    required
  -----------------------------------------------------------------------

### 1. Register a User

**Endpoint:** `POST /api/auth/register`

JSON body:

``` json
{
  "name": "Riya",
  "email": "riya@example.com",
  "password": "123456"
}
```

On success, the API returns the user's basic details. The password is
stored as a hash rather than plain text.

### 2. Login

**Endpoint:** `POST /api/auth/login`

JSON body:

``` json
{
  "email": "riya@example.com",
  "password": "123456"
}
```

On success, the API returns a JWT token. Copy this token to access the
profile endpoint.

### 3. Get Profile

**Endpoint:** `GET /api/auth/profile`

In Postman: 1. Enter `http://localhost:3000/api/auth/profile` and select
**GET**. 2. Open the **Authorization** tab. 3. Select **Bearer Token**.
4. Paste the token received from login. 5. Click **Send**.

The response contains the user's profile details without the password.

## Testing with Postman

Test the endpoints in this order: 1. Register a user. 2. Log in using
the same email and password. 3. Copy the JWT token from the response. 4.
Request the profile endpoint using that token.

## Security Notes

-   Do not publish real secrets or production database credentials on
    GitHub.
-   Replace the sample `JWT_SECRET` with a long, random secret.
-   Add `.env` to `.gitignore` before publishing. If needed, provide an
    `.env.example` file with placeholder values.
-   Use a strong password outside local learning/testing.

## Learning Purpose

This project is for learning REST APIs, Express routing,
MongoDB/Mongoose, password hashing, JWT authentication, middleware, and
API testing with Postman.
