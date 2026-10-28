# JWT Login + Profile API

A REST API project built with **Node.js, Express.js, MongoDB, Mongoose,
and JSON Web Token (JWT)**. This project demonstrates the basic
authentication flow used in many web applications: a user can register,
log in, receive a token, and use that token to access a protected
profile endpoint.

This project is suitable for beginners who want to understand backend
development, REST APIs, password hashing, authentication middleware,
database operations, and API testing with Postman.

------------------------------------------------------------------------

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Project Objectives](#project-objectives)
3.  [Features](#features)
4.  [Technologies Used](#technologies-used)
5.  [Project Folder Structure](#project-folder-structure)
6.  [How the API Works](#how-the-api-works)
7.  [Installation and Setup](#installation-and-setup)
8.  [Environment Variables](#environment-variables)
9.  [Running the Project](#running-the-project)
10. [API Endpoints](#api-endpoints)
11. [Testing with Postman](#testing-with-postman)
12. [Important Code Concepts](#important-code-concepts)
13. [Common Errors and Solutions](#common-errors-and-solutions)
14. [Security Notes](#security-notes)
15. [Future Improvements](#future-improvements)
16. [Author / Project Purpose](#author--project-purpose)

------------------------------------------------------------------------

## 1. Project Overview

The **JWT Login + Profile API** is a backend application that provides
user registration, login, and protected profile functionality.

When a new user registers, the API validates the submitted details and
stores the user in MongoDB. The password is hashed using `bcryptjs`
before it is saved, so the original plain-text password is not stored in
the database.

When the user logs in, the API checks the submitted email and password
against the stored user record. If the credentials are correct, the
server generates a JSON Web Token (JWT). The client can then send this
token to access the protected profile endpoint.

The API is built with Express.js, which handles HTTP requests and
routes. Mongoose is used to define the user schema and communicate with
MongoDB.

### Main workflow

``` text
User
 |
 | Register with name, email, password
 v
POST /api/auth/register
 |
 v
Validate data -> Hash password -> Save user in MongoDB
 |
 v
POST /api/auth/login
 |
 v
Verify email and password -> Generate JWT
 |
 v
GET /api/auth/profile + Bearer token
 |
 v
Verify JWT -> Fetch user profile -> Return profile data
```

------------------------------------------------------------------------

## 2. Project Objectives

The main objectives of this project are:

-   To understand how to create a REST API using Node.js and Express.js.
-   To connect a Node.js application with MongoDB using Mongoose.
-   To register a user and store their details in a database.
-   To hash passwords securely using `bcryptjs`.
-   To authenticate users with email and password.
-   To generate and verify JSON Web Tokens.
-   To protect routes with authentication middleware.
-   To test API endpoints using Postman.
-   To understand how different backend files work together.

------------------------------------------------------------------------

## 3. Features

### User Registration

A new user can register by providing their name, email address, and
password. The API checks the required fields and prevents registration
with an email address that is already registered.

### Password Hashing

Passwords are hashed before being stored in MongoDB. The application
uses `bcryptjs` for password hashing and comparison.

### User Login

A registered user can log in with their email and password. The API
compares the submitted password with the stored password hash.

### JWT Token Generation

After a successful login, the API creates a JWT token. This token is
used to prove that the user has authenticated successfully.

### Protected Profile Route

The profile endpoint requires a valid JWT token. If the token is
missing, invalid, or expired, the API returns an unauthorized response.

### MongoDB Integration

User information is stored in MongoDB using a Mongoose model.

### Postman Testing

The API can be tested with Postman without creating a frontend
application.

------------------------------------------------------------------------

## 4. Technologies Used

  -----------------------------------------------------------------------
  Technology                          Purpose
  ----------------------------------- -----------------------------------
  Node.js                             Runs JavaScript on the server

  Express.js                          Creates the server and handles API
                                      routes

  MongoDB                             Stores user information

  Mongoose                            Defines the user schema and
                                      communicates with MongoDB

  JSON Web Token (`jsonwebtoken`)     Creates and verifies authentication
                                      tokens

  `bcryptjs`                          Hashes passwords and compares
                                      password hashes

  `dotenv`                            Loads environment variables from
                                      the `.env` file

  Nodemon                             Restarts the server automatically
                                      during development

  Postman                             Sends requests to test the API
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 5. Project Folder Structure

``` text
jwt-profile-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   └── userModel.js
│
├── routes/
│   └── authRoutes.js
│
├── .env
├── package.json
└── server.js
```

### File descriptions

-   **`server.js`** --- Loads environment variables, creates the Express
    app, registers middleware and routes, connects to MongoDB, and
    starts the server.
-   **`config/db.js`** --- Contains the MongoDB connection function.
-   **`models/userModel.js`** --- Defines the user schema, including
    name, email, and password.
-   **`controllers/authController.js`** --- Contains the registration,
    login, and profile logic.
-   **`routes/authRoutes.js`** --- Maps HTTP endpoints to controller
    functions.
-   **`middleware/authMiddleware.js`** --- Reads and verifies the JWT
    token before allowing access to the protected profile route.
-   **`.env`** --- Stores configuration values such as the port, MongoDB
    URI, and JWT secret.
-   **`package.json`** --- Lists project dependencies and scripts.

------------------------------------------------------------------------

## 6. How the API Works

### Step 1: Registration

The client sends a `POST` request to `/api/auth/register` with a name,
email, and password.

The registration controller: 1. Checks that all required fields are
present. 2. Checks whether the email is already registered. 3. Hashes
the password using `bcryptjs`. 4. Creates a user record in MongoDB. 5.
Returns the user's basic details without returning the password.

### Step 2: Login

The client sends a `POST` request to `/api/auth/login` with an email and
password.

The login controller: 1. Finds the user by email. 2. Compares the
submitted password with the stored password hash. 3. Returns an error if
the credentials are incorrect. 4. Creates a JWT token if the credentials
are correct. 5. Returns the token to the client.

### Step 3: Access the Profile

The client sends a `GET` request to `/api/auth/profile` and includes the
token in the request's `Authorization` header.

The authentication middleware: 1. Checks that the header contains a
Bearer token. 2. Extracts the token. 3. Verifies the token using the JWT
secret. 4. Makes the decoded token data available through `req.user`. 5.
Calls `next()` to allow the request to continue.

The profile controller then finds the user in MongoDB and returns the
profile information without the password.

------------------------------------------------------------------------

## 7. Installation and Setup

### Prerequisites

Install or prepare the following:

-   **Node.js and npm:** Download from
    [nodejs.org](https://nodejs.org/).
-   **MongoDB:** Run MongoDB locally or prepare a valid MongoDB
    connection URI.
-   **Postman:** Download from
    [postman.com](https://www.postman.com/downloads/) to test the API.
-   **Code editor:** Visual Studio Code or another editor.

### Step 1: Open the project

Download the project ZIP from the repository and extract it, or clone
the repository:

``` bash
git clone YOUR_REPOSITORY_URL
cd jwt-profile-api
```

Replace `YOUR_REPOSITORY_URL` with your actual GitHub repository URL.
The folder name may differ depending on how you downloaded the project.

### Step 2: Install dependencies

Open a terminal inside the project folder and run:

``` bash
npm install
```

This command reads `package.json` and installs the packages required by
the application.

### Step 3: Configure MongoDB and environment variables

Open the `.env` file and confirm that the values are correct. See the
next section for details.

### Step 4: Start the server

Run the development command:

``` bash
npm run dev
```

If you prefer to run without Nodemon, use:

``` bash
npm start
```

The server starts after a successful database connection. By default,
the API uses port `3000`.

------------------------------------------------------------------------

## 8. Environment Variables

The application uses a `.env` file for configuration.

Example values:

``` env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/jwt_profile_db
JWT_SECRET=replace_this_with_a_long_random_secret
```

  Variable       Description
  -------------- -------------------------------------------
  `PORT`         Port on which the Express server listens
  `MONGO_URL`    MongoDB connection URI
  `JWT_SECRET`   Secret used to sign and verify JWT tokens

**Important:** The values above are examples for local development.
Replace the JWT secret with a long, random value. Never publish real
secrets, passwords, or production database credentials in a public
repository. Before publishing, add `.env` to `.gitignore` and, if
useful, commit an `.env.example` file containing only placeholder
values.

------------------------------------------------------------------------

## 9. Running the Project

When the database connection succeeds, the terminal should show messages
similar to:

``` text
Database connected
Server running on http://localhost:3000
```

If the database does not connect, the server will not start. Confirm
that MongoDB is running and that `MONGO_URL` is correct.

The base URL for authentication endpoints is:

``` text
http://localhost:3000/api/auth
```

------------------------------------------------------------------------

## 10. API Endpoints

  ----------------------------------------------------------------------------
  Method            Endpoint               Purpose           Authentication
  ----------------- ---------------------- ----------------- -----------------
  `POST`            `/api/auth/register`   Register a new    Not required
                                           user              

  `POST`            `/api/auth/login`      Authenticate and  Not required
                                           receive a token   

  `GET`             `/api/auth/profile`    Retrieve the      Required
                                           authenticated     
                                           user's profile    
  ----------------------------------------------------------------------------

### A. Register a User

**Method:** `POST`

**URL:**

``` text
http://localhost:3000/api/auth/register
```

In Postman, select **Body → raw → JSON** and enter:

``` json
{
  "name": "Riya",
  "email": "riya@example.com",
  "password": "123456"
}
```

The API validates the required fields, checks for an existing email,
hashes the password, and creates the user in MongoDB.

A successful response contains basic user details. The password should
not be returned.

Possible errors include missing required fields or an email address that
is already registered.

### B. Login

**Method:** `POST`

**URL:**

``` text
http://localhost:3000/api/auth/login
```

JSON body:

``` json
{
  "email": "riya@example.com",
  "password": "123456"
}
```

If the email and password are correct, the response includes a JWT
token. Copy the token from the response for the next step.

If the credentials are incorrect, the API returns an error response.

### C. Get the User Profile

**Method:** `GET`

**URL:**

``` text
http://localhost:3000/api/auth/profile
```

This route is protected. It requires the token received from the login
endpoint.

In Postman:

1.  Open a new request and select **GET**.
2.  Enter the profile URL.
3.  Open the **Authorization** tab.
4.  Choose **Bearer Token** as the type.
5.  Paste the JWT token into the token field.
6.  Click **Send**.

Alternatively, the request header can be written as:

``` text
Authorization: Bearer YOUR_JWT_TOKEN
```

If the token is valid and the user exists, the API returns the user's
profile details without the password. A missing, invalid, or expired
token results in an unauthorized response.

------------------------------------------------------------------------

## 11. Testing with Postman

Follow this sequence when testing the API for the first time:

1.  Start MongoDB.
2.  Start the Node.js server with `npm run dev`.
3.  Register a new user using the register endpoint.
4.  Log in with the same email and password.
5.  Copy the JWT token from the login response.
6.  Call the profile endpoint with the Bearer token.
7.  Try the profile endpoint without a token to confirm that access is
    protected.
8.  Try logging in with an incorrect password to test the error
    response.

Use a unique email address for each new registration test, because
duplicate email addresses are rejected.

------------------------------------------------------------------------

## 12. Important Code Concepts

### REST API

A REST API allows a client and server to communicate through HTTP
requests. This project uses `POST` for registration and login, and `GET`
for retrieving profile data.

### Express Router

The router keeps endpoint definitions organized in
`routes/authRoutes.js` instead of placing all route logic in
`server.js`.

### Controller

Controllers contain the main logic for handling a request, such as
validating input, checking credentials, creating a token, and returning
a response.

### Mongoose Model

The user model defines the fields stored for a user and their data
types. Mongoose helps the application interact with MongoDB.

### Password Hashing

Hashing converts a password into a one-way representation. The
application uses `bcryptjs` to hash a password during registration and
compare a submitted password during login. It does not need to decrypt
the stored hash.

### JWT Authentication

A JSON Web Token carries signed information that the server can verify.
In this project, the token identifies the user and expires after a
limited period. A token is not a substitute for protecting the secret
used to sign it.

### Middleware

Middleware runs during the request-response cycle. Here, authentication
middleware checks the token before the protected profile controller
runs. `next()` passes control to the next function when authentication
succeeds.

### Environment Variables

Environment variables keep configuration separate from the source code.
The `dotenv` package loads local values from `.env` into `process.env`.

------------------------------------------------------------------------

## 13. Common Errors and Solutions

### `Database not connected`

-   Make sure MongoDB is running.
-   Check the `MONGO_URL` value in `.env`.
-   Confirm that the database service is accessible.

### `Cannot find module`

Run this command from the project folder:

``` bash
npm install
```

Also check that the terminal is opened in the correct folder.

### `npm run dev` does not work

Confirm that `package.json` contains the `dev` script and that
dependencies installed successfully. You can try:

``` bash
npm start
```

### `EADDRINUSE: address already in use`

Another process may already be using port `3000`. Stop the other server
or change the `PORT` value in `.env`.

### `Invalid or expired token`

Log in again and use the newly returned token. Ensure that the
Authorization type is **Bearer Token** and that the token has been
copied correctly.

### `Access denied. Please login first`

The profile route requires an Authorization header containing a Bearer
token. Log in first, then send the token with the profile request.

### Email already registered

Use a different email address for a new registration, or log in with the
existing account.

------------------------------------------------------------------------

## 14. Security Notes

This is a learning project and should be reviewed before production use.

-   Do not store plain-text passwords; this project uses password
    hashing.
-   Never expose the JWT secret or database credentials in a public
    GitHub repository.
-   Use a long, randomly generated JWT secret.
-   Keep `.env` out of version control and provide placeholders in
    `.env.example` if necessary.
-   Use HTTPS when deploying publicly.
-   Add stronger input validation, rate limiting, and appropriate error
    handling before production use.
-   Do not share your JWT token; anyone holding a valid token may be
    able to use it until it expires.

------------------------------------------------------------------------

## 15. Future Improvements

Possible features to add later:

-   Email verification
-   Forgot-password and reset-password flow
-   Update profile endpoint
-   Logout/token revocation strategy
-   Role-based authorization for admin and normal users
-   Stronger input validation
-   Rate limiting for login attempts
-   Automated API tests
-   Deployment to a hosting provider

------------------------------------------------------------------------

## 16. Author / Project Purpose

**Project:** JWT Login + Profile API

**Purpose:** A learning project to practise backend development and
authentication using Node.js, Express.js, MongoDB, and JWT.

This project demonstrates the core flow of user registration, login,
token generation, and protected profile access. It can be extended with
additional authentication features as backend skills improve.
