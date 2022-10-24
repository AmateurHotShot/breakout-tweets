import React from 'react';
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
	TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { Scatter } from 'react-chartjs-2';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function TweetChart(props) {
	const data = props.data;

	const regTweets = data.filter(tweet => tweet.Outlier === false);
	const outlierTweets = data.filter(tweet => tweet.Outlier === true);

	const chart_data = {
		labels: data.map(tweet => new Date(tweet.Date)),
		datasets: [
			{
				label: 'Regular Tweets',
				data: regTweets.map(tweet => ({x: new Date(tweet.Date), y: tweet.Likes})),
				backgroundColor: '#2563eb'
			},
			{
				label: 'Outlier Tweets',
				data: outlierTweets.map(tweet => ({x: new Date(tweet.Date), y: tweet.Likes})),
				backgroundColor: '#f87171'

			}
		]
	}

	const values = [
		data.map(tweet => tweet.Likes),
	]

	const chart_options = {
		response: true,
		scales: {
				x: {
						type: 'time',
						time: {
								unit: 'day'
						}
				}
		}
	}

	return (
		<div className='bg-white mx-5 rounded'>
			<Scatter 
				data={chart_data}
				options={chart_options}
			/>
		</div>
	)
}

export default TweetChart;