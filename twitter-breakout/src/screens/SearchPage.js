import React from "react";
import SearchBox from "../components/SearchBox";

function SearchPage() {
	return(
			<div className="bg-blue-300 h-screen flex flex-col items-center justify-center">
				<h1 className="text-3xl font-bold mb-20">Twitter + Machine Learning = Analytical Edge</h1>
				<SearchBox />
			</div>
		);
}

export default SearchPage;