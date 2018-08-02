import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
const reduxFetch = new ReduxFetch()

export const fetchReports = ({ accessToken }) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_REPORTS" }))
		return reduxFetch
			.get({
				url: server + "/reports",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(setFailedAndBackToDefault(res.message, "FETCH_REPORTS"))
				} else {
					dispatch(fetchReportsSuccess(res.data))
					dispatch(setSuccessAndBackToDefault(res.message, "FETCH_REPORTS"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "FETCH_REPORTS")))
	}
}

const fetchReportsSuccess = data => ({
	type: "FETCH_REPORTS_SUCCESS",
	payload: data
})
