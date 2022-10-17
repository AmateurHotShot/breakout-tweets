import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import axios from "axios";

function ResultsPage({props}) {
	const params = useParams();
	const handle = params.handle;

	const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const {data: response} = await axios.get('http://127.0.0.1:5000');
        setData(response);
				console.log(response)
			} catch (error) {
				console.error(error.message)
			}
			setLoading(false);
		}

		fetchData();
	}, [])
	

	return(
			<div className="bg-blue-300 h-screen flex flex-col items-center justify-center">
				<h1 className="text-3xl font-bold mb-20">Results for {handle}</h1>
				{loading ? <h1>Loading...</h1> : <h1>{data}</h1>}
			</div>
		);
}

export default ResultsPage;