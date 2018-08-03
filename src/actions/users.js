import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
const reduxFetch = new ReduxFetch()

export const fetchUsers = ({ accessToken }) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_USERS" }))
		return reduxFetch
			.get({
				url: server + "/users",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(setFailedAndBackToDefault(res.message, "FETCH_USERS"))
				} else {
					dispatch(fetchUsersSuccess(res.data))
					dispatch(setSuccessAndBackToDefault(res.message, "FETCH_USERS"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "FETCH_USERS")))
	}
}

const fetchUsersSuccess = data => ({
	type: "FETCH_USERS_SUCCESS",
	payload: data
})
