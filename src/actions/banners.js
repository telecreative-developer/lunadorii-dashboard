import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
const reduxFetch = new ReduxFetch()

export const fetchBanners = ({ accessToken }) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_BANNERS" }))
		return reduxFetch
			.get({
				url: server + "/banners/admin",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(setFailedAndBackToDefault(res.message, "FETCH_BANNERS"))
				} else {
					dispatch(fetchBannersSuccess(res.data))
					dispatch(setSuccessAndBackToDefault(res.message, "FETCH_BANNERS"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "FETCH_BANNERS")))
	}
}

const fetchBannersSuccess = data => ({
	type: "FETCH_BANNERS_SUCCESS",
	payload: data
})
