import os
import requests
from dotenv import load_dotenv
load_dotenv('.flaskenv')

from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on('message') #When server is listening to an event called message
def handle_message(msg):

    send(msg, broadcast = True)


if __name__ == '__main__':
    socketio.run(app)