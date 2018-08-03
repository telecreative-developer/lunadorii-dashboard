import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import User from "../views/User/User"
import { fetchUsers } from "../actions/users"
const db = new PouchDB("lunadorii")

class UserContainer extends React.Component {
	componentWillMount() {
		db.get("session").then(doc =>
			this.props.fetchUsers({ accessToken: doc.accessToken })
		)
	}

	render() {
		const { users } = this.props
		return <User users={users} />
	}
}

const mapStateToProps = state => ({
	users: state.users
})

const mapDispatchToProps = dispacth => ({
	fetchUsers: ({ accessToken }) => dispacth(fetchUsers({ accessToken }))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserContainer)
