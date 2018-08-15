import server from "./lib/server"
import ReduxFetch from "./lib/reduxfetch"
import AWS from "aws-sdk"
import awsConfig from "./lib/awsconfig"
import {
	setFailedAndBackToDefault,
	setSuccessAndBackToDefault,
	setLoading
} from "./processor"
const s3 = new AWS.S3({
	accessKeyId: awsConfig.accessKeyId,
	secretAccessKey: awsConfig.secretAccessKey
})
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

const uploadImageBannerToS3 = thumbnails => {
	return s3
		.upload({
			ACL: "public-read",
			Body: thumbnails[0],
			Key: `banner-${Date.now()}.${thumbnails[0].type.split("/")[1]}`,
			Bucket: awsConfig.bucket
		})
		.promise()
}

export const addBanner = (data, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "ADD_BANNER" }))
		return uploadImageBannerToS3(data.thumbnails)
			.then(res => {
				return reduxFetch.post({
					url: server + "/banner",
					accessToken: accessToken,
					body: {
						title: data.title,
						thumbnail_url: res.Location,
						type: data.type,
						category: data.category
					}
				})
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

export const updateBannerWithImage = (data, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "UPDATE_BANNER" }))
		return uploadImageBannerToS3(data.thumbnails)
			.then(res => {
				return reduxFetch.put({
					url: server + "/banner/" + data.banner_id,
					accessToken: accessToken,
					body: {
						title: data.title,
						thumbnail_url: res.Location,
						type: data.type,
						category: data.category
					}
				})
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
		dispatch(setActiveBannerReducer(banner_id))
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

const setActiveBannerReducer = banner_id => ({
	type: "SET_ACTIVE_BANNER_REDUCER",
	banner_id: parseInt(banner_id, 10)
})

export const setUnactiveBanner = (banner_id, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "SET_UNACTIVE_BANNER" }))
		dispatch(setUnactiveBannerReducer(banner_id))
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

const setUnactiveBannerReducer = banner_id => ({
	type: "SET_UNACTIVE_BANNER_REDUCER",
	banner_id: parseInt(banner_id, 10)
})

export const deleteBanner = (banner_id, accessToken) => {
	return dispatch => {
		dispatch(setLoading({ status: true, process_on: "DELETE_BANNER" }))
		dispatch(deleteBannerReducer(banner_id))
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

const deleteBannerReducer = banner_id => ({
	type: "DELETE_BANNER_REDUCER",
	banner_id: parseInt(banner_id, 10)
})
