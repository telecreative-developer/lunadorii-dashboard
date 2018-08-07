export const banners = (state = [], action) => {
	switch (action.type) {
		case "FETCH_BANNERS_SUCCESS":
			return action.payload.sort((a, b) => a.created_at - b.created_at)
		case "SET_ACTIVE_BANNER_REDUCER":
			return state
				.map(banner => ({
					...banner,
					active: banner.banner_id === action.banner_id ? true : banner.active
				}))
				.sort((a, b) => a.created_at - b.created_at)
		case "SET_UNACTIVE_BANNER_REDUCER":
			return state
				.map(banner => ({
					...banner,
					active: banner.banner_id === action.banner_id ? false : banner.active
				}))
				.sort((a, b) => a.created_at - b.created_at)
		default:
			return state
	}
}
