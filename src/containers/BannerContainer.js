import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import Banner from "../views/Banner/Banner"
import AddBanner from "../views/Banner/AddBanner"
import { fetchBanners } from "../actions/banners"
const db = new PouchDB("lunadorii")

class BannerContainer extends React.Component {
	constructor() {
		super()

		this.state = {
			formMode: false,
			categorySelected: "general",
			typeSelected: "web",
			categories: [
				{ value: "general", category: "General" },
				{ value: "best-seller", category: "Best Seller" }
			],
			types: [
				{ value: "web", type: "Web" },
				{ value: "product", type: "Product" }
			]
		}
	}

	componentWillMount() {
		db.get("session").then(doc =>
			this.props.fetchBanners({ accessToken: doc.accessToken })
		)
	}

	render() {
		const {
			formMode,
			categories,
			types,
			categorySelected,
			typeSelected
		} = this.state
		const { banners } = this.props

		if (formMode) {
			return (
				<AddBanner
					categorySelected={categorySelected}
					typeSelected={typeSelected}
					onChangeCategory={e =>
						this.setState({ categorySelected: e.target.value })
					}
					categories={categories}
					onChangeType={e => this.setState({ typeSelected: e.target.value })}
					types={types}
				/>
			)
		}

		return (
			<Banner
				banners={banners}
				onAddBanner={() => this.setState({ formMode: true })}
			/>
		)
	}
}

const mapStateToProps = state => ({
	banners: state.banners
})

const mapDispatchToProps = dispacth => ({
	fetchBanners: ({ accessToken }) => dispacth(fetchBanners({ accessToken }))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BannerContainer)
