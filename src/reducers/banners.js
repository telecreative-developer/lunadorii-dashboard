export const banners = (state = [], action) => {
	switch (action.type) {
		case "FETCH_BANNERS_SUCCESS":
			return action.payload
		default:
			return state
	}
}
