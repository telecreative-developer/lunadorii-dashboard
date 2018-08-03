import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import Banner from "../views/Banner/Banner"
import AddBanner from "../views/Banner/AddBanner"
import { setNavigation } from "../actions/processor"
import {
	fetchBanners,
	uploadImageBannerToS3,
	addBanner,
	updateBanner,
	setActiveBanner,
	setUnactiveBanner
} from "../actions/banners"
const db = new PouchDB("lunadorii")

class BannerContainer extends React.Component {
	constructor() {
		super()

		this.state = {
			title: "",
			thumbnail: "",
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
		db.get("session").then(doc => this.props.fetchBanners(doc.accessToken))
	}

	handleAddBanner() {
		const { title, thumbnail, typeSelected, categorySelected } = this.state
		this.props.uploadImageBannerToS3(thumbnail)
	}

	render() {
		const {
			thumbnail,
			title,
			categories,
			types,
			categorySelected,
			typeSelected
		} = this.state
		const { navigationBanner, banners } = this.props

		if (
			navigationBanner === "add-banner" ||
			navigationBanner === "update-banner"
		) {
			return (
				<AddBanner
					formType={navigationBanner}
					handleAddBanner={() => this.handleAddBanner()}
					title={title}
					onChangeTitle={e => this.setState({ title: e.target.value })}
					thumbnail={thumbnail}
					onChangeThumbnail={thumbnail =>
						this.setState({ thumbnail: URL.createObjectURL(thumbnail[0]) })
					}
					categorySelected={categorySelected}
					typeSelected={typeSelected}
					onChangeCategory={e =>
						this.setState({ categorySelected: e.target.value })
					}
					categories={categories}
					onChangeType={e => this.setState({ typeSelected: e.target.value })}
					types={types}
					onClearImage={() => this.setState({ thumbnail: "" })}
					handleCancel={() => this.props.setNavigation({ banner: "banner" })}
				/>
			)
		}

		return (
			<Banner
				banners={banners}
				onAddBanner={() => this.props.setNavigation({ banner: "add-banner" })}
			/>
		)
	}
}

const mapStateToProps = state => ({
	banners: state.banners,
	navigationBanner: state.navigation.banner
})

const mapDispatchToProps = dispacth => ({
	setNavigation: navigation => dispacth(setNavigation(navigation)),
	fetchBanners: accessToken => dispacth(fetchBanners(accessToken)),
	uploadImageBannerToS3: thumbnail =>
		dispacth(uploadImageBannerToS3(thumbnail)),
	addBanner: (data, accessToken) => dispacth(addBanner(data, accessToken)),
	updateBanner: (data, accessToken) =>
		dispacth(updateBanner(data, accessToken)),
	setActiveBanner: (banner_id, accessToken) =>
		dispacth(setActiveBanner(banner_id, accessToken)),
	setUnactiveBanner: (banner_id, accessToken) =>
		dispacth(setUnactiveBanner(banner_id, accessToken))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BannerContainer)
