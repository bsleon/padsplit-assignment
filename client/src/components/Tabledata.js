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
});

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
				setRows(sortByDate(response.data));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const sortByDate = (data) => {
		let sorted = data.sort((a, b) => {
			return new Date(a.move_out_date).getTime() - new Date(b.move_out_date).getTime();
		});
		return sorted;
	};

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

	return (
		<Grid container justify="center">
			<Grid item>
				<h1>Move-out List</h1>
				<TableContainer>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left" className={classes.tableTitle}>
									Move-out Date
								</TableCell>
								<TableCell align="left" className={classes.tableTitle}>
									ID
								</TableCell>
								<TableCell align="left" className={classes.tableTitle}>
									Address
								</TableCell>
								<TableCell align="left" className={classes.tableTitle}>
									Room
								</TableCell>
								<TableCell align="left" className={classes.tableTitle}>
									Location
								</TableCell>
								<TableCell align="left" className={classes.tableTitle}>
									Last Occupant
								</TableCell>
								<TableCell align="left" className={classes.tableTitle}>
									UID
								</TableCell>
								<TableCell align="left" className={classes.tableTitle}>
									Balance
								</TableCell>
								<TableCell align="left" className={classes.tableTitle}></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows?.map((row) => (
								<TableRow key={row._id}>
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
													style={{
														width: "40px",
														height: "40px",
														marginRight: "1rem",
														borderRadius: "50%",
													}}
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
					<DataDB />
				</div>
			</Grid>
		</Grid>
	);
};

export default Tabledata;
