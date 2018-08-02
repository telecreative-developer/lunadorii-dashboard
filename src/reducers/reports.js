export const reports = (state = [], action) => {
	switch (action.type) {
		case "FETCH_REPORTS_SUCCESS":
			return action.payload
		default:
			return state
	}
}
