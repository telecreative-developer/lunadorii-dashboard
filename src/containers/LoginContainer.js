import React from "react"
import { connect } from "react-redux"
import Login from "../layouts/Login/Login"
import { login } from "../actions/login"

class LoginContainer extends React.Component {
	constructor() {
		super()

		this.state = {
			username: "",
			password: ""
		}
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
				alert(snapshot.payload.message)
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
		const { username, password } = this.state
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
