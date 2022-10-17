import {React, useState} from "react";

function SearchBox() {
	const [Name, setName] = useState('')
	

	return(
			<div className="flex flex-col items-center justify-center">
				<h1>Enter a twitter handle</h1>
				<div className="flex rounded-full group">
					<span className="bg-gray-100 h-full w-12 rounded-l-full text-center flex justify-center items-center pl-1 text-lg font-bold text-gray-300">@</span>
					<form action="" className="flex group-hover:outline-4">
						<input className="w-72 h-10 bg-white rounded-r-full text-gray-400 outline-none pl-1" onChange={e => setName(e.target.value)}></input>
					</form>
					<h1 className="bg-red-300 font-bold px-5 hover:cursor-pointer" onClick={e => console.log(Name)}>🔍</h1>
				</div>
			</div>
		);
}

export default SearchBox;