import React from "react";
import "./App.css";
import DataDB from "./components/DB/DataDB";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<React.Fragment>
				<Switch>
					<Route exact path="/DataDB" render={() => <DataDB />} />
					<Redirect to="/" />
				</Switch>
			</React.Fragment>
		</BrowserRouter>
	);
}

export default App;
