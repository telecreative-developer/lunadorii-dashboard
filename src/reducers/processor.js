const initialState = {
	status: false,
	message: null,
	process_on: null
}

const initialStateLoading = {
	status: false,
	process_on: null
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
