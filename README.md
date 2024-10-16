# Authorization System using Express and Mongoose

This project is an authorization system built using **Node.js**, **Express**, **Mongoose**, and other technologies. It allows users to register, log in, and manage sessions with cookies. It uses **bcrypt** for password hashing and **cookie-parser** to manage cookies for authentication purposes.

## Features
- **User Registration**: Allows new users to create accounts.
- **Login**: Users can log in using their email and password.
- **Logout**: Users can log out, which clears the session cookie.
- **Protected Routes**: Access to certain routes is restricted to authenticated users.
- **Password Hashing**: User passwords are securely hashed using bcrypt before storing in the database.
- **Cookies**: User authentication is managed through cookies using the `cookie-parser` middleware.

## Technologies Used
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for handling routes and middleware.
- **Mongoose**: MongoDB object modeling tool to interact with the database.
- **Bcrypt**: For hashing and comparing passwords securely.
- **JWT (JSON Web Token)**: Used to create and verify tokens for authentication.
- **Cookie-Parser**: Middleware for handling cookies in Express.
- **Tailwind**: To crete the UI

