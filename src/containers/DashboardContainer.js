import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import Dashboard from "../views/Dashboard/Dashboard"
import { fetchDashboardInfo } from "../actions/dashboard"
const db = new PouchDB("lunadorii")

class DashboardContainer extends React.Component {
	componentWillMount() {
		db.get("session").then(doc =>
			this.props.fetchDashboardInfo({ accessToken: doc.accessToken })
		)
	}

	render() {
		const { dashboardInfo } = this.props
		return (
			<Dashboard
				users={dashboardInfo.users}
				orders={dashboardInfo.orders}
				products={dashboardInfo.products}
				reports={dashboardInfo.reports}
			/>
		)
	}
}

const mapStateToProps = state => ({
	dashboardInfo: state.dashboardInfo
})

const mapDispatchToProps = dispacth => ({
	fetchDashboardInfo: ({ accessToken }) =>
		dispacth(fetchDashboardInfo({ accessToken }))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DashboardContainer)
