import Dashboard from "views/Dashboard/Dashboard"
import Users from "views/Users/Users"
import Reports from "views/Reports/Reports"
import Icons from "views/Icons/Icons"
import Banners from "views/Banners/Banners"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/banners",
    name: "Banners",
    icon: "pe-7s-photo",
    component: Banners
  },
  {
    path: "/products",
    name: "Products",
    icon: "pe-7s-box1",
    component: Reports
  },
  {
    path: "/users",
    name: "Users",
    icon: "pe-7s-users",
    component: Users
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "pe-7s-mail-open-file",
    component: Reports
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
