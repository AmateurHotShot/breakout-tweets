from crypt import methods
from flask import Flask, Response
from flask_cors import CORS
import main

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def hello_world():
	response = main.getUserTweets('arvidkahl', 200).to_json(orient='records')
	return Response(response, mimetype='application/json')

@app.route('/<username>/<int:limit>', methods=['GET', 'POST'])
def user(username = 'arvidkahl', limit = 10):
	response = main.getUserTweets(username, limit).to_json(orient='records')
	return Response(response, mimetype='application/json')