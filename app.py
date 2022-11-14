from crypt import methods
from flask import Flask, Response, request
from flask_cors import CORS
import main
import sys

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def hello_world():
	response = main.getUserTweets('arvidkahl', 200).to_json(orient='records')
	return Response(response, mimetype='application/json')

@app.route('/<username>', methods=['GET', 'POST'])
def user(username = 'arvidkahl'):
	if request.method == 'GET':
		limit = request.headers.get('Limit')
		print(request.headers, file=sys.stderr)
		response = main.getUserTweets(username, int(limit)).to_json(orient='records')
		return Response(response, mimetype='application/json')