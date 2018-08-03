import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
const reduxFetch = new ReduxFetch()

export const fetchProducts = accessToken => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_PRODUCTS" }))
		return reduxFetch
			.get({
				url: server + "/products",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(setFailedAndBackToDefault(res.message, "FETCH_PRODUCTS"))
				} else {
					dispatch(fetchProductsSuccess(res.data))
					dispatch(setSuccessAndBackToDefault(res.message, "FETCH_PRODUCTS"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "FETCH_PRODUCTS")))
	}
}

const fetchProductsSuccess = data => ({
	type: "FETCH_PRODUCTS_SUCCESS",
	payload: data
})
