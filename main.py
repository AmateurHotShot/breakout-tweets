import snscrape.modules.twitter as sntwitter
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.neighbors import NearestNeighbors
import numpy as np


def getUserTweets(username, limit = 100):
	tweets = []

	for tweet in sntwitter.TwitterUserScraper(username).get_items():
			if len(tweets) == limit:
				break 
			else:
				tweets.append([tweet.date, tweet.id, tweet.content, tweet.url, tweet.likeCount, tweet.inReplyToTweetId])


	tweet_df = pd.DataFrame(tweets, columns=['Date', 'Id', 'Tweet', 'Url', 'Likes', 'ReplyTo'])
	tweet_df = tweet_df[tweet_df['ReplyTo'].isnull()]
	df = tweet_df[['Likes']]

	X = np.array(df['Likes']).reshape(-1, 1)

	nbrs = NearestNeighbors(n_neighbors = 10)
	nbrs.fit(X)

	distances, indexes = nbrs.kneighbors(X)

	outlier_index = np.where(distances.mean(axis = 1) > 10)

	outlier_values = df.iloc[outlier_index]

	Filter_df  = tweet_df.loc[outlier_values.index]
	return Filter_df.sort_values(by=["Likes"], ascending=False)

if __name__ == "__main__":
	 getUserTweets('brosephpoole', 1000)