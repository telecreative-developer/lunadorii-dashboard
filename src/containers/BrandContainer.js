import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { setNavigation } from "../actions/processor"
import Brands from "../views/Brands/Brands"
import AddBrands from "../views/Brands/AddBrands"
import EditBrands from "../views/Brands/EditBrands"
import {
	addProduct,
	fetchProducts,
	fetchSubcategories,
	fetchBrands,
	addProductThumbnail,
	removeProductThumbnail,
	deleteProduct,
	updateProduct,
	setProductThumbnail,
	addProductThumbnailWhenUpdate,
	removeProductThumbnailWhenUpdate
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
			product_id,
			title,
			description,
			detail,
			to_use,
			price,
			discount,
			discount_percentage,
			weight_gram,
			subcategory,
			product_subcategory_id,
			brand,
			product_brand_id,
			thumbnails
		} = props.navigationProductData

		this.state = {
			searchByTitle: "",
			product_id,
			title,
			description,
			detail,
			to_use,
			price,
			discount,
			discount_percentage,
			weight_gram,
			subcategory,
			product_subcategory_id,
			brand,
			product_brand_id,
			thumbnails
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

	onNavigateDetailProduct(data) {
		const title = data.target.attributes.getNamedItem("data-product-title")
			.value
		const detail = data.target.attributes.getNamedItem("data-product-detail")
			.value
		const description = data.target.attributes.getNamedItem(
			"data-product-description"
		).value
		const to_use = data.target.attributes.getNamedItem("data-product-howtouse")
			.value
		const price = data.target.attributes.getNamedItem("data-product-price")
			.value
		const discount = data.target.attributes.getNamedItem(
			"data-product-discount"
		).value
		const discount_percentage = data.target.attributes.getNamedItem(
			"data-product-discount-percentage"
		).value
		const brand = data.target.attributes.getNamedItem("data-product-brand")
			.value
		const subcategory = data.target.attributes.getNamedItem(
			"data-product-subcategory"
		).value
		const weight_gram = data.target.attributes.getNamedItem(
			"data-product-weight"
		).value
		const thumbnails = JSON.parse(
			data.target.attributes.getNamedItem("data-product-thumbnails").value
		)

		this.setState({
			title,
			detail,
			description,
			to_use,
			price,
			discount,
			discount_percentage,
			weight_gram,
			brand,
			subcategory,
			thumbnails
		})

		this.props.setNavigation({
			product: "product-detail",
			product_data: {
				title,
				detail,
				description,
				to_use,
				price,
				discount,
				discount_percentage,
				weight_gram,
				brand,
				subcategory,
				thumbnails
			}
		})
	}

	onBack() {
		this.props.setNavigation({
			product: "product"
		})
		this.setState({
			title: "",
			detail: "",
			description: "",
			to_use: "",
			price: 0,
			discount: false,
			discount_percentage: 0,
			weight_gram: 0,
			product_subcategory_id: 1,
			product_brand_id: 1,
			thumbnails: []
		})
	}

	onNavigateUpdateProduct(data) {
		const product_id = data.target.attributes.getNamedItem("data-product-id")
			.value
		const title = data.target.attributes.getNamedItem("data-product-title")
			.value
		const detail = data.target.attributes.getNamedItem("data-product-detail")
			.value
		const description = data.target.attributes.getNamedItem(
			"data-product-description"
		).value
		const to_use = data.target.attributes.getNamedItem("data-product-howtouse")
			.value
		const price = data.target.attributes.getNamedItem("data-product-price")
			.value
		const discount = data.target.attributes.getNamedItem(
			"data-product-discount"
		).value
		const discount_percentage = data.target.attributes.getNamedItem(
			"data-product-discount-percentage"
		).value
		const product_brand_id = data.target.attributes.getNamedItem(
			"data-product-brand-id"
		).value
		const product_subcategory_id = data.target.attributes.getNamedItem(
			"data-product-subcategory-id"
		).value
		const weight_gram = data.target.attributes.getNamedItem(
			"data-product-weight"
		).value
		const thumbnails = JSON.parse(
			data.target.attributes.getNamedItem("data-product-thumbnails").value
		)

		this.setState({
			product_id,
			title,
			detail,
			description,
			to_use,
			price,
			discount,
			discount_percentage,
			weight_gram,
			product_brand_id,
			product_subcategory_id,
			thumbnails
		})

		thumbnails.map((thumbnail, key) =>
			this.handleSetThumbnail({
				product_thumbnail_id: thumbnail.product_thumbnail_id,
				thumbnail_url: thumbnail.thumbnail_url
			})
		)

		this.props.setNavigation({
			product: "update-product",
			product_data: {
				product_id,
				title,
				detail,
				description,
				to_use,
				price,
				discount,
				discount_percentage,
				weight_gram,
				product_brand_id,
				product_subcategory_id,
				thumbnails
			}
		})
	}

	handleAddThumbnail(thumbnail) {
		this.props.addProductThumbnail({
			thumbnail_url: URL.createObjectURL(thumbnail[0]),
			thumbnail_origin: thumbnail[0]
		})

		if (this.props.navigationProduct === "update-product") {
			this.handleAddThumbnailWhenUpdate(thumbnail)
		}
	}

	handleRemoveThumbnail(key) {
		this.props.removeProductThumbnail(key)
	}

	handleSetThumbnail(thumbnail) {
		this.props.setProductThumbnail({
			product_thumbnail_id: thumbnail.product_thumbnail_id,
			thumbnail_url: thumbnail.thumbnail_url,
			thumbnail_origin: thumbnail.thumbnail_url
		})
	}

	handleAddThumbnailWhenUpdate(thumbnail) {
		this.props.addProductThumbnailWhenUpdate({
			thumbnail_url: URL.createObjectURL(thumbnail[0]),
			thumbnail_origin: thumbnail[0]
		})
	}

	handleRemoveThumbnailWhenUpdate(data) {
		const product_thumbnail_id = data.target.attributes.getNamedItem(
			"data-thumbnail-id"
		).value
		const key = data.target.attributes.getNamedItem("data-thumbnail-key").value

		this.handleRemoveThumbnail(key)

		this.props.removeProductThumbnailWhenUpdate({
			product_thumbnail_id
		})
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

	handleUpdateProduct() {
		const {
			product_id,
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
			thumbnails
		} = this.state

		const { productThumbnailsWillAdd, productThumbnailsWillRemove } = this.props

		db.get("session").then(doc => {
			this.props
				.updateProduct(
					{
						product_id,
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
						thumbnails: productThumbnailsWillAdd.length
							? productThumbnailsWillAdd
							: [],
						thumbnailsWillRemove: productThumbnailsWillRemove.length
							? productThumbnailsWillRemove
							: []
					},
					doc.accessToken
				)
				.then(() => this.props.addProductThumbnail(thumbnails))
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
		console.log(this.state)
		const {
			products,
			productThumbnails,
			subcategories,
			brands,
			navigationProduct,
			loading
		} = this.props

		const {
			searchByTitle,
			title,
			detail,
			description,
			to_use,
			price,
			discount,
			discount_percentage,
			weight_gram,
			brand,
			subcategory,
			product_subcategory_id,
			product_brand_id,
			thumbnails
		} = this.state

		if (navigationProduct === "add-product") {
			return (
				<AddBrands
					onChangeTitle={e => this.setState({ title: e.target.value })}
					onChangeDescription={e =>
						this.setState({ description: e.target.value })
					}
					onChangeDetail={e => this.setState({ detail: e.target.value })}
					onChangeHowToUse={e => this.setState({ to_use: e.target.value })}
					onChangePrice={e => this.setState({ price: e.target.value })}
					onChangeWeight={e => this.setState({ weight_gram: e.target.value })}
					discount={discount_percentage}
					onChangeDiscount={e =>
						this.setState({ discount_percentage: e.target.value })
					}
					discountCondition={discount}
					onChangeDiscountCondition={e =>
						this.setState({
							discount: !this.state.discount,
							discount_percentage: !this.state.discount ? 1 : 0
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
					onBack={this.onBack.bind(this)}
				/>
			)
		}

		if (navigationProduct === "update-product") {
			return (
				<EditBrands
					title={title}
					onChangeTitle={e => this.setState({ title: e.target.value })}
					description={description}
					onChangeDescription={e =>
						this.setState({ description: e.target.value })
					}
					detail={detail}
					onChangeDetail={e => this.setState({ detail: e.target.value })}
					toUse={to_use}
					onChangeHowToUse={e => this.setState({ to_use: e.target.value })}
					price={price}
					onChangePrice={e => this.setState({ price: e.target.value })}
					weight={weight_gram}
					onChangeWeight={e => this.setState({ weight_gram: e.target.value })}
					discount={discount_percentage}
					onChangeDiscount={e =>
						this.setState({ discount_percentage: e.target.value })
					}
					discountCondition={discount}
					onChangeDiscountCondition={e =>
						this.setState({
							discount: !this.state.discount,
							discount_percentage: !this.state.discount ? 1 : 0
						})
					}
					subcategories={subcategories}
					onChangeSubcategory={e =>
						this.setState({ product_subcategory_id: e.target.value })
					}
					brands={brands}
					onChangeBrand={e =>
						this.setState({ product_brand_id: e.target.value })
					}
					thumbnails={productThumbnails}
					onChangeThumbnail={thumbnail => this.handleAddThumbnail(thumbnail)}
					handleUpdateProduct={() => this.handleUpdateProduct()}
					loadingProduct={
						(loading.status && loading.process_on === "ADD_PRODUCT") ||
						(loading.status && loading.process_on === "UPDATE_PRODUCT")
					}
					onRemoveThumbnail={this.handleRemoveThumbnailWhenUpdate.bind(this)}
					brandSelected={product_brand_id}
					subcategorySelected={product_subcategory_id}
					onBack={this.onBack.bind(this)}
				/>
			)
		}

		return (
			<Brands
				products={products}
				onShowDetailProduct={this.onNavigateDetailProduct.bind(this)}
				onUpdateProduct={this.onNavigateUpdateProduct.bind(this)}
				onAddProduct={this.onNavigateAddProduct.bind(this)}
				onDeleteProduct={this.handleDeleteProduct.bind(this)}
				loadingDeleteProduct={
					loading.status && loading.process_on === "DELETE_PRODUCT"
				}
				searchByTitle={searchByTitle}
				onChangeSearch={e => this.setState({ searchByTitle: e.target.value })}
			/>
		)
	}
}

const mapStateToProps = state => ({
	products: state.products,
	productThumbnails: state.productThumbnails,
	subcategories: state.subcategories,
	brands: state.brands,
	productThumbnailsWillAdd: state.productThumbnailsWillAdd,
	productThumbnailsWillRemove: state.productThumbnailsWillRemove,
	navigationProduct: state.navigation.product,
	navigationProductData: state.navigation.product_data,
	success: state.success,
	failed: state.failed,
	loading: state.loading
})

const mapDispatchToProps = dispacth => ({
	setNavigation: navigation => dispacth(setNavigation(navigation)),
	addProductThumbnail: thumbnail => dispacth(addProductThumbnail(thumbnail)),
	removeProductThumbnail: key => dispacth(removeProductThumbnail(key)),
	setProductThumbnail: thumbnail => dispacth(setProductThumbnail(thumbnail)),
	updateProduct: (data, accessToken) =>
		dispacth(updateProduct(data, accessToken)),
	addProduct: (data, accessToken) => dispacth(addProduct(data, accessToken)),
	deleteProduct: (product_id, accessToken) =>
		dispacth(deleteProduct(product_id, accessToken)),
	addProductThumbnailWhenUpdate: thumbnail =>
		dispacth(addProductThumbnailWhenUpdate(thumbnail)),
	removeProductThumbnailWhenUpdate: thumbnail_id =>
		dispacth(removeProductThumbnailWhenUpdate(thumbnail_id)),
	fetchProducts: accessToken => dispacth(fetchProducts(accessToken)),
	fetchSubcategories: () => dispacth(fetchSubcategories()),
	fetchBrands: () => dispacth(fetchBrands())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductContainer)
