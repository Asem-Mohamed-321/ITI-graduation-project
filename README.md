# ITI-graduation-project

A fullstack graduation project consisting of:

- **Backend**: Built with NestJS and MongoDB
- **Frontend**: Built with React and Vite

## Project Overview

The project implements a user and company management system that allows:

- **Users** to register, log in, and parse cv, get cv score
- **Companies** to register, manage their profiles, and post job descriptions
- **Admins** to manage user activities and moderate job postings

## Features

### User Features
- User registration (Sign Up)
- User authentication (Sign In)
- Automatic role assignment (user by default)
- cv parsing & scoring  
- update user profile
- get feedback and areas of cv improvment

### Company Features
- Company registration (Sign Up)
- Company authentication (Sign In)
- Search companies by technical fields (e.g. Frontend, Backend)
- Update company profile
- Add job descriptions

### Admin Features
- Approve or reject job descriptions
- Manage registered users

## Technologies Used

### Backend
- **NestJS** – Backend framework for modular and scalable architecture
- **MongoDB with Mongoose** – NoSQL database with ODM
- **class-validator** – DTO input validation
- **@nestjs/swagger** – Swagger UI for API documentation
- **bcrypt** – Secure password hashing
- **dotenv** – Manage environment variables

### Frontend
- **React** – Frontend UI library
- **Vite** – Fast development build tool
- **ESLint** – Code linting for clean and consistent code

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- MongoDB (local or remote instance)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Asem-Mohamed-321/ITI-graduation-project
   cd Backend-side
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   
   Create a `.env` file and set the following:
   ```bash
   MONGO_DB_URI=mongodb+srv://uossofzaki:Q8QQSXE7wsAuiAS@cluster0.2g5q1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

4. Run the application:
   ```bash
   npm run start:dev
   ```

5. Access API Documentation:
   ```
   http://localhost:3000/api-docs#/
   ```

### Frontend Setup

1. Navigate to the clientside folder

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   This runs the app in development mode. Open your browser at:
   ```
   http://localhost:5173
   ```

## Development Notes

- The frontend is bootstrapped using Vite with React
- For best practice, consider using TypeScript and enabling type-aware lint rules. See [Vite's React TS Template](https://vitejs.dev/guide/) 
