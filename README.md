# Creche Management System Backend API

## Overview

The **Creche Management System** backend API is designed to manage various aspects of a creche, including user management, role-based access control, and child registrations. This backend service is built using Node.js and PostgreSQL and provides a robust API for interacting with the system.

## Features

- **User Authentication**: Allows users to register, log in, and authenticate using email or username.
- **Role Management**: Supports creating and managing roles such as Admin, Parent, and Staff.
- **Child Registration**: Enables the registration and management of children, including storing personal details and images.
- **Logging**: Server logging of all events and file rotation. 

## Technologies

- **Node.js**: A JavaScript runtime for building scalable network applications.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Sequelize**: An ORM for Node.js that supports various SQL dialects, including PostgreSQL.
- **Express**: A web application framework for Node.js.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/embee430/creche_backend_API.git
2. **Navigate to the project directory:**
3. **Install dependencies:**
   npm install
4. Download and install PostgreSQL
5. Create a database with details in the .env file found in the root project directory
6. **Start the server**
   node server.js or npm start


   ## API Endpoints

### User Routes

- **Register a New User**
  - **Endpoint:** `POST /api/users/register`
  - **Description:** Registers a new user with a specified role.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "roleId": "integer"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "integer",
      "username": "string",
      "email": "string",
      "roleId": "integer"
    }
    ```

- **Log In an Existing User**
  - **Endpoint:** `POST /api/users/login`
  - **Description:** Authenticates a user with either their email or username and password.
  - **Request Body:**
    ```json
    {
      "emailOrUsername": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "string",
      "user": {
        "id": "integer",
        "username": "string",
        "email": "string",
        "role": "string"
      }
    }
    ```

### Role Routes

- **Get All Roles**
  - **Endpoint:** `GET /api/roles`
  - **Description:** Retrieves a list of all roles.
  - **Response:**
    ```json
    [
      {
        "id": "integer",
        "roleName": "string"
      }
    ]
    ```

- **Create a New Role**
  - **Endpoint:** `POST /api/roles`
  - **Description:** Creates a new role in the system.
  - **Request Body:**
    ```json
    {
      "roleName": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "integer",
      "roleName": "string"
    }
    ```

### Child Routes

- **Register a New Child**
  - **Endpoint:** `POST /api/children`
  - **Description:** Registers a new child in the creche system.
  - **Request Body:**
    ```json
    {
      "firstName": "string",
      "lastName": "string",
      "dob": "YYYY-MM-DD",
      "parentId": "integer",
      "address": "string",
      "passportImage": "string",
      "gender": "Male/Female"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "integer",
      "firstName": "string",
      "lastName": "string",
      "dob": "YYYY-MM-DD",
      "parentId": "integer",
      "address": "string",
      "passportImage": "string",
      "gender": "Male/Female"
    }
    ```

- **Get All Children**
  - **Endpoint:** `GET /api/children`
  - **Description:** Retrieves a list of all registered children.
  - **Response:**
    ```json
    [
      {
        "id": "integer",
        "firstName": "string",
        "lastName": "string",
        "dob": "YYYY-MM-DD",
        "parentId": "integer",
        "address": "string",
        "passportImage": "string",
        "gender": "Male/Female"
      }
    ]
    ```

