import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { PouchDB } from "react-pouchdb"
import store from "./store"
import { PrivateRoute } from "./Route"
import LoginContainer from "./containers/LoginContainer"
import Dashboard from "./layouts/Dashboard/Dashboard"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/animate.min.css"
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0"
import "./assets/css/demo.css"
import "./assets/css/pe-icon-7-stroke.css"

ReactDOM.render(
	<PouchDB name="lunadorii">
		<Provider store={store}>
			<HashRouter>
				<Switch>
					<Route to="/login" component={LoginContainer} />
					<Route exact to="/" component={Dashboard} />
				</Switch>
			</HashRouter>
		</Provider>
	</PouchDB>,
	document.getElementById("root")
)
