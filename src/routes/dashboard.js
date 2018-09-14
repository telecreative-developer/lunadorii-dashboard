import DashboardContainer from "../containers/DashboardContainer"
import UserContainer from "../containers/UserContainer"
import ReportContainer from "../containers/ReportContainer"
import Icons from "../views/Icons/Icons"
import BannerContainer from "../containers/BannerContainer"
import ProductContainer from "../containers/ProductContainer"
import TransactionContainer from "../containers/TransactionContainer"
import CategoryContainer from "../containers/CategoryContainer";

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
    icon: "pe-7s-display1",
    component: BannerContainer
  },
  {
    path: "/products",
    name: "Products",
    icon: "pe-7s-box2",
    component: ProductContainer
  },
  {
    path: "/users",
    name: "Users",
    icon: "pe-7s-id",
    component: UserContainer
  },
  {
    path: "/transaction",
    name: "Transaction",
    icon: "pe-7s-credit",
    component: TransactionContainer
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "pe-7s-note2",
    component: ReportContainer
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons
  },
  {
    path: "/category",
    name: "Category",
    icon: "pe-7s-ribbon",
    component: CategoryContainer
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
]

export default dashboardRoutes
