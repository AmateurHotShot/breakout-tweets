import React from "react";

function ResultCard(props) {
	const tweet = props.data;

	
	return (
		<div>
			<div className="bg-white my-3 flex items-center p-1 rounded">
				<p>{tweet.Tweet}</p>
				<p>{tweet.Likes}</p>
			</div>
		</div>
	)
}

export default ResultCard