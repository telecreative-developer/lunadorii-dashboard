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

export const addProduct = (data, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "ADD_PRODUCT" }))
		return reduxFetch
			.post({
				url: server + "/banner",
				accessToken: accessToken,
				body: {
					product: data.product,
					description: data.description,
					detail: data.detail,
					to_use: data.to_use,
					price: data.price,
					discount: data.discount,
					discount_percentage: data.discount_percentage,
					product_subcategory_id: data.product_subcategory_id,
					product_brand_id: data.product_brand_id,
					weight_gram: data.weight_gram
				}
			})
			.then(res => {
				if (res.status !== 201) {
					dispatch(setFailedAndBackToDefault(res.message, "ADD_REPORT"))
				} else {
					dispatch(setSuccessAndBackToDefault(res.message, "ADD_REPORT"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "ADD_REPORT")))
	}
}
