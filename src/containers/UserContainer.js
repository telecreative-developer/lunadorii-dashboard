import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import User from "../views/User/User"
import { fetchUsers } from "../actions/users"
const db = new PouchDB("lunadorii")

class UserContainer extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			searchByTitle: ""
		}
	}
	
	componentWillMount() {
		db.get("session").then(doc =>
			this.props.fetchUsers({ accessToken: doc.accessToken })
		)
	}

	render() {
		const { users } = this.props
		const { searchByTitle } = this.state
		return (
			<User 
				users={users}
				searchByTitle={searchByTitle}
				onChangeSearch={e => this.setState({ searchByTitle: e.target.value.toLowerCase() })}
			/>
		)
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
