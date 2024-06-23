
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from models import db, User  # Import User model
from routes import TaskResource, UserResource, ProjectResource

app = Flask(__name__)
app.config.from_object('config.Config')
CORS(app)



db.init_app(app)
migrate = Migrate(app, db)

api = Api(app)
api.add_resource(TaskResource, '/tasks')
api.add_resource(UserResource, '/users')
api.add_resource(ProjectResource, '/projects')

# Route to handle user registration
@app.route('/users', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Basic validation to ensure email and password are present
    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    # Check if user with the same email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 400

    # Create a new user instance
    new_user = User(email=email, password=password)

    # Add new user to the database
    db.session.add(new_user)
    db.session.commit()

    # Return the newly created user in JSON format
    return jsonify({'id': new_user.id, 'email': new_user.email}), 201

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)