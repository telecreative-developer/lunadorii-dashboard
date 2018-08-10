export const reports = (state = [], action) => {
	switch (action.type) {
		case "FETCH_REPORTS_SUCCESS":
			return action.payload.sort((a, b) => a.created_at - b.created_at)
		case "SEND_REPORT_REPLY":
			return state
				.map(d => ({
					...d,
					reply:
						d.report_id === parseInt(action.payload.report_id, 10)
							? [action.payload]
							: d.reply
				}))
				.sort((a, b) => a.created_at - b.created_at)
		default:
			return state
	}
}
