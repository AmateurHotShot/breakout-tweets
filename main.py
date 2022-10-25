import snscrape.modules.twitter as sntwitter
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.neighbors import NearestNeighbors
import numpy as np


def getUserTweets(username, limit):
	tweets = []

	for tweet in sntwitter.TwitterSearchScraper(f'from:{username} exclude:replies').get_items():
			if len(tweets) == limit:
				break
			else:
				tweets.append([tweet.date, tweet.id, tweet.content, tweet.url, tweet.likeCount])


	tweet_df = pd.DataFrame(tweets, columns=['Date', 'Id', 'Tweet', 'Url', 'Likes'])
	df = tweet_df[['Likes']]

	Q1 = np.percentile(df, 25, method='midpoint')
	Q3 = np.percentile(df, 75, method='midpoint')
	IQR = Q3 - Q1

	tweet_df['Outlier'] = np.where((tweet_df['Likes'] > (Q3 + 1.5 * IQR)), True, False)
	tweet_df.sort_values(by=["Likes"], ascending=False).to_json
	return tweet_df

if __name__ == "__main__":
	 print(getUserTweets('brosephpoole', 100))