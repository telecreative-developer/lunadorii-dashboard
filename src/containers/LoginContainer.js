import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import Login from "../layouts/Login/Login"
import { login } from "../actions/login"
const db = new PouchDB("lunadorii")

class LoginContainer extends React.Component {
	constructor() {
		super()

		this.state = {
			username: "",
			password: "",
			loading: true
		}
	}

	componentDidMount() {
		db.get("session")
			.then(doc => window.location.replace("/"))
			.catch(err => this.setState({ loading: false }))
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (prevProps.failed.status) {
			return { status: "failed", payload: prevProps.failed }
		}

		if (prevProps.success.status) {
			return { status: "success", payload: prevProps.success }
		}

		return null
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot !== null) {
			if (
				snapshot.status === "success" &&
				snapshot.payload.status &&
				snapshot.payload.process_on === "LOGIN"
			) {
				window.location.href = "/"
			}

			if (
				snapshot.status === "failed" &&
				snapshot.payload.status &&
				snapshot.payload.process_on === "LOGIN"
			) {
				alert(snapshot.payload.message)
			}
		}
	}

	getLoading() {
		const { status, process_on } = this.props.loading
		if (status && process_on === "LOGIN") {
			return true
		}

		return false
	}

	render() {
		const { username, password, loading } = this.state

		if (loading) {
			return(
				<div className="loading">
					<div className="loading center">
						<div className="loading-bar">
						</div>
					</div>
				</div>
			)
		}

		return (
			<Login
				username={username}
				password={password}
				loading={this.getLoading()}
				onInputUsername={e => this.setState({ username: e.target.value })}
				onInputPassword={e => this.setState({ password: e.target.value })}
				onLogin={() => this.props.login({ username, password })}
			/>
		)
	}
}

const mapStateToProps = state => ({
	loading: state.loading,
	success: state.success,
	failed: state.failed
})

const mapDispatchToProps = dispatch => ({
	login: data => dispatch(login(data))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer)
