## Overview

This project is a dashboard showing all of my EC2 instances. There is no fake data generator all data is from AWS. full-stack application built with TypeScript, React, and Express. 
It includes a frontend for user interaction and a backend for handling API requests and database operations.

### Technologies Used:
 - Frontend: React, TypeScript
 - Backend: Express, TypeScript, MongoDB
 - Package Manager: npm
 - Version Control: GitHub
 - Deployment: AWS S3, AWS EC2

## Setup Instructions
Prerequisites
 - Node.js
 - npm
 - MongoDB

### Backend Setup
1. Navigate to the backend directory:  
```cd backend```
2. Install dependencies:  
```npm install```
3. Create a .env file in the **backend/src** directory and set up environment variables:  
```
AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
AWS_REGION=AWS_REGION_OF_EC2
MONGODB_URI="mongodb://localhost:27017/"
```
Variables can be provided in private message to working sandbox.

4. Start the backend server:  
```npm start```

### Frontend Setup
1. Navigate to the frontend directory:  
```cd frontend```
2. Install dependencies:  
```npm install```
3. Build the frontend:  
```npm run build```
4. Serve the built frontend:  
   ```
   npm install -g serve
   cd build
   serve -s .
   ```
## link to deployed application:
**http://homework-fe.s3-website.eu-central-1.amazonaws.com/**
   
