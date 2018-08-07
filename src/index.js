import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { PouchDB } from "react-pouchdb"
import store from "./store"
import { PrivateRoute } from "./Route"
import LoginContainer from "./containers/LoginContainer"
import Home from "./layouts/Home/Home"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/animate.min.css"
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0"
import "./assets/css/demo.css"
import "./assets/css/pe-icon-7-stroke.css"

ReactDOM.render(
	<PouchDB name="lunadorii">
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={LoginContainer} />
					<PrivateRoute exact to="/" component={Home} />
				</Switch>
			</BrowserRouter>
		</Provider>
	</PouchDB>,
	document.getElementById("root")
)
