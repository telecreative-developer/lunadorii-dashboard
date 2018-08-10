import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
const reduxFetch = new ReduxFetch()

export const fetchTransactions = accessToken => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_TRANSACTIONS" }))
		return reduxFetch
			.get({
				url: server + "/order/histories",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(setFailedAndBackToDefault(res.message, "FETCH_TRANSACTIONS"))
				} else {
					dispatch(fetchUsersSuccess(res.data))
					dispatch(
						setSuccessAndBackToDefault(res.message, "FETCH_TRANSACTIONS")
					)
				}
			})
			.catch(err =>
				dispatch(setFailedAndBackToDefault(err, "FETCH_TRANSACTIONS"))
			)
	}
}

const fetchUsersSuccess = data => ({
	type: "FETCH_TRANSACTIONS_SUCCESS",
	payload: data
})
