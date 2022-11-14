import snscrape.modules.twitter as sntwitter
import pandas as pd
import numpy as np
import time

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
	tweet_df.sort_values(by=["Likes"], ascending=False)
	return tweet_df

if __name__ == "__main__":
	start_time = time.time()
	tweets = getUserTweets('levelsio', 1000)
	print("--- %s seconds ---" % (time.time() - start_time))
