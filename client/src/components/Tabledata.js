import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import DB from "./DB/dataDB.json";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

// const rows = [
// 	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
// 	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
// 	createData("Eclair", 262, 16.0, 24, 6.0),
// 	createData("Cupcake", 305, 3.7, 67, 4.3),
// 	createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const Tabledata = () => {
	const classes = useStyles();
	const [rows, setRows] = useState(null);

	useEffect(() => {
		getRows();
	}, []);

	const getRows = () => {
		axios
			.get("/rooms")
			.then((response) => {
				setRows(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteRow = (row) => {
		axios
			.delete(`/rooms/${row._id}`)
			.then((response) => {
				console.log(response, " deleted");
				getRows();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Grid container justify="center">
			<Grid item>
				<h1>Move-out List</h1>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">Move-out Date</TableCell>
								<TableCell align="left">ID</TableCell>
								<TableCell align="left">Address</TableCell>
								<TableCell align="left">Room</TableCell>
								<TableCell align="left">Location</TableCell>
								<TableCell align="left">Last Occupant</TableCell>
								<TableCell align="left">UID</TableCell>
								<TableCell align="left">Balance</TableCell>
								<TableCell align="left"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows?.map((row) => (
								<TableRow key={row._id}>
									<TableCell align="left">{row.move_out_date}</TableCell>
									<TableCell align="left">{row.id}</TableCell>
									<TableCell align="left">{row.address}</TableCell>
									<TableCell align="center">{row.room}</TableCell>
									<TableCell align="left">{row.location}</TableCell>
									<TableCell align="left">{row.last_occupant}</TableCell>
									<TableCell align="left">{row.uid}</TableCell>
									<TableCell align="left">{row.balance}</TableCell>
									<TableCell>
										<Button onClick={() => deleteRow(row)}>Flip Room</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);
};

export default Tabledata;
