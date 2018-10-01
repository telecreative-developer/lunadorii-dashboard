import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import { setNavigation } from "../actions/processor"
import Report from "../views/Report/Report"
import ReportDetail from "../views/Report/ReportDetail"
import { fetchReports, sendReportReply, readReport } from "../actions/reports"
const db = new PouchDB("lunadorii")

class ReportContainer extends React.Component {
	constructor(props) {
		super(props)

		const {
			report_id,
			name,
			email,
			subject,
			content,
			date,
			reply
		} = props.navigationReportData

		this.state = {
			searchByTitle: "",
			report_id: report_id,
			name: name,
			email: email,
			subject: subject,
			content: content,
			date: date,
			reply: reply,
			replyMessage: ""
		}
	}

	componentWillMount() {
		db.get("session").then(doc => this.props.fetchReports(doc.accessToken))
	}

	async handleShowReportDetail(data) {
		const attributes = data.target.attributes
		const report_id = attributes.getNamedItem("data-report-id").value
		const name = attributes.getNamedItem("data-report-name").value
		const email = attributes.getNamedItem("data-report-email").value
		const subject = attributes.getNamedItem("data-report-subject").value
		const content = attributes.getNamedItem("data-report-content").value
		const read = attributes.getNamedItem("data-report-read").value
		const date = attributes.getNamedItem("data-report-date").value
		const reply = attributes.getNamedItem("data-report-reply").value

		await this.props.setNavigation({
			report: "report-detail",
			report_data: {
				report_id,
				name,
				email,
				subject,
				content,
				date,
				reply: JSON.parse(reply)
			}
		})

		await this.setState({
			report_id,
			name,
			email,
			subject,
			content,
			date,
			reply: JSON.parse(reply)
		})

		if (!read) {
			db.get("session").then(doc =>
				this.props.readReport(report_id, doc.accessToken)
			)
		}
	}

	handleCloseReportDetail() {
		this.props.setNavigation({
			report: "report"
		})
	}

	handleSendReply() {
		const { report_id, subject, replyMessage } = this.state

		db.get("session")
			.then(doc => {
				this.props.sendReportReply(
					{
						subject,
						content: replyMessage,
						report_id: report_id,
						admin_id: doc.admin_id
					},
					doc.accessToken
				)
				return doc.admin_id
			})
			.then(admin_id => {
				this.setState({
					reply: [
						{
							subject: "Reply From : " + subject,
							content: replyMessage,
							admin_id: admin_id,
							report_id: report_id
						}
					]
				})
			})
	}

	render() {
		const { reports, navigationReport } = this.props
		const {
			name,
			email,
			subject,
			content,
			date,
			replyMessage,
			reply,
			searchByTitle
		} = this.state

		if (navigationReport === "report-detail") {
			return (
				<ReportDetail
					name={name}
					email={email}
					subject={subject}
					content={content}
					date={date}
					reply={reply}
					onSendReply={() => this.handleSendReply()}
					replyMessage={replyMessage}
					onChangeReplyMessage={e =>
						this.setState({ replyMessage: e.target.value })
					}
					onCloseReport={this.handleCloseReportDetail.bind(this)}
				/>
			)
		}

		return (
			<Report
				reports={reports}
				onShowReport={this.handleShowReportDetail.bind(this)}
				searchByTitle={searchByTitle}
				onChangeSearch={e => this.setState({ searchByTitle: e.target.value.toLowerCase() })}
			/>
		)
	}
}

const mapStateToProps = state => ({
	reports: state.reports,
	navigationReport: state.navigation.report,
	navigationReportData: state.navigation.report_data
})

const mapDispatchToProps = dispatch => ({
	setNavigation: navigation => dispatch(setNavigation(navigation)),
	fetchReports: accessToken => dispatch(fetchReports(accessToken)),
	sendReportReply: (data, accessToken) =>
		dispatch(sendReportReply(data, accessToken)),
	readReport: (admin_id, accessToken) =>
		dispatch(readReport(admin_id, accessToken))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReportContainer)
