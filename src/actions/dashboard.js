import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
const reduxFetch = new ReduxFetch()

export const fetchDashboardInfo = ({ accessToken }) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_DASHBOARD_INFO" }))
		return reduxFetch
			.get({
				url: server + "/general/dashboard/admin",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(
						setFailedAndBackToDefault(res.message, "FETCH_DASHBOARD_INFO")
					)
				} else {
					dispatch(fetchDashboardInfoSuccess(res.data))
					dispatch(
						setSuccessAndBackToDefault(res.message, "FETCH_DASHBOARD_INFO")
					)
				}
			})
			.catch(err =>
				dispatch(setFailedAndBackToDefault(err, "FETCH_DASHBOARD_INFO"))
			)
	}
}

const fetchDashboardInfoSuccess = data => ({
	type: "FETCH_DASHBOARD_INFO_SUCCESS",
	payload: data
})
