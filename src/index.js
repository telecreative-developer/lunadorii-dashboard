import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/animate.min.css"
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0"
import "./assets/css/demo.css"
import "./assets/css/pe-icon-7-stroke.css"
import Dashboard from "./layouts/Dashboard/Dashboard"
import Login from "./layouts/Login/Login"
import PrivateRoute from './PrivateRoute'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route to="/" component={Dashboard} />
      {/* <Route to="/login" component={Login} /> */}
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
