import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
const reduxFetch = new ReduxFetch()

export const fetchTransactions = accessToken => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_TRANSACTIONS" }))
		return reduxFetch
			.get({
				url: server + "/order/histories",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(setFailedAndBackToDefault(res.message, "FETCH_TRANSACTIONS"))
				} else {
					dispatch(fetchTransactionSuccess(res.data))
					dispatch(
						setSuccessAndBackToDefault(res.message, "FETCH_TRANSACTIONS")
					)
				}
			})
			.catch(err =>
				dispatch(setFailedAndBackToDefault(err, "FETCH_TRANSACTIONS"))
			)
	}
}

const fetchTransactionSuccess = data => ({
	type: "FETCH_TRANSACTIONS_SUCCESS",
	payload: data
})

export const fetchSingleTransaction = (order_id, accessToken) => {
	return dispatch => {
		dispatch(
			setLoading({ status: true, process_on: "FETCH_SINGLE_TRANSACTION" })
		)
		return reduxFetch
			.get({
				url: server + `/order/history/single/${order_id}/admin`,
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(
						setFailedAndBackToDefault(res.message, "FETCH_SINGLE_TRANSACTION")
					)
				} else {
					dispatch(fetchSingleTransactionSuccess(res.data[0]))
					dispatch(
						setSuccessAndBackToDefault(res.message, "FETCH_SINGLE_TRANSACTION")
					)
				}
			})
			.catch(err =>
				dispatch(setFailedAndBackToDefault(err, "FETCH_SINGLE_TRANSACTION"))
			)
	}
}

const fetchSingleTransactionSuccess = data => ({
	type: "FETCH_SINGLE_TRANSACTION_SUCCESS",
	payload: data
})
