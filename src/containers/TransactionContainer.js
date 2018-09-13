import React from "react"
import { connect } from "react-redux"
import PouchDB from "pouchdb"
import {
	fetchTransactions,
	fetchSingleTransaction
} from "../actions/transaction"
import { setNavigation } from "../actions/processor"
import Transaction from "../views/Transaction/Transaction"
import TransactionDetail from "../views/Transaction/TransactionDetail"
import NProgress from "nprogress"
const db = new PouchDB("lunadorii")

class TransactionContainer extends React.Component {
	constructor(props) {
		super(props)

		if (!props.transactions.length) {
			db.get("session").then(doc => props.fetchTransactions(doc.accessToken))
		}

		this.state = {
			searchByTitle: ""
		}
	}

	handleNavigateTransactionDetail(data) {
		const attributes = data.target.attributes
		const order_id = attributes.getNamedItem("data-order-id").value
		db.get("session")
			.then(doc => {
				NProgress.start()
				return doc
			})
			.then(doc => {
				NProgress.set(0.4)
				this.props.fetchSingleTransaction(order_id, doc.accessToken)
				return doc
			})
			.then(doc => {
				NProgress.done()
				this.props.setNavigation({ transaction: "transaction_detail" })
			})
	}

	handleNavigateToTransaction() {
		this.props.setNavigation({ transaction: "transaction" })
	}

	render() {
		const { navigationTransaction, transactions, transaction } = this.props
		const { searchByTitle } = this.state

		if (navigationTransaction === "transaction_detail") {
			return (
				<TransactionDetail
					transaction={transaction}
					onNavigateToTransaction={this.handleNavigateToTransaction.bind(this)}
				/>
			)
		}

		return (
			<Transaction
				transactions={transactions}
				onNavigateTransactionDetail={this.handleNavigateTransactionDetail.bind(
					this
				)}
				searchByTitle={searchByTitle}
				onChangeSearch={e => this.setState({ searchByTitle: e.target.value })}
			/>
		)
	}
}

const mapStateToProps = state => ({
	transactions: state.transactions,
	transaction: state.transaction,
	navigationTransaction: state.navigation.transaction,
	navigationTransactionData: state.navigation.transaction_data
})

const mapDispatchToProps = dispatch => ({
	fetchTransactions: accessToken => dispatch(fetchTransactions(accessToken)),
	fetchSingleTransaction: (order_id, accessToken) =>
		dispatch(fetchSingleTransaction(order_id, accessToken)),
	setNavigation: navigation => dispatch(setNavigation(navigation))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TransactionContainer)
