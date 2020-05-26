import os
import requests
from dotenv import load_dotenv
load_dotenv('.flaskenv')

from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

ROOMS = ["room1", "room2 ", "room3"]

@app.route("/")
def index():
    return render_template("index.html", rooms=ROOMS)

@socketio.on('message') #When server is listening to an event called message
def handle_message(data):

    msg = data["msg"]
    room = data["room"]
    print(f"{data}")
    send({"msg": msg}, room=room)

@socketio.on('join')
def join(data):
    room = data["room"]
    join_room(room)
    send({"msg": "someone has joined to: " + room}, room=room, broadcast = True)

@socketio.on('leave')
def leave(data):
    room = data["room"]
    leave_room(room)
    send({"msg": "someone has left"}, room=room)

@socketio.on('new_room')
def new_room(data):
    ROOMS.append(data["new_room_name"])
    room = data["new_room_name"]
    join_room(data['new_room_name'])
    # Notification about new chat room created
    send({"msg": "someone has created the " + room + " room."}, room=room, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)