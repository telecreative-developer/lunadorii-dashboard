export const products = (state = [], action) => {
	switch (action.type) {
		case "FETCH_PRODUCTS_SUCCESS":
			return action.payload
		default:
			return state
	}
}
