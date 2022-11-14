import React from "react";


function ResultCard(props) {
	const tweet = props.data;
	tweet.date = new Date(tweet.Date).toLocaleDateString();

	const like_format = Intl.NumberFormat('en', {notation: 'compact'})
	tweet.better_like = like_format.format(tweet.Likes);
	console.table(tweet)

	const media = () => {
		if (tweet.Media) {
			console.log(tweet.Media)
			return (
			<div className="">
				{tweet.Media.map((media, index) => {
					<img src={media} alt="" className="w-1/2"/>
				})}
			</div>)
		}
	}

	
	return (
		<div>
			<a className="bg-white my-2 flex justify-between rounded shadow hover:bg-slate-100 hover:shadow-xl duration-200"
					href={tweet.Url} target="_blank">
					<p className="p-1">{tweet.Tweet}</p>
					{media()}
					{/* <img src="https://pbs.twimg.com/media/Ffc_2ygXEAA9CNh?format=jpg&name=small" alt="" /> */}

					<div className="flex flex-col text-sm justify-between border-l border-slate-300 pl-1">
						<p className="p-1 text-sm text-slate-400 self-end">{tweet.date}</p>
						<div className="flex flex-row items-end self-end ml-2 p-2 text-xs font-medium text-slate-600">
							<p className="mr-1 text-sm">❤️</p><p className="text-sm">{tweet.better_like}</p>
						</div>
					</div>
			</a>
		</div>
	)
}

export default ResultCard