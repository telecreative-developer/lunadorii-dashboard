import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import S3FileUpload from "react-s3"
import { configBanner } from "./lib/s3"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
const reduxFetch = new ReduxFetch()

export const fetchBanners = accessToken => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "FETCH_BANNERS" }))
		return reduxFetch
			.get({
				url: server + "/banners/admin",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(setFailedAndBackToDefault(res.message, "FETCH_BANNERS"))
				} else {
					dispatch(fetchBannersSuccess(res.data))
					dispatch(setSuccessAndBackToDefault(res.message, "FETCH_BANNERS"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "FETCH_BANNERS")))
	}
}

const fetchBannersSuccess = data => ({
	type: "FETCH_BANNERS_SUCCESS",
	payload: data
})

export const uploadImageBannerToS3 = thumbnail => {
	return () => {
		return S3FileUpload.uploadFile(thumbnail, configBanner)
			.then(data => console.log(data))
			.catch(err => console.log(err))
	}
}

export const addBanner = (data, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "ADD_BANNER" }))
		return reduxFetch
			.post({
				url: server + "/banner",
				accessToken: accessToken,
				body: {
					title: data.title,
					thumbnail_url: data.thumbnail_url,
					type: data.type,
					category: data.category
				}
			})
			.then(res => {
				if (res.status !== 201) {
					dispatch(setFailedAndBackToDefault(res.message, "ADD_BANNER"))
				} else {
					dispatch(setSuccessAndBackToDefault(res.message, "ADD_BANNER"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "ADD_BANNER")))
	}
}

export const updateBanner = (data, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "UPDATE_BANNER" }))
		return reduxFetch
			.put({
				url: server + "/banner/" + data.banner_id,
				accessToken: accessToken,
				body: {
					title: data.title,
					thumbnail_url: data.thumbnail_url,
					type: data.type,
					category: data.category
				}
			})
			.then(res => {
				if (res.status !== 201) {
					dispatch(setFailedAndBackToDefault(res.message, "UPDATE_BANNER"))
				} else {
					dispatch(setSuccessAndBackToDefault(res.message, "UPDATE_BANNER"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "UPDATE_BANNER")))
	}
}

export const setActiveBanner = (banner_id, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "SET_ACTIVE_BANNER" }))
		return reduxFetch
			.put({
				url: server + "/banner/" + banner_id + "/active",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 201) {
					dispatch(setFailedAndBackToDefault(res.message, "SET_ACTIVE_BANNER"))
				} else {
					dispatch(setSuccessAndBackToDefault(res.message, "SET_ACTIVE_BANNER"))
				}
			})
			.catch(err =>
				dispatch(setFailedAndBackToDefault(err, "SET_ACTIVE_BANNER"))
			)
	}
}

export const setUnactiveBanner = (banner_id, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "SET_UNACTIVE_BANNER" }))
		return reduxFetch
			.put({
				url: server + "/banner/" + banner_id + "/unactive",
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 201) {
					dispatch(
						setFailedAndBackToDefault(res.message, "SET_UNACTIVE_BANNER")
					)
				} else {
					dispatch(
						setSuccessAndBackToDefault(res.message, "SET_UNACTIVE_BANNER")
					)
				}
			})
			.catch(err =>
				dispatch(setFailedAndBackToDefault(err, "SET_UNACTIVE_BANNER"))
			)
	}
}

export const deleteBanner = (banner_id, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "DELETE_BANNER" }))
		return reduxFetch
			.delete({
				url: server + "/banner/" + banner_id,
				accessToken: accessToken
			})
			.then(res => {
				if (res.status !== 200) {
					dispatch(setFailedAndBackToDefault(res.message, "DELETE_BANNER"))
				} else {
					dispatch(setSuccessAndBackToDefault(res.message, "DELETE_BANNER"))
				}
			})
			.catch(err => dispatch(setFailedAndBackToDefault(err, "DELETE_BANNER")))
	}
}
