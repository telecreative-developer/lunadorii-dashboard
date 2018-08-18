import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { setNavigation } from "../actions/processor"
import Product from "../views/Product/Product"
import AddProduct from "../views/Product/AddProduct"
import {
	addProduct,
	fetchProducts,
	fetchSubcategories,
	fetchBrands,
	addProductThumbnail,
	deleteProduct
} from "../actions/product"
const db = new PouchDB("lunadorii")
const ReactSwal = withReactContent(Swal)

const sweetAlert = (title, type, confirmButtonText) => {
	return ReactSwal.fire({ title, type, confirmButtonText })
}

class ProductContainer extends React.Component {
	constructor(props) {
		super(props)

		const {
			title,
			description,
			detail,
			how_to_use,
			price,
			discount,
			discount_percentage,
			weight_gram,
			product_subcategory_id,
			product_brand_id
		} = props.navigationProductData

		this.state = {
			title,
			description,
			detail,
			how_to_use,
			price,
			discount,
			discount_percentage,
			weight_gram,
			product_subcategory_id,
			product_brand_id
		}

		if (!props.products.length) {
			db.get("session").then(doc => {
				this.props.fetchProducts(doc.accessToken)
			})
		}

		if (!props.subcategories.length) {
			this.props.fetchSubcategories()
		}

		if (!props.brands.length) {
			this.props.fetchBrands()
		}
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		const { success, failed } = prevProps

		if (success.status && success.process_on === "ADD_PRODUCT") {
			return "ADD_PRODUCT_SUCCESS"
		}

		if (failed.status && failed.process_on === "ADD_PRODUCT") {
			return "ADD_PRODUCT_FAILED"
		}

		if (success.status && success.process_on === "UPDATE_PRODUCT") {
			return "UPDATE_PRODUCT_SUCCESS"
		}

		if (failed.status && failed.process_on === "UPDATE_PRODUCT") {
			return "UPDATE_PRODUCT_FAILED"
		}

		if (success.status && success.process_on === "DELETE_PRODUCT") {
			return "DELETE_PRODUCT_SUCCESS"
		}

		if (failed.status && failed.process_on === "DELETE_PRODUCT") {
			return "DELETE_PRODUCT_FAILED"
		}

		return null
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot === "ADD_PRODUCT_SUCCESS") {
			sweetAlert("Success Add Product", "success", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "ADD_PRODUCT_FAILED") {
			sweetAlert("Failed Add Product", "error", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "UPDATE_PRODUCT_SUCCESS") {
			sweetAlert("Success Update Product", "success", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "UPDATE_PRODUCT_FAILED") {
			sweetAlert("Failed Update Product", "error", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "DELETE_PRODUCT_SUCCESS") {
			sweetAlert("Success Delete Product", "success", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "DELETE_PRODUCT_FAILED") {
			sweetAlert("Failed Delete Product", "error", "Close").then(res => {
				return window.location.reload()
			})
		}
	}

	onNavigateAddProduct() {
		this.props.setNavigation({
			product: "add-product"
		})
	}

	onNavigateUpdateProduct() {
		this.props.setNavigation({
			product: "update-product"
		})
	}

	handleAddThumbnail(thumbnail) {
		this.props.addProductThumbnail(thumbnail[0])
	}

	handleAddProduct() {
		const {
			title,
			description,
			detail,
			to_use,
			price,
			discount,
			weight_gram,
			discount_percentage,
			product_subcategory_id,
			product_brand_id
		} = this.state

		const { productThumbnails } = this.props

		db.get("session").then(doc => {
			this.props.addProduct(
				{
					title,
					description,
					detail,
					to_use,
					price,
					discount,
					weight_gram,
					discount_percentage,
					product_subcategory_id,
					product_brand_id,
					thumbnails: productThumbnails
				},
				doc.accessToken
			)
		})
	}

	handleDeleteProduct(data) {
		const product_id = data.target.attributes.getNamedItem("data-product-id")
			.value

		ReactSwal.fire({
			title: "Delete Product",
			text: "Are you sure?",
			type: "warning",
			confirmButtonText: "Delete",
			showCancelButton: true
		}).then(res => {
			if (res.value) {
				db.get("session").then(doc =>
					this.props.deleteProduct(product_id, doc.accessToken)
				)
			}
		})
	}

	render() {
		const {
			products,
			productThumbnails,
			subcategories,
			brands,
			navigationProduct,
			loading
		} = this.props
		const { discount, product_subcategory_id, product_brand_id } = this.state

		if (
			navigationProduct === "add-product" ||
			navigationProduct === "update-product"
		) {
			return (
				<AddProduct
					onChangeTitle={e => this.setState({ title: e.target.value })}
					onChangeDescription={e =>
						this.setState({ description: e.target.value })
					}
					onChangeDetail={e => this.setState({ detail: e.target.value })}
					onChangeHowToUse={e => this.setState({ how_to_use: e.target.value })}
					onChangePrice={e => this.setState({ price: e.target.value })}
					onChangeWeight={e => this.setState({ weight_gram: e.target.value })}
					onChangeDiscount={e =>
						this.setState({ discount_percentage: e.target.value })
					}
					discountCondition={discount}
					onChangeDiscountCondition={e =>
						this.setState({
							discount: !this.state.discount,
							discount_percentage: 1
						})
					}
					subcategories={subcategories}
					subcategorySelected={product_subcategory_id}
					onChangeSubcategory={e =>
						this.setState({ product_subcategory_id: e.target.value })
					}
					brands={brands}
					brandSelected={product_brand_id}
					onChangeBrand={e =>
						this.setState({ product_brand_id: e.target.value })
					}
					thumbnails={productThumbnails}
					onChangeThumbnail={thumbnail => this.handleAddThumbnail(thumbnail)}
					handleAddProduct={() => this.handleAddProduct()}
					loadingProduct={
						(loading.status && loading.process_on === "ADD_PRODUCT") ||
						(loading.status && loading.process_on === "UPDATE_PRODUCT")
					}
				/>
			)
		}

		return (
			<Product
				products={products}
				onAddProduct={this.onNavigateAddProduct.bind(this)}
				onDeleteProduct={this.handleDeleteProduct.bind(this)}
				loadingDeleteProduct={
					loading.status && loading.process_on === "DELETE_PRODUCT"
				}
			/>
		)
	}
}

const mapStateToProps = state => ({
	products: state.products,
	productThumbnails: state.productThumbnails,
	subcategories: state.subcategories,
	brands: state.brands,
	navigationProduct: state.navigation.product,
	navigationProductData: state.navigation.product_data,
	success: state.success,
	failed: state.failed,
	loading: state.loading
})

const mapDispatchToProps = dispacth => ({
	setNavigation: navigation => dispacth(setNavigation(navigation)),
	addProductThumbnail: thumbnail => dispacth(addProductThumbnail(thumbnail)),
	addProduct: (data, accessToken) => dispacth(addProduct(data, accessToken)),
	deleteProduct: (product_id, accessToken) =>
		dispacth(deleteProduct(product_id, accessToken)),
	fetchProducts: accessToken => dispacth(fetchProducts(accessToken)),
	fetchSubcategories: () => dispacth(fetchSubcategories()),
	fetchBrands: () => dispacth(fetchBrands())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductContainer)
