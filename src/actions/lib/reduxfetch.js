class ReduxFetch {
	http({ url, method, accessToken, body }) {
		return fetch(url, {
			method: method,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: accessToken
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.catch(err => err)
	}

	post({ url, body, accessToken }) {
		return this.http({
			url: url,
			method: "POST",
			accessToken: accessToken,
			body: body
		})
			.then(res => res)
			.catch(err => err)
	}

	get({ url, accessToken }) {
		return this.http({
			url: url,
			method: "GET",
			accessToken: accessToken
		})
			.then(res => res)
			.catch(err => err)
	}

	put({ url, body, accessToken }) {
		return this.http({
			url: url,
			method: "PUT",
			accessToken: accessToken,
			body: body
		})
			.then(res => res)
			.catch(err => err)
	}

	delete({ url, accessToken }) {
		return this.http({
			url: url,
			method: "DELETE",
			accessToken: accessToken
		})
			.then(res => res)
			.catch(err => err)
	}
}

export default ReduxFetch
