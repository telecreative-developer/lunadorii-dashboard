import React from "react"
import { connect } from "react-redux"
import PouchDB from "pouchdb"
import {
	fetchTransactions,
	fetchSingleTransaction,
	updateTransactionStatusPacking,
	updateTransactionStatusShipping
} from "../actions/transaction"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { setNavigation } from "../actions/processor"
import Transaction from "../views/Transaction/Transaction"
import TransactionDetail from "../views/Transaction/TransactionDetail"
import NProgress from "nprogress"
const db = new PouchDB("lunadorii")
const ReactSwal = withReactContent(Swal)

const sweetAlert = (title, type, confirmButtonText) => {
	return ReactSwal.fire({ title, type, confirmButtonText })
}

class TransactionContainer extends React.Component {
	constructor(props) {
		super(props)

		if (!props.transactions.length) {
			db.get("session").then(doc => props.fetchTransactions(doc.accessToken))
		}

		this.state = {
			searchByTitle: "",
			resi: ""
		}
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		const { success, failed } = prevProps

		if (success.status && success.process_on === "UPDATE_TRANSACTION_STATUS_PACKING") {
			return "UPDATE_TRANSACTION_STATUS_PACKING_SUCCESS"
		}

		if (failed.status && failed.process_on === "UPDATE_TRANSACTION_STATUS_PACKING") {
			return "UPDATE_TRANSACTION_STATUS_PACKING_FAILED"
		}

		if (success.status && success.process_on === "UPDATE_TRANSACTION_STATUS_SHIPPING") {
			return "UPDATE_TRANSACTION_STATUS_SHIPPING_SUCCESS"
		}

		if (failed.status && failed.process_on === "UPDATE_TRANSACTION_STATUS_SHIPPING") {
			return "UPDATE_TRANSACTION_STATUS_SHIPPING_FAILED"
		}

		return null
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot === "UPDATE_TRANSACTION_STATUS_PACKING_SUCCESS") {
			sweetAlert("Success Update Transaction Status", "success", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "UPDATE_TRANSACTION_STATUS_PACKING_FAILED") {
			sweetAlert("Failed Update Transaction Status", "error", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "UPDATE_TRANSACTION_STATUS_SHIPPING_SUCCESS") {
			sweetAlert("Success Update Transaction Status", "success", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "UPDATE_TRANSACTION_STATUS_SHIPPING_FAILED") {
			sweetAlert("Failed Update Transaction Status", "error", "Close").then(res => {
				return window.location.reload()
			})
		}

		// if (snapshot === "DELETE_PRODUCT_SUCCESS") {
		// 	sweetAlert("Success Delete Product", "success", "Close").then(res => {
		// 		return window.location.reload()
		// 	})
		// }

		// if (snapshot === "DELETE_PRODUCT_FAILED") {
		// 	sweetAlert("Failed Delete Product", "error", "Close").then(res => {
		// 		return window.location.reload()
		// 	})
		// }
	}

	handleChangeToPacking(data) {
		const attributes = data.target.attributes
		const transaction_code = attributes.getNamedItem("data-transaction-code").value
		db.get("session").then(doc => 
			this.props.updateTransactionStatusPacking(transaction_code, doc.accessToken)
		)
	}

	handleChangeToShipping(data) {
		const { resi } = this.state
		const attributes = data.target.attributes
		const transaction_code = attributes.getNamedItem("data-transaction-code").value
		db.get("session").then(doc => 
			this.props.updateTransactionStatusShipping(transaction_code, resi, doc.accessToken)
		)
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
		const { navigationTransaction, transactions, transaction, loading } = this.props
		const { searchByTitle, resi } = this.state

		if (navigationTransaction === "transaction_detail") {
			return (
				<TransactionDetail
					transaction={transaction}
					onChangeResi={e => this.setState({ resi: e.target.value })}
					resi={resi}
					loadingProduct={
						(loading.status && loading.process_on === "UPDATE_TRANSACTION_STATUS_PACKING") ||
						(loading.status && loading.process_on === "UPDATE_TRANSACTION_STATUS_SHIPPING")
					}
					handleChangeToShipping={this.handleChangeToShipping.bind(this)}
					handleChangeToPacking={this.handleChangeToPacking.bind(this)}
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
				onChangeSearch={e => this.setState({ searchByTitle: e.target.value.toLowerCase() })}
			/>
		)
	}
}

const mapStateToProps = state => ({
	transactions: state.transactions,
	transaction: state.transaction,
	navigationTransaction: state.navigation.transaction,
	navigationTransactionData: state.navigation.transaction_data,
	success: state.success,
	failed: state.failed,
	loading: state.loading
})

const mapDispatchToProps = dispatch => ({
	fetchTransactions: accessToken => dispatch(fetchTransactions(accessToken)),
	fetchSingleTransaction: (order_id, accessToken) =>
		dispatch(fetchSingleTransaction(order_id, accessToken)),
	setNavigation: navigation => dispatch(setNavigation(navigation)),
	updateTransactionStatusPacking: (transaction_code, accessToken) =>
		dispatch(updateTransactionStatusPacking(transaction_code, accessToken)),
	updateTransactionStatusShipping: (transaction_code, receipt_number, accessToken) =>
		dispatch(updateTransactionStatusShipping(transaction_code, receipt_number, accessToken))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TransactionContainer)
