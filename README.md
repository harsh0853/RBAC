**Role-Based Access Control (RBAC) Authentication System
Project Overview**

This project is a Node.js application that implements Authentication, Authorization, and Role-Based Access Control (RBAC). It allows users to securely register, log in, and access specific resources based on their roles and permissions.

The project leverages JWT (JSON Web Tokens) for session management and securely handles passwords using bcryptjs. The system ensures that users can only access resources they are authorized to, depending on their assigned roles, such as Admin, Teacher, and Student.

**Features**

- Authentication: Secure user login and registration with password hashing.
- Authorization: User roles (Admin, Teacher, Student) are assigned and used to authorize access to different resources.
- JWT-based Sessions: User sessions are managed with JWT tokens.
- Role-Based Access Control (RBAC): Permissions are assigned based on roles and checked before allowing access to routes.
- Granular Permissions: Specific permissions like canEdit, canView, canCreate, canDelete are checked for actions on resources.

**Technologies Used**

- Node.js: Backend JavaScript runtime.
- Express.js: Web framework for building the REST API.
- MongoDB: Database for storing user data.
- Mongoose: ODM for interacting with MongoDB.
- bcryptjs: Library for hashing and comparing passwords.
- jsonwebtoken (JWT): Library for managing JSON Web Tokens for user authentication.
- dotenv: Library to manage environment variables.

**Setup and Installation
Prerequisites**

Before running the project, ensure that you have the following installed:
- Node.js (>= 14.x)
- MongoDB (or a MongoDB Atlas cluster)

**Installation Steps**

1. Clone the repository:

2. Install dependencies:

npm install

3. Create an .env file in the root of the project and define the following environment variables:

JWT_SEC=<Your-JWT-Secret>        # Secret key for JWT signing
MONGO_URI=<Your-MongoDB-URI>     # MongoDB connection URI
PORT= <Your-desired-port>        # The port on which the server will run

4. Start the application:

npm start

API Endpoints
Authentication Routes

- POST /api/auth/register
  Registers a new user.
  Request body:
  {
    "email": "user@example.com",
    "password": "yourpassword",
    "role": "admin"    // Roles can be "admin", "teacher", or "student"
  }
  Response:
  {
    "message": "User registered successfully!"
  }

- POST /api/auth/login
  Logs in a user by verifying their email and password, and returns a JWT token.
  Request body:
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  Response:
  {
    "token": "jwt-token"
  }

Protected Routes (with Role-based Access)

- GET /api/user/admin
  Only accessible by users with the admin role.
  Response:
  {
    "message": "Admin content"
  }

- GET /api/user/teacher
  Only accessible by users with the teacher role.
  Response:
  {
    "message": "Teacher content"
  }

- GET /api/user/student
  Only accessible by users with the student role.
  Response:
  {
    "message": "Student content"
  }

- PUT /api/user/canEditResults
  Only accessible by users with permission to edit results.
  Response:
  {
    "message": "Results edited successfully"
  }

- DELETE /api/user/canRemoveStudentInfoFromDatabase
  Only accessible by users with permission to remove student data.
  Response:
  {
    "message": "Student data removed"
  }

- POST /api/user/canAddNewStudentInfoToDatabase
  Only accessible by users with permission to add new student data.
  Response:
  {
    "message": "New student added"
  }

**How RBAC Works in This System**

This system implements Role-Based Access Control (RBAC) by assigning specific roles to users. The roles include:
- admin: Has access to all resources and permissions.
- teacher: Has limited access and permissions related to their role.
- student: Has access only to their own data.

Permissions are also defined for specific actions:
- canEdit: Permission to edit data.
- canView: Permission to view data.
- canCreate: Permission to create new data.
- canDelete: Permission to delete data.

Middleware for Role and Permission Checks:
- verifyToken: Verifies that the JWT token is valid and attaches the user data to the request object.
- accessMiddleware: Ensures that users with the correct role can access certain resources.
- permissionMiddleware: Checks if the user has the necessary permissions to perform specific actions.

**Security Considerations**

1. Password Hashing: User passwords are hashed using bcryptjs, ensuring they are stored securely.
2. JWT for Authentication: JWT tokens are used to authenticate users, ensuring secure and stateless sessions.
3. Role and Permission Checks: Access to routes is restricted based on the user's role and permissions, ensuring only authorized users can perform specific actions.
4. Environment Variables: Sensitive data, such as JWT secrets and MongoDB URIs, are stored in environment variables and not hardcoded in the code.

**Future Improvements**

- Password Reset: Allow users to reset their passwords if they forget them.
- Admin Interface: Provide an interface for admins to manage users, roles, and permissions dynamically.
- Audit Logs: Implement a logging system to track user actions on sensitive data.

**Conclusion**

This project provides a simple and effective implementation of authentication, authorization, and Role-Based Access Control (RBAC). By using JWT, bcryptjs, and Express, it ensures that only authorized users can access specific resources based on their roles and permissions. The modular and scalable design makes it easy to extend and enhance as needed.

