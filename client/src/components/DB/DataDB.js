import React from "react";
import axios from "axios";
import DB from "./dataDB.json";

const DataDB = () => {
	const loadDB = () => {
		console.log(DB);
		console.log(typeof DB);
		axios.post("/rooms", DB.data).then((res) => console.log(res.data));
	};

	const deleteDB = () => {
		axios.delete("/rooms").then((res) => {
			console.log(res.data);
		});
	};

	console.log(DB);
	return (
		<React.Fragment>
			<button onClick={deleteDB}>Delete DB</button>
			<button onClick={loadDB}>Load DB</button>
		</React.Fragment>
	);
};

export default DataDB;
