export const products = (state = [], action) => {
	switch (action.type) {
		case "FETCH_PRODUCTS_SUCCESS":
			return action.payload
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
