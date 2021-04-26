import React from "react";
import axios from "axios";
import DB from "./dataDB.json";
import { Button, Grid } from "@material-ui/core";

const DataDB = () => {
	const loadDB = () => {
		axios.post("/rooms", DB.data).then((res) => {
			console.log(res.data);
			window.location.reload();
		});
	};

	const deleteDB = () => {
		axios.delete("/rooms").then((res) => {
			console.log(res.data);
			window.location.reload();
		});
	};

	console.log(DB);
	return (
		<Grid container>
			<Grid item style={{ marginRight: "1rem" }}>
				<Button variant="outlined" onClick={deleteDB}>
					Delete DB
				</Button>
			</Grid>
			<Grid item>
				<Button variant="outlined" onClick={loadDB}>
					Load DB
				</Button>
			</Grid>
		</Grid>
	);
};

export default DataDB;
