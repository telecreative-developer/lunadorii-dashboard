const initialState = {
	users: {
		users_length: 0,
		users_register_today_length: 0
	},
	reports: {
		reports_length: 0,
		reports_not_read_length: 0
	},
	orders: {
		orders_length: 0,
		orders_checkout_length: 0
	},
	products: {
		products_length: 0,
		products_wishlisted_length: 0
	},
	banners: {
		banners_active_length: 0,
		banners_length: 0
	}
}

export const dashboardInfo = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_DASHBOARD_INFO_SUCCESS":
			return action.payload
		default:
			return state
	}
}
