from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models import db, User, Task  # Import User model

app = Flask(__name__)
app.config.from_object('config.Config')

# Configure CORS to allow requests from http://localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

db.init_app(app)

@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    # Basic validation to ensure email, username, and password are present
    if not email or not username or not password:
        return jsonify({'message': 'Email, username, and password are required'}), 400

    # Check if user with the same email or username already exists
    existing_email = User.query.filter_by(email=email).first()
    existing_username = User.query.filter_by(username=username).first()
    if existing_email:
        return jsonify({'message': 'Email already exists'}), 400
    if existing_username:
        return jsonify({'message': 'Username already exists'}), 400

    # Create a new user instance and set the password
    new_user = User(email=email, username=username)
    new_user.set_password(password)
    
    # Commit user creation to database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Validate credentials (example)
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        # Example: Assuming you have a user_id in your User model
        session['user_id'] = user.id  # Store user_id in session
        return jsonify({'user_id': user.id}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/login', methods=['OPTIONS'])
def login_options():
    return jsonify({}), 200


@app.route('/menu', methods=['GET'])
def menu():
    # You can return menu options here or render a menu template
    return jsonify({'message': 'Welcome to the menu page!'})

# Create database tables (if not created already)
with app.app_context():
    db.create_all()


@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    due_date = data.get('due_date')
    user_id = data.get('user_id')
    project_id = data.get('project_id')

    if not (title and description and due_date and user_id):
        return jsonify({'message': 'Title, description, due_date, and user_id are required'}), 400

    try:
        new_task = Task(title=title, description=description, due_date=due_date, user_id=user_id, project_id=project_id)
        db.session.add(new_task)
        db.session.commit()
        return jsonify({'message': 'Task created successfully'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    

@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        # Handle GET request to fetch tasks
        tasks = Task.query.all()  # Example: Fetch all tasks
        tasks_list = [task.serialize() for task in tasks]
        return jsonify(tasks_list), 200
    elif request.method == 'POST':
        # Handle POST request to create a task
        data = request.get_json()
        # Process and validate data, then create task
        return jsonify({'message': 'Task created successfully'}), 201
    
if __name__ == '__main__':
    app.run(debug=True)
