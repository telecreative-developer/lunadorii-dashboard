import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import { setNavigation } from "../actions/processor"
import Product from "../views/Product/Product"
import AddProduct from "../views/Product/AddProduct"
import {
	addProduct,
	fetchProducts,
	fetchSubcategories,
	fetchBrands
} from "../actions/product"
const db = new PouchDB("lunadorii")

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
			discount: false,
			discount_percentage,
			weight_gram,
			product_subcategory_id,
			product_brand_id,
			thumbnail1: [],
			thumbnail2: [],
			thumbnail3: []
		}
	}

	componentWillMount() {
		db.get("session").then(async doc => {
			await this.props.fetchProducts(doc.accessToken)
			await this.props.fetchSubcategories()
			await this.props.fetchBrands()
		})
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
					product_brand_id
				},
				doc.accessToken
			)
		})
	}

	render() {
		const { products, subcategories, brands, navigationProduct } = this.props
		const {
			product_subcategory_id,
			product_brand_id,
			thumbnail1,
			thumbnail2,
			thumbnail3
		} = this.state

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
					thumbnail1={thumbnail1}
					onChangeThumbnail1={thumbnail1 => this.setState({ thumbnail1 })}
					thumbnail2={thumbnail2}
					onChangeThumbnail2={thumbnail2 => this.setState({ thumbnail2 })}
					thumbnail3={thumbnail3}
					onChangeThumbnail3={thumbnail3 => this.setState({ thumbnail3 })}
					handleAddProduct={() => this.handleAddProduct()}
				/>
			)
		}

		return (
			<Product
				products={products}
				onAddProduct={this.onNavigateAddProduct.bind(this)}
			/>
		)
	}
}

const mapStateToProps = state => ({
	products: state.products,
	subcategories: state.subcategories,
	brands: state.brands,
	navigationProduct: state.navigation.product,
	navigationProductData: state.navigation.product_data
})

const mapDispatchToProps = dispacth => ({
	setNavigation: navigation => dispacth(setNavigation(navigation)),
	addProduct: (data, accessToken) => dispacth(addProduct(data, accessToken)),
	fetchProducts: accessToken => dispacth(fetchProducts(accessToken)),
	fetchSubcategories: () => dispacth(fetchSubcategories()),
	fetchBrands: () => dispacth(fetchBrands())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductContainer)
