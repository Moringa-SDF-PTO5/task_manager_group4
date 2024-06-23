# Task Management Application

## Introduction

Welcome to the Task Management Application! This project is designed to showcase a full-stack application built with a Flask backend and a React frontend. The primary goal of this application is to manage tasks efficiently with a user-friendly interface and robust backend support. This project demonstrates the integration of various skills acquired throughout a software development program and is aimed at preparing for building a capstone project.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models and Relationships](#models-and-relationships)
- [Client-side Routes](#client-side-routes)
- [Wireframes](#wireframes)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Minimum Viable Product (MVP)

- **Task Management**
  - View a list of all tasks
  - Create a new task
  - Modify an existing task
  - Delete a task

### Stretch Goals

- **Task Categorization**
  - View tasks by category
  - Assign tasks to multiple categories

## Technologies Used

- **Backend:** Flask, SQLAlchemy
- **Frontend:** React, Formik, React Router
- **Database:** SQLite (development), PostgreSQL (production)
- **Deployment:** Render

## Installation

### Prerequisites

- Python 3.x
- Node.js and npm

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Moringa-SDF-PTO5/task_manager_group4/task-manager.git
   cd task-manager/backend
  Create a virtual environment and activate it:
  python3 -m venv venv
source venv/bin/activate
Install the dependencies:
pip install -r requirements.txt
Set up the database:
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
Run the Flask server: flask run

### Frontend Setup
Navigate to the frontend directory:

bash
cd ../frontend
Install the dependencies:

bash
npm install
Start the React development server:

bash
npm start

### Usage
Open your browser and navigate to http://localhost:3000 to access the React frontend.
Use the application to manage your tasks, view the list of tasks, add new tasks, edit existing tasks, and delete tasks.

###API Endpoints
GET /tasks: Retrieve all tasks
POST /tasks: Create a new task
PUT /tasks/
: Update a specific task
DELETE /tasks/
: Delete a specific task
#### Models and Relationships
## Task
## Attributes:
id (Integer, Primary Key)
title (String)
description (String)
due_date (Date)
completed (Boolean)
priority (Integer)
## Category
## Attributes:
id (Integer, Primary Key)
name (String)
### TaskCategory (Association Table)
## Attributes:
task_id (Foreign Key)
category_id (Foreign Key)
note (String, user submittable attribute)
### Relationships
A Task can belong to multiple Category through TaskCategory
A Category can have many Task through TaskCategory
Client-side Routes
/tasks: View the list of all tasks
/tasks/new: Create a new task
/tasks/
/edit: Edit an existing task
/categories: View and manage categories
### Wireframes
Wireframes for the application have been created to plan out the layout and user interface. View Wireframes

### Deployment
The application is deployed on Render. Follow these steps to deploy your own instance:

Push your code to a GitHub repository.
Create a new web service on Render and connect it to your repository.
Set up environment variables and build commands as required.
Deploy the application.
### Contributing
Contributions are welcome! Please follow these steps:

### Authors
Stella
Moshood
Sayialel
Gregory
Claire

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.

### License
This project is licensed under the MIT License. 
