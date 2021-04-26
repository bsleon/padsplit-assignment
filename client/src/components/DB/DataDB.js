import React from "react";
import axios from "axios";
import DB from "./dataDB.json";
import { Button, Grid } from "@material-ui/core";

const DataDB = ({ getRows }) => {
	const reloadDB = () => {
		axios.delete("/rooms").then((res) => {
			axios.post("/rooms", DB.data).then((res) => {
				console.log(res.data);
				getRows();
			});
		});
	};

	return (
		<Grid container>
			<Grid item style={{ marginRight: "1rem" }}>
				<Button
					variant="outlined"
					onClick={reloadDB}
					style={{ textTransform: "unset", whiteSpace: "nowrap" }}
				>
					Reset Database
				</Button>
			</Grid>
		</Grid>
	);
};

export default DataDB;
