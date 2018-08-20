const initialState = {
	status: false,
	message: null,
	process_on: null
}

const initialStateLoading = {
	status: false,
	process_on: null
}

const initialStateNavigation = {
	dashboard: "dashboard",
	banner: "banner",
	banner_data: {
		banner_id: "",
		thumbnails: [],
		thumbanil_url: "",
		category: "general",
		type: "web"
	},
	product: "update-product",
	product_data: {
		title: "",
		description: "",
		detail: "",
		price: 0,
		to_use: "",
		discount: false,
		discount_percentage: 0,
		weight_gram: 0,
		subcategory: "",
		product_subcategory_id: 1,
		brand: "",
		product_brand_id: 1,
		thumbnails: []
	},
	user: "user",
	user_data: null,
	report: "report",
	report_data: {
		report_id: "",
		name: "",
		email: "",
		subject: "",
		content: "",
		date: "",
		reply: []
	}
}

export const navigation = (state = initialStateNavigation, action) => {
	switch (action.type) {
		case "SET_NAVIGATION":
			return { ...state, ...action.payload }
		default:
			return state
	}
}

export const loading = (state = initialStateLoading, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return {
				status: action.status,
				process_on: action.process_on
			}
		default:
			return state
	}
}

export const success = (state = initialState, action) => {
	switch (action.type) {
		case "SET_SUCCESS":
			return {
				status: action.status,
				message: action.message,
				process_on: action.process_on
			}
		default:
			return state
	}
}

export const failed = (state = initialState, action) => {
	switch (action.type) {
		case "SET_FAILED":
			return {
				status: action.status,
				message: action.message,
				process_on: action.process_on
			}
		default:
			return state
	}
}
