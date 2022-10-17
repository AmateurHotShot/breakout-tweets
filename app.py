from crypt import methods
from flask import Flask
import main
app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello_world():
		return main.getUserTweets('arvidkahl', 100).to_html()

@app.route('/<username>', methods=['GET', 'POST'])
def user(username = 'arvidkahl', limit = 100):
		return main.getUserTweets(username, 100).to_html()