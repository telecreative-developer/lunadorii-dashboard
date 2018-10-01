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
		case "SET_PRODUCT_THUMBNAIL":
			return state.concat(action.payload)
		case "REMOVE_PRODUCT_THUMBNAIL":
			return state.filter(d => d.key !== action.key)
		case "CLEAR_PRODUCT_THUMBNAIL":
			return state = []
		default:
			return state
	}
}

export const productThumbnailsWillAdd = (state = [], action) => {
	switch (action.type) {
		case "ADD_PRODUCT_THUMBNAIL_WHEN_UPDATE":
			return state.concat(action.payload)
		case "CANCEL_ADD_PRODUCT_THUMBNAIL_WHEN_UPDATE":
			return state.filter(d => d.key != action.payload.key)
		default:
			return state
	}
}

export const productThumbnailsWillRemove = (state = [], action) => {
	switch (action.type) {
		case "REMOVE_PRODUCT_THUMBNAIL_WHEN_UPDATE":
			return state.concat(action.payload)
		default:
			return state
	}
}

export const categories = (state = [], action) => {
	switch (action.type) {
		case "FETCH_CATEGORIES_SUCCESS":
			return action.payload
		default:
			return state
	}
}

export const subcategories = (state = [], action) => {
	switch (action.type) {
		case "FETCH_SUBCATEGORIES_SUCCESS":
			return action.payload
		case "DELETE_SUBCATEGORIES_REDUCER":
			return state.filter(subcategories => subcategories.product_subcategory_id !== action.product_subcategory_id)
		default:
			return state
	}
}

export const brands = (state = [], action) => {
	switch (action.type) {
		case "FETCH_BRANDS_SUCCESS":
			return action.payload
		case "DELETE_BRANDS_REDUCER":
			return state.filter(brand => brand.product_brand_id !== action.product_brand_id)
		default:
			return state
	}
}
