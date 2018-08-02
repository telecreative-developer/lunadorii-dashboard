import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import Report from "../views/Report/Report"
import { fetchReports } from "../actions/reports"
const db = new PouchDB("lunadorii")

class ReportContainer extends React.Component {
	componentWillMount() {
		db.get("session").then(doc =>
			this.props.fetchReports({ accessToken: doc.accessToken })
		)
	}

	render() {
		const { reports } = this.props
		return <Report reports={reports} />
	}
}

const mapStateToProps = state => {
	console.log(state.reports)
	return {
		reports: state.reports
	}
}

const mapDispatchToProps = dispacth => ({
	fetchReports: ({ accessToken }) => dispacth(fetchReports({ accessToken }))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReportContainer)
