class ReduxFetch {
	async http({ url, method, accessToken, body }) {
		try {
			const res = await fetch(url, {
				method: method,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: accessToken
				},
				body: JSON.stringify(body)
			})
			const data = await res.json()
			return data
		} catch (e) {
			return e
		}
	}

	async post({ url, body, accessToken }) {
		try {
			const res = await this.http({
				url: url,
				method: "POST",
				accessToken: accessToken,
				body: body
			})
			return res
		} catch (e) {
			return e
		}
	}

	async get({ url, accessToken }) {
		try {
			const res = await this.http({
				url: url,
				method: "GET",
				accessToken: accessToken
			})
			return res
		} catch (e) {
			return e
		}
	}

	async put({ url, body, accessToken }) {
		try {
			const res = await this.http({
				url: url,
				method: "PUT",
				accessToken: accessToken,
				body: body
			})
			return res
		} catch (e) {
			return e
		}
	}

	async delete({ url, accessToken }) {
		try {
			const res = await this.http({
				url: url,
				method: "DELETE",
				accessToken: accessToken
			})
			return res
		} catch (e) {
			return e
		}
	}
}

export default ReduxFetch
