export const products = (state = [], action) => {
	switch (action.type) {
		case "FETCH_PRODUCTS_SUCCESS":
			return action.payload
		case "DELETE_PRODUCT_REDUCER":
			return state.filter(product => product.product_id !== action.product_id)
		default:
			return state
	}
}

export const productThumbnails = (state = [], action) => {
	switch (action.type) {
		case "ADD_PRODUCT_THUMBNAIL":
			return state.concat(action.payload)
		default:
			return state
	}
}

export const subcategories = (state = [], action) => {
	switch (action.type) {
		case "FETCH_SUBCATEGORIES_SUCCESS":
			return action.payload
		default:
			return state
	}
}

export const brands = (state = [], action) => {
	switch (action.type) {
		case "FETCH_BRANDS_SUCCESS":
			return action.payload
		default:
			return state
	}
}
