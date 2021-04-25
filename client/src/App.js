import React from "react";
import "./App.css";
import DataDB from "./components/DB/DataDB";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Table from "./components/Table";

function App() {
	return (
		<BrowserRouter>
			<React.Fragment>
				<Switch>
					<Route exact path="/" render={() => <Table />} />
					<Route exact path="/DataDB" render={() => <DataDB />} />
					<Redirect to="/" />
				</Switch>
			</React.Fragment>
		</BrowserRouter>
	);
}

export default App;
