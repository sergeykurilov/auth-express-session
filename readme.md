# Auth System

This repository contains an authentication system built with Express.js and TypeScript. It uses Prisma as an ORM to interact with a SQLite database and bcrypt for password hashing.

## Features

- **Express.js**: Robust framework for building web servers.
- **TypeScript**: Strongly typed language that compiles to JavaScript.
- **Prisma ORM**: Next-generation ORM for Node.js and TypeScript.
- **bcrypt**: Library to help you hash passwords securely.
- **SQLite**: Lightweight disk-based database that doesn't require a separate server process.
- **Rate Limiting**: Basic protection against brute-force attacks.

## Getting Started

To get this project up and running on your local machine for development and testing purposes, follow these steps:

### Prerequisites

Make sure you have Node.js installed (which comes with npm) on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sergeykurilov/auth-express-session
cd auth
```
Install NPM packages:
```bash
npm install
```
Run database migrations:

```bash
npm run migrate
```
Start the development server:
```bash
npm run dev
```
Open Prisma Studio to interact with the database via a web interface:
```bash
npm run studio
```
Usage
Once you have the development server running, you can start sending requests to http://localhost:3000 to test the authentication endpoints.

- /api/auth/register: Register a new user.
- /api/auth/login: Log in an existing user.
- /api/auth/user: Fetch the authenticated user's data.

Scripts
- start: Run the compiled server.
- dev: Run the server in development mode with hot reload.
- migrate: Perform database migrations with Prisma.
- studio: Launch Prisma Studio for database management.
