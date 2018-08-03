import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import Product from "../views/Product/Product"
import { fetchProducts } from "../actions/product"
const db = new PouchDB("lunadorii")

class ProductContainer extends React.Component {
	componentWillMount() {
		db.get("session").then(doc => this.props.fetchProducts(doc.accessToken))
	}

	render() {
		const { products } = this.props
		return <Product products={products} />
	}
}

const mapStateToProps = state => ({
	products: state.products
})

const mapDispatchToProps = dispacth => ({
	fetchProducts: accessToken => dispacth(fetchProducts(accessToken))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductContainer)
