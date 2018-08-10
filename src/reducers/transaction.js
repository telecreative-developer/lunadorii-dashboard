export const transactions = (state = [], action) => {
	switch (action.type) {
		case "FETCH_TRANSACTIONS_SUCCESS":
			return action.payload
		default:
			return state
	}
}
