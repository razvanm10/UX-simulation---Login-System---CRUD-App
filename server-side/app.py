from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/Accounts'
db = SQLAlchemy(app)
CORS(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(30), nullable = False)
    other_names = db.Column(db.String(70), nullable = False)
    email = db.Column(db.String(50), nullable = False)
    password = db.Column(db.String(50), nullable = False)
    created_at = db.Column(db.DateTime, nullable = False, default = datetime.utcnow())

    def __repr__(self):
        return f"User {self.first_name}, {self.other_names}, {self.email}, {self.created_at}"

    def __init__(self, first_name, other_names, email, password):
        self.first_name = first_name
        self.other_names = other_names
        self.email = email
        self.password = password
        
def format_user(user):
    return {
        "first_name": user.first_name,
        "other_names": user.other_names,
        "email": user.email,
        "password": user.password,
        "id": user.id,
        "created_at": user.created_at
    }

@app.route('/')
def hello():
    return "Hello there!"

# create user
@app.route("/user", methods = ["POST"])
def create_user():
    first_name = request.json["first_name"]
    other_names = request.json["other_names"]
    email = request.json["email"]
    password = request.json["password"]
    user = User(first_name, other_names, email, password)
    db.session.add(user)
    db.session.commit()
    return format_user(user)

# get users
@app.route("/user", methods = ["GET"])
def get_all_users():
    users = User.query.order_by(User.id.asc()).all()
    users_list = []
    for user in users:
        users_list.append(format_user(user))
    return {"users": users_list}

# delete user
@app.route('/user/<id>', methods = ["DELETE"])
def delete_user(id):
    user = User.query.filter_by(id = id).one()
    db.session.delete(user)
    db.session.commit()
    return "User deleted"

# update user
@app.route('/user/<id>', methods = ["PUT"])
def update_user(id):
    user = User.query.filter_by(id = id)
    first_name = request.json["first_name"]
    other_names = request.json["other_names"]
    email = request.json["email"]
    password = request.json["password"]
    user.update(dict(first_name = first_name, other_names = other_names, email = email, password = password, created_at = datetime.utcnow()))
    db.session.commit()
    return {"user": format_user(user.one())}

if __name__ == '__main__':
    app.run()