import { combineReducers } from "redux"
import { navigation, loading, success, failed } from "./processor"
import { reports } from "./reports"
import { users } from "./users"
import { banners } from "./banners"
import { dashboardInfo } from "./dashboard"
import { products } from "./product"
import { transactions } from "./transaction"

const rootReducers = combineReducers({
	navigation,
	loading,
	success,
	failed,
	users,
	reports,
	banners,
	dashboardInfo,
	products,
	transactions
})

export default rootReducers
