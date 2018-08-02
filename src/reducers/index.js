import { combineReducers } from "redux"
import { loading, success, failed } from "./processor"
import { reports } from "./reports"

const rootReducers = combineReducers({
	loading,
	success,
	failed,
	reports
})

export default rootReducers
