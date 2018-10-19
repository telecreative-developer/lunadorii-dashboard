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
	fetchBrands,
	addBrand,
	updateBrand,
	updateBrandWithImage,
	deleteBrand
} from "../actions/product"
const db = new PouchDB("lunadorii")
const ReactSwal = withReactContent(Swal)

const sweetAlert = (title, type, confirmButtonText) => {
	return ReactSwal.fire({ title, type, confirmButtonText })
}

class BrandContainer extends React.Component {
	constructor(props) {
		super(props)

		const {
			product_brand_id,
			logo_url,
			brand,
			thumbnails
		} = props.navigationBrandData

		this.state = {
			searchByTitle: "",
			product_brand_id,
			logo_url,
			brand,
			thumbnails
		}

		if (!props.brands.length) {
			this.props.fetchBrands()
		}
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		const { success, failed } = prevProps

		if (success.status && success.process_on === "ADD_BRANDS") {
			return "ADD_BRANDS_SUCCESS"
		}

		if (failed.status && failed.process_on === "ADD_BRANDS") {
			return "ADD_BRANDS_FAILED"
		}

		if (success.status && success.process_on === "UPDATE_BRANDS") {
			return "UPDATE_BRANDS_SUCCESS"
		}

		if (failed.status && failed.process_on === "UPDATE_BRANDS") {
			return "UPDATE_BRANDS_FAILED"
		}

		if (success.status && success.process_on === "DELETE_BRANDS") {
			return "DELETE_BRANDS_SUCCESS"
		}

		if (failed.status && failed.process_on === "DELETE_BRANDS") {
			return "DELETE_BRANDS_FAILED"
		}

		return null
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot === "ADD_BRANDS_SUCCESS") {
			sweetAlert("Success Add Brand", "success", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "ADD_BRANDS_FAILED") {
			sweetAlert("Failed Add Brand", "error", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "UPDATE_BRANDS_SUCCESS") {
			sweetAlert("Success Update Brand", "success", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "UPDATE_BRANDS_FAILED") {
			sweetAlert("Failed Update Brand", "error", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "DELETE_BRANDS_SUCCESS") {
			sweetAlert("Success Delete Brand", "success", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "DELETE_BRANDS_FAILED") {
			sweetAlert("Failed Delete Brand", "error", "Close").then(res => {
				return window.location.reload()
			})
		}
	}

	onNavigateAddBrand() {
		this.props.setNavigation({
			brand: "add-brand"
		})
	}

	onBack() {
		this.props.setNavigation({ brand: "brand" })
		this.setState({
			product_brand_id: "",
			logo_url: "",
			brand: "",
			thumbnails: ""
		})
	}

	onNavigateUpdateBrand(data) {
		const product_brand_id = data.target.attributes.getNamedItem("data-brand-id")
			.value
		const brand = data.target.attributes.getNamedItem("data-brand-title")
			.value
		const logo_url = data.target.attributes.getNamedItem("data-brand-thumbnail")
			.value

		this.setState({
			product_brand_id,
			brand,
			logo_url
		})

		this.props.setNavigation({
			brand: "update-brand",
			brand_data: {
				product_brand_id,
				brand,
				logo_url
			}
		})
	}

	handleAddBrand() {
		const {
			brand,
			thumbnails
		} = this.state

		db.get("session").then(doc => {
			this.props.addBrand(
				{
					brand,
					thumbnails
				},
				doc.accessToken
			)
		})
	}

	handleUpdateBrand() {
		const {
			product_brand_id,
			logo_url,
			brand,
			thumbnails
		} = this.state

		db.get("session").then(doc => {
			return logo_url
				? this.props.updateBrand(
						{
							product_brand_id,
							brand,
							logo_url
						},
						doc.accessToken
				  )
				: this.props.updateBrandWithImage(
						{
							product_brand_id,
							brand,
							thumbnails
						},
						doc.accessToken
				  )
		})
	}

	handleDeleteBrand(data) {
		const product_brand_id = data.target.attributes.getNamedItem("data-brand-id")
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
					this.props.deleteBrand(product_brand_id, doc.accessToken)
				)
			}
		})
	}

	render() {
		const {
			brands,
			navigationBrand,
			loading
		} = this.props

		const {
			searchByTitle,
			logo_url,
			brand,
			thumbnails
		} = this.state

		if (navigationBrand === "add-brand") {
			return (
				<AddBrands
					title={brand}
					onChangeTitle={e => this.setState({ brand: e.target.value })}
					handleAddBrand={() => this.handleAddBrand()}
					thumbnail={thumbnails}
					logo_url={logo_url}
					onChangeThumbnail={thumbnails => this.setState({ thumbnails })}
					onClearImage={() =>
						this.setState({ thumbnails: "", logo_url: "" })
					}
					loadingBrand={
						(loading.status && loading.process_on === "ADD_BRANDS")
					}
					onBack={this.onBack.bind(this)}
				/>
			)
		}

		if (navigationBrand === "update-brand") {
			return (
				<EditBrands
					title={brand}
					onChangeTitle={e => this.setState({ brand: e.target.value })}
					handleUpdateBrand={() => this.handleUpdateBrand()}
					thumbnail={thumbnails}
					logo_url={logo_url}
					onChangeThumbnail={thumbnails => this.setState({ thumbnails })}
					onClearImage={() =>
						this.setState({ thumbnails: "", logo_url: "" })
					}
					loadingBrand={
						(loading.status && loading.process_on === "UPDATE_BRANDS")
					}
					onBack={this.onBack.bind(this)}
				/>
			)
		}

		return (
			<Brands
				brands={brands}
				onUpdateBrand={this.onNavigateUpdateBrand.bind(this)}
				onAddBrand={this.onNavigateAddBrand.bind(this)}
				onDeleteBrand={this.handleDeleteBrand.bind(this)}
				loadingDeleteBrand={
					loading.status && loading.process_on === "DELETE_BRANDS"
				}
				searchByTitle={searchByTitle}
				onChangeSearch={e => this.setState({ searchByTitle: e.target.value.toLowerCase() })}
			/>
		)
	}
}

const mapStateToProps = state => ({
	brands: state.brands,
	navigationBrand: state.navigation.brand,
	navigationBrandData: state.navigation.brand_data,
	success: state.success,
	failed: state.failed,
	loading: state.loading
})

const mapDispatchToProps = dispacth => ({
	setNavigation: navigation => dispacth(setNavigation(navigation)),
	fetchBrands: () => dispacth(fetchBrands()),
	addBrand: (data, accessToken) => dispacth(addBrand(data, accessToken)),
	updateBrand: (data, accessToken) => dispacth(updateBrand(data, accessToken)),
	updateBrandWithImage: (data, accessToken) => dispacth(updateBrandWithImage(data, accessToken)),
	deleteBrand: (product_brand_id, accessToken) => dispacth(deleteBrand(product_brand_id, accessToken))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandContainer)
