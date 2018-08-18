import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import AWS from "aws-sdk"
import awsConfig from "./lib/awsconfig"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
const s3 = new AWS.S3({
	accessKeyId: awsConfig.accessKeyId,
	secretAccessKey: awsConfig.secretAccessKey
})
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

const uploadImageProductToS3 = (product_id, thumbnails, accessToken) => {
	return dispatch => {
		return thumbnails.map(thumbnail => {
			return s3.upload(
				{
					ACL: "public-read",
					Body: thumbnail.thumbnail_origin,
					Key: `product-${Date.now()}.${
						thumbnail.thumbnail_origin.type.split("/")[1]
					}`,
					Bucket: awsConfig.bucket
				},
				(err, res) => {
					return reduxFetch
						.post({
							url: server + "/product-thumbnails",
							accessToken: accessToken,
							body: {
								product_id,
								thumbnail_url: res.Location
							}
						})
						.then(response => {
							if (response.status !== 201) {
								dispatch(
									setFailedAndBackToDefault(response.message, "ADD_PRODUCT")
								)
							} else {
								dispatch(setSuccessAndBackToDefault(res.message, "ADD_PRODUCT"))
							}
						})
						.catch(err =>
							dispatch(setFailedAndBackToDefault(err, "ADD_PRODUCT"))
						)
				}
			)
		})
	}
}

let keyProductThumbnail = 0
export const addProductThumbnail = thumbnail => {
	return {
		type: "ADD_PRODUCT_THUMBNAIL",
		payload: {
			key: keyProductThumbnail++,
			thumbnail_url: URL.createObjectURL(thumbnail),
			thumbnail_origin: thumbnail
		}
	}
}

export const addProduct = (data, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "ADD_PRODUCT" }))
		return reduxFetch
			.post({
				url: server + "/product",
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
					dispatch(setFailedAndBackToDefault(res.message, "ADD_PRODUCT"))
				} else {
					dispatch(
						uploadImageProductToS3(
							parseInt(res.data.product_id, 10),
							data.thumbnails,
							accessToken
						)
					)
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "ADD_PRODUCT")))
	}
}

export const deleteProduct = (product_id, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "DELETE_PRODUCT" }))

		return reduxFetch
			.delete({
				url: server + "/product/" + product_id,
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(setFailedAndBackToDefault(res.message, "DELETE_PRODUCT"))
				} else {
					dispatch(deleteProductReducer(product_id))
					dispatch(setSuccessAndBackToDefault(res.message, "DELETE_PRODUCT"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "DELETE_PRODUCT")))
	}
}

const deleteProductReducer = product_id => ({
	type: "DELETE_PRODUCT_REDUCER",
	product_id: parseInt(product_id, 10)
})

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
