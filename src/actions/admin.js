import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
import PouchDB from "pouchdb"
const db = new PouchDB("lunadorii")
const reduxFetch = new ReduxFetch()

export const fetchAdminProfile = ({ admin_id, accessToken }) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_ADMIN_PROFILE" }))
		return reduxFetch
			.get({
				url: server + "/admin/" + admin_id,
				accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(
						setFailedAndBackToDefault(res.message, "FETCH_ADMIN_PROFILE")
					)
				} else {
					dispatch(saveAdminProfile(res.data[0]))
					dispatch(
						setSuccessAndBackToDefault(res.message, "FETCH_ADMIN_PROFILE")
					)
				}
			})
			.catch(err => setFailedAndBackToDefault(err, "FETCH_ADMIN_PROFILE"))
	}
}

const saveAdminProfile = data => {
	return () => {
		db.put({ _id: "admin", ...data }).catch(err => {
			if (err.name === "conflict") {
				db.get("admin")
					.then(admin => db.remove(admin))
					.then(() => db.put({ _id: "admin", ...data }))
			}
		})
	}
}
