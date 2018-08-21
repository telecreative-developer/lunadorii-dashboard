import { combineReducers } from "redux"
import { navigation, loading, success, failed } from "./processor"
import { reports } from "./reports"
import { users } from "./users"
import { banners } from "./banners"
import { dashboardInfo } from "./dashboard"
import { products, subcategories, brands, productThumbnails } from "./product"
import { transactions, transaction } from "./transaction"

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
	productThumbnails,
	subcategories,
	brands,
	transactions,
	transaction
})

export default rootReducers
