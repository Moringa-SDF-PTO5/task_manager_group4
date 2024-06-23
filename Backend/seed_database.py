# seed_database.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from faker import Faker
from models import db, User, Task, Project
from datetime import datetime, timedelta
import random

app = Flask(__name__)
app.config.from_object('config.Config')  # Adjust this to your actual config module
db.init_app(app)
fake = Faker()

# Define a function to seed the database with users
def seed_users():
    with app.app_context():
        # Create all tables
        db.create_all()

        # Add some sample users
        users_data = [
            {'username': 'user1', 'email': 'user1@example.com', 'password': 'password1'},
            {'username': 'user2', 'email': 'user2@example.com', 'password': 'password2'},
            {'username': 'user3', 'email': 'user3@example.com', 'password': 'password3'},
            {'username': 'user4', 'email': 'user4@example.com', 'password': 'password4'},
            {'username': 'user5', 'email': 'user5@example.com', 'password': 'password5'},
            {'username': 'user6', 'email': 'user6@example.com', 'password': 'password6'},
            {'username': 'user7', 'email': 'user7@example.com', 'password': 'password7'},
            {'username': 'user8', 'email': 'user8@example.com', 'password': 'password8'},
            {'username': 'user9', 'email': 'user9@example.com', 'password': 'password9'},
            {'username': 'user10', 'email': 'user10@example.com', 'password': 'password10'},
        ]

        for user_data in users_data:
            # Ensure username uniqueness by appending a unique identifier
            unique_id = fake.unique.random_number(digits=5)
            username = f"{user_data['username']}{unique_id}"
            user_email = f"{user_data['email'].split('@')[0]}_{unique_id}@{user_data['email'].split('@')[1]}"
            user = User(username=username, email=user_email)
            user.set_password(user_data['password'])  # Hash the password
            db.session.add(user)

        db.session.commit()
        print('Users seeded successfully.')

# Define a function to seed random tasks and projects
def seed_tasks_and_projects():
    with app.app_context():
        users = User.query.all()
        projects = []

        # Create 5 projects
        for _ in range(5):
            project = Project(
                name=fake.company(),
                description=fake.text()
            )
            projects.append(project)
            db.session.add(project)
        db.session.commit()

        # Create tasks for each user
        for user in users:
            for _ in range(random.randint(1, 5)):  # Random number of tasks per user
                due_date = fake.date_between(start_date='-30d', end_date='+30d')  # Random due date within ±30 days
                task = Task(
                    title=fake.sentence(),
                    description=fake.text(),
                    due_date=due_date,
                    owner=user,
                    project=random.choice(projects) if random.random() > 0.5 else None  # Assign to a random project half of the time
                )
                db.session.add(task)
        db.session.commit()
        print('Tasks and projects seeded successfully.')

if __name__ == '__main__':
    seed_users()
    seed_tasks_and_projects()
