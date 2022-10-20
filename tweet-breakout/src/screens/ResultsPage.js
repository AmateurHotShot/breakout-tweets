import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ResultTable from "../components/ResultCard";
import TweetChart from "../components/TweetChart";

function ResultsPage({props}) {
	const params = useParams();
	const handle = params.handle;

	const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
	const [filtered, setFiltered] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const {data: response} = await axios.get(`http://127.0.0.1:5000/${handle}`);
				const filtered_data = response.filter(tweet => tweet.Outlier === true);
        setData(response);
				setFiltered(filtered_data);
				console.table(response)
			} catch (error) {
				console.error(error.message)
			}
			setLoading(false);
		}

		fetchData();
	}, [])
	

	return(
			<div className="bg-blue-300 min-h-screen flex flex-col items-center justify-center">
				<h1 className="text-3xl font-bold mb-20">Results for {handle}</h1>
				{loading ? <h1>Loading...</h1> : 
					<div className="">
						<TweetChart data={data}/>
						<div className="mx-2 flex flex-col">
							{filtered.map((tweet, index) => <ResultTable data={tweet} key={index}/>)}
						</div>
					</div>
				}
			</div>
		);
}

export default ResultsPage;