Intern Backend API – Authentication & Task Manager

This is a full-stack web application built as part of an internship assignment.

It provides secure user authentication, role-based access, and task management features with a simple frontend interface.

--------------------------------------------------

FEATURES

- User Registration & Login
- JWT Authentication
- Role-Based Access (User / Admin)
- Task Management (CRUD)
- Protected Routes
- Basic Frontend Dashboard
- API Documentation (Postman)

--------------------------------------------------

TECH STACK

Backend:
- Node.js
- Express.js
- MySQL
- JWT
- bcrypt

Frontend:
- React.js (Vite)
- Axios
- React Router DOM
- CSS

--------------------------------------------------

PROJECT STRUCTURE

project-root/

backend/
  routes/
  middleware/
  db.js
  server.js
  .env

frontend/
  src/
    pages/
    api.js
    main.jsx
  package.json

README.md

--------------------------------------------------

BACKEND SETUP

1. Open backend folder

cd backend

2. Install dependencies

npm install

3. Create .env file

Inside backend folder, create .env file and add:

JWT_SECRET=your_secret_key

4. Start backend server

node server.js

Backend runs on:

http://localhost:5000

--------------------------------------------------

FRONTEND SETUP

1. Open frontend folder

cd frontend

2. Install dependencies

npm install

3. Start frontend server

npm run dev

Frontend runs on:

http://localhost:5173

--------------------------------------------------

API ENDPOINTS

AUTHENTICATION

POST  /api/auth/register   Register user  
POST  /api/auth/login      Login user  
GET   /api/auth/profile    Get profile  
GET   /api/auth/all-users  Get all users (Admin)

TASKS

POST    /api/tasks        Create task  
GET     /api/tasks        Get tasks  
PUT     /api/tasks/:id    Update task  
DELETE  /api/tasks/:id    Delete task

--------------------------------------------------

AUTHENTICATION DETAILS

- JWT token is generated on login
- Token is stored in browser localStorage
- Token is sent in request header:

Authorization: Bearer <token>

- All protected routes require valid token

--------------------------------------------------

SCALABILITY & FUTURE IMPROVEMENTS

Possible improvements:

- Docker deployment
- Redis caching
- Microservices architecture
- Load balancing
- Centralized logging
- Rate limiting

--------------------------------------------------

DELIVERABLES

- Working Backend APIs
- Connected Frontend UI
- Postman API Collection
- Database Schema
- Documentation

--------------------------------------------------

AUTHOR

Name: Aishwarya Dalvi  
Degree: BSc Computer Science (Final Year)  
Role: Backend Developer Intern Applicant  

--------------------------------------------------

PROJECT STATUS

Authentication implemented  
Role-based access completed  
CRUD completed  
Frontend connected  
Documentation ready  

--------------------------------------------------

CONTACT

For queries, please contact via provided internship email.

--------------------------------------------------

END OF DOCUMENTATION
