import React from "react";
import axios from "axios";
import DB from "./dataDB.json";
import { Button, Grid } from "@material-ui/core";

const DataDB = () => {
	const reloadDB = () => {
		axios.delete("/rooms").then((res) => {
			axios.post("/rooms", DB.data).then((res) => {
				console.log(res.data);
				window.location.reload();
			});
		});
	};

	return (
		<Grid container>
			<Grid item style={{ marginRight: "1rem" }}>
				<Button variant="outlined" onClick={reloadDB}>
					Reload DB
				</Button>
			</Grid>
		</Grid>
	);
};

export default DataDB;
