import DashboardContainer from "../containers/DashboardContainer"
import UserContainer from "../containers/UserContainer"
import ReportContainer from "../containers/ReportContainer"
import Icons from "../views/Icons/Icons"
import BannerContainer from "../containers/BannerContainer"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: DashboardContainer
  },
  {
    path: "/banners",
    name: "Banners",
    icon: "pe-7s-photo",
    component: BannerContainer
  },
  {
    path: "/products",
    name: "Products",
    icon: "pe-7s-box1",
    component: ReportContainer
  },
  {
    path: "/users",
    name: "Users",
    icon: "pe-7s-users",
    component: UserContainer
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "pe-7s-mail-open-file",
    component: ReportContainer
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
]

export default dashboardRoutes
