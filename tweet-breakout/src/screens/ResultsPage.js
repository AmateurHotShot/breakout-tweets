import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ResultCard from "../components/ResultCard";
import TweetChart from "../components/TweetChart";

function ResultsPage({props}) {
	let {handle, limit} = useParams();
	// let handle = params.handle;
	// let limit = params.limit;

	const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
	const [filtered, setFiltered] = useState([])

	const [sorted, setSorted] = useState('likeDesc')

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const {data: response} = await axios.get(`http://127.0.0.1:5000/${handle}`, {headers: {'limit': limit}});
				console.table(response)
				const filtered_data = response.filter(tweet => tweet.Outlier === true);
        setData(response);
				setFiltered(filtered_data);
			} catch (error) {
				console.error(error.message)
			}
			setLoading(false);
		}

		fetchData();
	}, [])

	const likeAsc = [...filtered].sort((a, b) => a.Likes - b.Likes)
	const likeDesc = [...filtered].sort((a, b) => b.Likes - a.Likes)
	const dateAsc = [...filtered].sort((a, b) => new Date(a.Date) - new Date(b.Date))
	const dateDesc = [...filtered].sort((a, b) => new Date(b.Date) - new Date(a.Date))

	const sortedData = {
		likeAsc: likeAsc,
		likeDesc: likeDesc,
		dateAsc: dateAsc,
		dateDesc: dateDesc
	}
	

	return(
			<div className="bg-blue-300 min-h-screen flex flex-col items-center justify-center">
				<h1 className="text-3xl font-bold mb-20 mt-10">Results for @{handle}</h1>
				{loading ? <h1>Loading...</h1> : 
					<div className="">
						<TweetChart data={data}/>
						<h2 className="py-4 mt-4 border-t-2 border-slate-200 text-center font-semibold">Outlier Tweets</h2>

						<div className="flex flex-row-reverse mr-5">
							<select 
								name="" 
								id="sort" 
								className="rounded px-3 py-2 right-2 mb-2"
								value={sorted}
								onChange={e => setSorted(e.target.value)}>
								<option value="likeDesc">Most Likes</option>
								<option value="likeAsc">Least Likes</option>
								<option value="dateDesc">Newest Tweets</option>
								<option value="dateAsc">Oldest Tweets</option>
							</select>
						</div>

						<div className="mx-5 flex flex-col max-w-xl">
							{sortedData[sorted].map((tweet, index) => <ResultCard data={tweet} key={index}/>)}
							{/* {sorted} */}
						</div>
					</div>
				}
			</div>
		);
}

export default ResultsPage;