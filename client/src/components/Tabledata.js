import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import DataDB from "./DB/DataDB";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	tableCell: {
		padding: "8px 16px 8px 16px",
	},
	tableTitle: {
		fontWeight: "700",
	},
	roomPhoto: {
		width: "40px",
		height: "40px",
		marginRight: "1rem",
		borderRadius: "50%",
	},
});

const Tabledata = () => {
	const classes = useStyles();
	const [rows, setRows] = useState(null);

	//get data from mongo db on page load
	useEffect(() => {
		getRows();
	}, []);

	const getRows = () => {
		axios
			.get("/rooms")
			.then((response) => {
				setRows(sortByDate(response.data));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	//sort data by date
	const sortByDate = (data) => {
		let sorted = data.sort((a, b) => {
			return new Date(a.move_out_date).getTime() - new Date(b.move_out_date).getTime();
		});
		return sorted;
	};

	//delete row from backend and update frontend
	const flipRoom = (row) => {
		axios
			.delete(`/rooms/${row._id}`)
			.then((response) => {
				console.log(response, " deleted");
				setRows(
					rows.filter((r) => {
						return r._id !== row._id;
					})
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const columnNames = [
		"Move-out Date",
		"ID",
		"Address",
		"Room",
		"Location",
		"Last Occupant",
		"UID",
		"Balance",
	];

	//create column headers
	const Columns = () => {
		return columnNames.map((col) => {
			return (
				<TableCell align="left" className={classes.tableTitle}>
					{col}
				</TableCell>
			);
		});
	};

	return (
		<Grid container justify="center">
			<Grid item>
				<h1>Move-out List</h1>
				<TableContainer>
					<Table className={classes.table} aria-label="simple table" size="small">
						<TableHead>
							<TableRow>
								<Columns />
								<TableCell align="left" className={classes.tableTitle}></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows?.map((row) => (
								<TableRow key={row._id} hover={true}>
									<TableCell align="left" className={classes.tableCell}>
										{row.move_out_date}
									</TableCell>
									<TableCell align="left" className={classes.tableCell}>
										{row.id}
									</TableCell>
									<TableCell align="left" className={classes.tableCell}>
										<Grid container alignItems="center">
											<Grid item>
												<img
													src={row.picture}
													className={classes.roomPhoto}
												/>
											</Grid>
											<Grid
												item
												style={{ color: "#029486", fontWeight: "700" }}
											>
												{row.address}
											</Grid>
										</Grid>
									</TableCell>
									<TableCell align="center" className={classes.tableCell}>
										{row.room}
									</TableCell>
									<TableCell align="left" className={classes.tableCell}>
										{row.location}
									</TableCell>
									<TableCell
										align="left"
										style={{ color: "#029486", fontWeight: "700" }}
										className={classes.tableCell}
									>
										{row.last_occupant}
									</TableCell>
									<TableCell align="left" className={classes.tableCell}>
										{row.uid}
									</TableCell>
									<TableCell align="left" className={classes.tableCell}>
										{row.balance}
									</TableCell>
									<TableCell>
										<Button
											variant="outlined"
											style={{ textTransform: "unset", whiteSpace: "nowrap" }}
											onClick={() => flipRoom(row)}
										>
											Flip room
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<div style={{ marginTop: "2rem" }}>
					<DataDB getRows={getRows} />
				</div>
			</Grid>
		</Grid>
	);
};

export default Tabledata;
