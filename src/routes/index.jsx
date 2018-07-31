import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Login from "layouts/Login/Login.jsx";

var indexRoutes = [
  { path: "/login", name: "Home", component: Login },
  { path: "/", name: "Home", component: Dashboard },
];

export default indexRoutes;
