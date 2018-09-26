import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { setNavigation } from "../actions/processor"
import Category from "../views/Category/Category"
import AddCategory from "../views/Category/AddCategory"
import EditCategory from "../views/Category/EditCategory"
import {
	fetchCategories,
	fetchSubcategories,
	addSubcategories,
	updateSubcategoriesWithImage,
	updateSubcategories,
	deleteSubcategories
} from "../actions/product"
const db = new PouchDB("lunadorii")
const ReactSwal = withReactContent(Swal)

const sweetAlert = (title, type, confirmButtonText) => {
	return ReactSwal.fire({ title, type, confirmButtonText })
}

class CategoryContainer extends React.Component {
	constructor(props) {
		super(props)

		const {
			product_subcategory_id,
			subcategory,
			thumbnail_url,
			product_category_id,
			thumbnails
		} = props.navigationCategoryData

		this.state = {
			searchByTitle: "",
			product_subcategory_id,
			subcategory,
			thumbnail_url,
			product_category_id,
			thumbnails
		}

		if (!props.subcategories.length) {
			this.props.fetchSubcategories()
		}

		if (!props.categories.length) {
			this.props.fetchCategories()
		}
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		const { success, failed } = prevProps

		if (success.status && success.process_on === "ADD_SUBCATEGORIES") {
			return "ADD_SUBCATEGORIES_SUCCESS"
		}

		if (failed.status && failed.process_on === "ADD_SUBCATEGORIES") {
			return "ADD_SUBCATEGORIES_FAILED"
		}

		if (success.status && success.process_on === "UPDATE_SUBCATEGORIES") {
			return "UPDATE_SUBCATEGORIES_SUCCESS"
		}

		if (failed.status && failed.process_on === "UPDATE_SUBCATEGORIES") {
			return "UPDATE_SUBCATEGORIES_FAILED"
		}

		if (success.status && success.process_on === "DELETE_SUBCATEGORIES") {
			return "DELETE_SUBCATEGORIES_SUCCESS"
		}

		if (failed.status && failed.process_on === "DELETE_SUBCATEGORIES") {
			return "DELETE_SUBCATEGORIES_FAILED"
		}

		return null
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot === "ADD_SUBCATEGORIES_SUCCESS") {
			sweetAlert("Success Add Category", "success", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "ADD_SUBCATEGORIES_FAILED") {
			sweetAlert("Failed Add Category", "error", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "UPDATE_SUBCATEGORIES_SUCCESS") {
			sweetAlert("Success Update Category", "success", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "UPDATE_SUBCATEGORIES_FAILED") {
			sweetAlert("Failed Update Category", "error", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "DELETE_SUBCATEGORIES_SUCCESS") {
			sweetAlert("Success Delete Category", "success", "Close").then(res => {
				return window.location.reload()
			})
		}

		if (snapshot === "DELETE_SUBCATEGORIES_FAILED") {
			sweetAlert("Failed Delete Category", "error", "Close").then(res => {
				return window.location.reload()
			})
		}
	}

	onNavigateAddSubcategory() {
		this.props.setNavigation({
			category: "add-category"
		})
	}

	onBack() {
		this.props.setNavigation({
			category: "category"
		})
	}

	onNavigateUpdateSubcategory(data) {
		const product_subcategory_id = data.target.attributes.getNamedItem("data-subcategory-id")
			.value
		const subcategory = data.target.attributes.getNamedItem("data-subcategory-title")
			.value
		const thumbnail_url = data.target.attributes.getNamedItem("data-subcategory-thumbnail")
			.value
		const product_category_id = data.target.attributes.getNamedItem("data-subcategory-CategoryId")
			.value
		
		this.setState({
			product_subcategory_id,
			subcategory,
			thumbnail_url,
			product_category_id
		})

		this.props.setNavigation({
			category: "update-category",
			category_data: {
				product_subcategory_id,
				subcategory,
				thumbnail_url,
				product_category_id
			}
		})
	}

	handleAddCategory() {
		const {
			subcategory,
			product_category_id,
			thumbnails
		} = this.state

		db.get("session").then(doc => {
			this.props.addSubcategories(
				{
					thumbnails,
					subcategory,
					product_category_id
				},
				doc.accessToken
			)
		})
	}

	handleUpdateCategory() {
		const {
			product_subcategory_id,
			subcategory,
			thumbnail_url,
			product_category_id,
			thumbnails
		} = this.state

		db.get("session").then(doc => {
			return thumbnail_url
				? this.props.updateSubcategories(
						{
							product_subcategory_id,
							subcategory,
							thumbnail_url,
							product_category_id
						},
						doc.accessToken
				  )
				: this.props.updateSubcategoriesWithImage(
						{
							product_subcategory_id,
							subcategory,
							product_category_id,
							thumbnails
						},
						doc.accessToken
				  )
		})
	}

	handleDeleteSubcategory(data) {
		const product_subcategory_id = data.target.attributes.getNamedItem("data-subcategory-id")
			.value

		ReactSwal.fire({
			title: "Delete Category",
			text: "Are you sure?",
			type: "warning",
			confirmButtonText: "Delete",
			showCancelButton: true
		}).then(res => {
			if (res.value) {
				db.get("session").then(doc =>
					this.props.deleteSubcategories(product_subcategory_id, doc.accessToken)
				)
			}
		})
	}

	render() {
		const {
			categories,
			subcategories,
			navigationCategory,
			loading
		} = this.props

		const {
			searchByTitle,
			subcategory,
			thumbnail_url,
			product_category_id,
			thumbnails
		} = this.state

		if (navigationCategory === "add-category") {
			return (
				<AddCategory
					categories={categories}
					thumbnail_url={thumbnail_url}
					thumbnail={thumbnails}
					categoryId={product_category_id}
					title={subcategory}
					onChangeTitle={e => this.setState({ subcategory: e.target.value })}
					onChangeCategory={e => this.setState({ product_category_id: e.target.value })}
					handleAddCategory={() => this.handleAddCategory()}
					onChangeThumbnail={thumbnails => this.setState({ thumbnails })}
					loadingCategory={
						(loading.status && loading.process_on === "ADD_CATEGORIES")
					}
					onClearImage={() =>
						this.setState({ thumbnails: "", thumbnail_url: "" })
					}
					onBack={this.onBack.bind(this)}
				/>
			)
		}

		if (navigationCategory === "update-category") {
			return (
				<EditCategory
					categories={categories}
					thumbnail_url={thumbnail_url}
					thumbnail={thumbnails}
					categoryId={product_category_id}
					title={subcategory}
					onChangeTitle={e => this.setState({ subcategory: e.target.value })}
					onChangeCategory={e => this.setState({ product_category_id: e.target.value })}
					handleUpdateCategory={() => this.handleUpdateCategory()}
					onChangeThumbnail={thumbnails => this.setState({ thumbnails })}
					loadingCategory={
						(loading.status && loading.process_on === "UPDATE_CATEGORIES")
					}
					onClearImage={() =>
						this.setState({ thumbnails: "", thumbnail_url: "" })
					}
					onBack={this.onBack.bind(this)}
				/>
			)
		}

		return (
			<Category
				subcategories={subcategories}
				categories={categories}
				onUpdateSubcategory={this.onNavigateUpdateSubcategory.bind(this)}
				onAddSubcategory={this.onNavigateAddSubcategory.bind(this)}
				onDeleteSubcategory={this.handleDeleteSubcategory.bind(this)}
				loadingDeleteSubcategory={
					loading.status && loading.process_on === "DELETE_SUBCATEGORIES"
				}
				searchByTitle={searchByTitle}
				onChangeSearch={e => this.setState({ searchByTitle: e.target.value })}
			/>
		)
	}
}

const mapStateToProps = state => ({
	subcategories: state.subcategories,
	categories: state.categories,
	navigationCategory: state.navigation.category,
	navigationCategoryData: state.navigation.category_data,
	success: state.success,
	failed: state.failed,
	loading: state.loading
})

const mapDispatchToProps = dispacth => ({
	setNavigation: navigation => dispacth(setNavigation(navigation)),
	fetchCategories: () => dispacth(fetchCategories()),
	fetchSubcategories: () => dispacth(fetchSubcategories()),
	addSubcategories: (data, accessToken) => dispacth(addSubcategories(data, accessToken)),
	updateSubcategories: (data, accessToken) => dispacth(updateSubcategories(data, accessToken)),
	updateSubcategoriesWithImage: (data, accessToken) => dispacth(updateSubcategoriesWithImage(data, accessToken)),
	deleteSubcategories: (product_subcategory_id, accessToken) => dispacth(deleteSubcategories(product_subcategory_id, accessToken))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CategoryContainer)
