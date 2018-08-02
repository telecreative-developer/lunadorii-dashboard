import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
import { fetchAdminProfile } from "./admin"
import PouchDB from "pouchdb"
const db = new PouchDB("lunadorii")
const reduxFetch = new ReduxFetch()

export const login = ({ username, password }) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "LOGIN" }))
		return reduxFetch
			.post({
				url: server + "/auth/admin",
				body: {
					username: username,
					password: password
				}
			})
			.then(res => {
				if (res.status !== 201) {
					dispatch(setFailedAndBackToDefault(res.message, "LOGIN"))
				} else {
					dispatch(saveSession(res))
					dispatch(
						fetchAdminProfile({
							admin_id: res.admin_id,
							accessToken: res.accessToken
						})
					)
					dispatch(setSuccessAndBackToDefault(res.message, "LOGIN"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "LOGIN")))
	}
}

const saveSession = data => {
	return () => {
		db.put({
			_id: "session",
			admin_id: data.admin_id,
			accessToken: data.accessToken,
			refreshToken: data.refreshToken
		}).catch(err => {
			if (err.name === "conflict") {
				db.get("session")
					.then(session => db.remove(session))
					.then(() =>
						db.put({
							_id: "session",
							admin_id: data.admin_id,
							accessToken: data.accessToken,
							refreshToken: data.refreshToken
						})
					)
			}
		})
	}
}
