from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from models import db, User, Task, Project
from schemas import UserSchema, TaskSchema, ProjectSchema
from werkzeug.security import generate_password_hash



app = Flask(__name__)
app.config.from_object('config.Config')
db.init_app(app)
api = Api(app)

user_schema = UserSchema()
task_schema = TaskSchema()
project_schema = ProjectSchema()

class UserResource(Resource):
    def get(self):
        users = User.query.all()
        return user_schema.dump(users, many=True), 200

    def post(self):
        new_user = user_schema.load(request.json)
        db.session.add(new_user)
        db.session.commit()
        return user_schema.dump(new_user), 201

class TaskResource(Resource):
    def get(self):
        tasks = Task.query.all()
        return task_schema.dump(tasks, many=True), 200

    def post(self):
        new_task = task_schema.load(request.json)
        db.session.add(new_task)
        db.session.commit()
        return task_schema.dump(new_task), 201

class ProjectResource(Resource):
    def get(self):
        projects = Project.query.all()
        return project_schema.dump(projects, many=True), 200

    def post(self):
        new_project = project_schema.load(request.json)
        db.session.add(new_project)
        db.session.commit()
        return project_schema.dump(new_project), 201
    
    
@app.route('/register', methods=['POST'])
def register_user():
    if request.method == 'POST':
        email = request.json.get('email')
        password = request.json.get('password')

        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'message': 'User already exists!'}), 400

        # Create new user
        new_user = User(email=email)
        new_user.set_password(password)  # Set hashed password
        
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            'message': 'User registered successfully!',
            'user': {
                'id': new_user.id,
                'email': new_user.email,
                # Add other user details as needed
            }
        }), 201
    return jsonify({'message': 'Method not allowed'}), 405
    

api.add_resource(UserResource, '/users')
api.add_resource(TaskResource, '/tasks')
api.add_resource(ProjectResource, '/projects')
