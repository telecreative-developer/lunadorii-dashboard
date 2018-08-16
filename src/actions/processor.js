export const setNavigation = navigation => ({
	type: "SET_NAVIGATION",
	payload: navigation
})

export const setSuccessAndBackToDefault = (message, process_on) => {
	return async dispatch => {
		dispatch(
			setSuccess({
				status: true,
				message,
				process_on
			})
		)
		dispatch(setLoading({ status: false, process_on: null }))
		dispatch(setSuccess({ status: false, message: null, process_on: null }))
	}
}

export const setFailedAndBackToDefault = (message, process_on) => {
	return dispatch => {
		dispatch(
			setFailed({
				status: true,
				message,
				process_on
			})
		)
		dispatch(setLoading({ status: false, process_on: null }))
		dispatch(setFailed({ status: false, message: null, process_on: null }))
	}
}

export const setLoading = ({ status, process_on }) => {
	return {
		type: "SET_LOADING",
		status,
		process_on
	}
}

const setSuccess = ({ status, message, process_on }) => {
	return {
		type: "SET_SUCCESS",
		status,
		message,
		process_on
	}
}

const setFailed = ({ status, message, process_on }) => {
	return {
		type: "SET_FAILED",
		status,
		message,
		process_on
	}
}
