from flask import Flask
import main
app = Flask(__name__)

@app.route('/')
def hello_world():
		return main.getUserTweets('levelsio', 100).to_html()