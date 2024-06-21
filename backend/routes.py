from flask import request, jsonify, current_app as app
from . import db
from .models import User, Project, Task, user_projects

@app.route('/users', methods=['POST', 'GET'])
def handle_users():
    if request.method == 'POST':
        data = request.get_json()
        new_user = User(username=data['username'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201

    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@app.route('/projects', methods=['POST', 'GET'])
def handle_projects():
    if request.method == 'POST':
        data = request.get_json()
        new_project = Project(name=data['name'])
        db.session.add(new_project)
        db.session.commit()
        return jsonify(new_project.to_dict()), 201

    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects]), 200

@app.route('/tasks', methods=['POST', 'GET'])
def handle_tasks():
    if request.method == 'POST':
        data = request.get_json()
        new_task = Task(
            title=data['title'],
            description=data.get('description'),
            user_id=data['user_id'],
            project_id=data['project_id']
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify(new_task.to_dict()), 201

    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks]), 200
