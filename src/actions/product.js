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
					product: data.title,
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

export const fetchSubcategories = () => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_SUBCATEGORIES" }))
		return reduxFetch
			.get({
				url: server + "/product-subcategories"
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(
						setFailedAndBackToDefault(res.message, "FETCH_SUBCATEGORIES")
					)
				} else {
					dispatch(fetchSubategoriesSuccess(res.data))
					dispatch(
						setSuccessAndBackToDefault(res.message, "FETCH_SUBCATEGORIES")
					)
				}
			})
			.catch(err =>
				dispatch(setFailedAndBackToDefault(err, "FETCH_SUBCATEGORIES"))
			)
	}
}

const fetchSubategoriesSuccess = data => ({
	type: "FETCH_SUBCATEGORIES_SUCCESS",
	payload: data
})

export const fetchBrands = () => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_BRANDS" }))
		return reduxFetch
			.get({
				url: server + "/product-brands"
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(setFailedAndBackToDefault(res.message, "FETCH_BRANDS"))
				} else {
					dispatch(fetchBrandsSuccess(res.data))
					dispatch(setSuccessAndBackToDefault(res.message, "FETCH_BRANDS"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "FETCH_BRANDS")))
	}
}

const fetchBrandsSuccess = data => ({
	type: "FETCH_BRANDS_SUCCESS",
	payload: data
})
