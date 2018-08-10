import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
const reduxFetch = new ReduxFetch()

export const fetchReports = accessToken => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_REPORTS" }))
		return reduxFetch
			.get({
				url: server + "/reports",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(setFailedAndBackToDefault(res.message, "FETCH_REPORTS"))
				} else {
					dispatch(fetchReportsSuccess(res.data))
					dispatch(setSuccessAndBackToDefault(res.message, "FETCH_REPORTS"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "FETCH_REPORTS")))
	}
}

const fetchReportsSuccess = data => ({
	type: "FETCH_REPORTS_SUCCESS",
	payload: data
})

export const sendReportReply = (data, accessToken) => {
	return dispatch => {
		dispatch(sendReportReplyReducer(data))
		dispatch(setLoading({ status: true, process_on: "SEND_REPORT_REPLY" }))
		return reduxFetch
			.post({
				url: server + "/report/reply",
				accessToken: accessToken,
				body: {
					subject: "Reply From : " + data.subject,
					report_id: data.report_id,
					content: data.content,
					admin_id: data.admin_id
				}
			})
			.then(res => {
				if (res.status !== 201) {
					dispatch(setFailedAndBackToDefault(res.message, "SEND_REPORT_REPLY"))
				} else {
					dispatch(setSuccessAndBackToDefault(res.message, "SEND_REPORT_REPLY"))
				}
			})
			.catch(err =>
				dispatch(setFailedAndBackToDefault(err, "SEND_REPORT_REPLY"))
			)
	}
}

const sendReportReplyReducer = data => ({
	type: "SEND_REPORT_REPLY",
	payload: {
		subject: "Reply From : " + data.subject,
		content: data.content,
		admin_id: data.admin_id,
		report_id: data.report_id
	}
})

export const readReport = (admin_id, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "READ_REPORT" }))
		return reduxFetch
			.put({
				url: server + "/report/" + admin_id + "/read",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 201) {
					dispatch(setFailedAndBackToDefault(res.message, "READ_REPORT"))
				} else {
					dispatch(setSuccessAndBackToDefault(res.message, "READ_REPORT"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "READ_REPORT")))
	}
}
