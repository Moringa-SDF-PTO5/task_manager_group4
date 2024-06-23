from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import User, Task, Project
from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Integer(dump_only=True)
    username = fields.String(required=True, validate=validate.Length(max=80))
    email = fields.Email(required=True, validate=validate.Length(max=120))
    password = fields.String(required=True, load_only=True)  # Specify load_only for registration

class TaskSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        load_instance = True

class ProjectSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Project
        load_instance = True
