import React from "react"
import { connect } from "react-redux"
import PouchDB from "pouchdb"
import { fetchTransactions } from "../actions/transaction"
import Transaction from "../views/Transaction/Transaction"
const db = new PouchDB("lunadorii")

class TransactionContainer extends React.Component {
	componentWillMount() {
		db.get("session").then(doc => this.props.fetchTransactions(doc.accessToken))
	}

	render() {
		const { transactions } = this.props
		return <Transaction transactions={transactions} />
	}
}

const mapStateToProps = state => ({
	transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
	fetchTransactions: accessToken => dispatch(fetchTransactions(accessToken))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TransactionContainer)
