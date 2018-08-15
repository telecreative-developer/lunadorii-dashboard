export const banners = (state = [], action) => {
	switch (action.type) {
		case "FETCH_BANNERS_SUCCESS":
			return action.payload
		case "SET_ACTIVE_BANNER_REDUCER":
			return state.map(banner => ({
				...banner,
				active: banner.banner_id === action.banner_id ? true : banner.active
			}))
		case "SET_UNACTIVE_BANNER_REDUCER":
			return state.map(banner => ({
				...banner,
				active: banner.banner_id === action.banner_id ? false : banner.active
			}))
		case "DELETE_BANNER_REDUCER":
			return state.filter(banner => banner.banner_id !== action.banner_id)
		default:
			return state
	}
}
