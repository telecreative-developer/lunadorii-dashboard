import React from "react"
import PouchDB from "pouchdb"
import { connect } from "react-redux"
import Banner from "../views/Banner/Banner"
import AddBanner from "../views/Banner/AddBanner"
import { setNavigation } from "../actions/processor"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import {
	fetchBanners,
	addBanner,
	updateBanner,
	updateBannerWithImage,
	deleteBanner,
	setActiveBanner,
	setUnactiveBanner
} from "../actions/banners"
const db = new PouchDB("lunadorii")
const ReactSwal = withReactContent(Swal)

class BannerContainer extends React.Component {
	constructor(props) {
		super(props)

		const {
			banner_id,
			title,
			thumbnails,
			thumbnail_url,
			category,
			type
		} = props.navigationBannerData

		this.state = {
			banner_id,
			title,
			thumbnails,
			thumbnail_url,
			categorySelected: category,
			typeSelected: type,
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

	onNavigateAddBanner(data) {
		this.props.setNavigation({ banner: "add-banner" })
	}

	onNavigateUpdateBanner(data) {
		const banner_id = data.target.attributes.getNamedItem("data-banner-id")
			.value
		const title = data.target.attributes.getNamedItem("data-banner-title").value
		const thumbnail_url = data.target.attributes.getNamedItem(
			"data-banner-thumbnail"
		).value
		const type = data.target.attributes.getNamedItem("data-banner-type").value
		const category = data.target.attributes.getNamedItem("data-banner-category")
			.value

		this.setState({
			banner_id,
			title,
			thumbnail_url,
			typeSelected: type,
			categorySelected: category
		})

		this.props.setNavigation({
			banner: "update-banner",
			banner_data: {
				banner_id,
				title,
				thumbnail_url,
				typeSelected: type,
				categorySelected: category
			}
		})
	}

	handleAddBanner() {
		const { title, thumbnails, typeSelected, categorySelected } = this.state
		db.get("session")
			.then(doc =>
				this.props.addBanner(
					{ title, thumbnails, type: typeSelected, category: categorySelected },
					doc.accessToken
				)
			)
			.then(res => {
				return ReactSwal.fire({
					title: "Banner Added",
					type: "success",
					confirmButtonText: "Close"
				}).then(res => window.location.reload())
			})
	}

	handleUpdateBanner() {
		const {
			banner_id,
			title,
			thumbnail_url,
			thumbnails,
			typeSelected,
			categorySelected
		} = this.state

		db.get("session")
			.then(doc => {
				return thumbnail_url
					? this.props.updateBanner(
							{
								banner_id,
								title,
								thumbnail_url,
								type: typeSelected,
								category: categorySelected
							},
							doc.accessToken
					  )
					: this.props.updateBannerWithImage(
							{
								banner_id,
								title,
								thumbnails,
								type: typeSelected,
								category: categorySelected
							},
							doc.accessToken
					  )
			})
			.then(res => {
				return ReactSwal.fire({
					title: "Banner Updated",
					type: "success",
					confirmButtonText: "Close"
				}).then(res => window.location.reload())
			})
	}

	handleActiveBanner(data) {
		const banner_id = data.target.attributes.getNamedItem("data-banner-id")
			.value
		db.get("session").then(doc =>
			this.props.setActiveBanner(banner_id, doc.accessToken)
		)
	}

	handleUnactiveBanner(data) {
		const banner_id = data.target.attributes.getNamedItem("data-banner-id")
			.value
		db.get("session").then(doc =>
			this.props.setUnactiveBanner(banner_id, doc.accessToken)
		)
	}

	handleDeleteBanner(data) {
		const banner_id = data.target.attributes.getNamedItem("data-banner-id")
			.value

		ReactSwal.fire({
			title: "Delete Banner",
			text: "Are you sure?",
			type: "warning",
			confirmButtonText: "Delete",
			showCancelButton: true,
			preConfirm: () => {
				return db
					.get("session")
					.then(doc => this.props.deleteBanner(banner_id, doc.accessToken))
			}
		}).then(res => {
			if (res.value) {
				return ReactSwal.fire({
					title: "Banner Deleted",
					type: "success"
				})
			}
		})
	}

	render() {
		const {
			thumbnails,
			thumbnail_url,
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
					handleUpdateBanner={() => this.handleUpdateBanner()}
					title={title}
					onChangeTitle={e => this.setState({ title: e.target.value })}
					thumbnail={thumbnails}
					thumbnailUrl={thumbnail_url}
					onChangeThumbnail={thumbnails => this.setState({ thumbnails })}
					categorySelected={categorySelected}
					typeSelected={typeSelected}
					onChangeCategory={e =>
						this.setState({ categorySelected: e.target.value })
					}
					categories={categories}
					onChangeType={e => this.setState({ typeSelected: e.target.value })}
					types={types}
					onClearImage={() =>
						this.setState({ thumbnails: "", thumbnail_url: "" })
					}
					handleCancel={() => this.props.setNavigation({ banner: "banner" })}
					submitType={navigationBanner}
				/>
			)
		}

		return (
			<Banner
				banners={banners}
				onSetActive={this.handleActiveBanner.bind(this)}
				onSetUnactive={this.handleUnactiveBanner.bind(this)}
				onAddBanner={this.onNavigateAddBanner.bind(this)}
				onUpdateBanner={this.onNavigateUpdateBanner.bind(this)}
				onDeleteBanner={this.handleDeleteBanner.bind(this)}
			/>
		)
	}
}

const mapStateToProps = state => ({
	banners: state.banners,
	navigationBanner: state.navigation.banner,
	navigationBannerData: state.navigation.banner_data
})

const mapDispatchToProps = dispacth => ({
	setNavigation: navigation => dispacth(setNavigation(navigation)),
	fetchBanners: accessToken => dispacth(fetchBanners(accessToken)),
	addBanner: (data, accessToken) => dispacth(addBanner(data, accessToken)),
	updateBanner: (data, accessToken) =>
		dispacth(updateBanner(data, accessToken)),
	updateBannerWithImage: (data, accessToken) =>
		dispacth(updateBannerWithImage(data, accessToken)),
	setActiveBanner: (banner_id, accessToken) =>
		dispacth(setActiveBanner(banner_id, accessToken)),
	setUnactiveBanner: (banner_id, accessToken) =>
		dispacth(setUnactiveBanner(banner_id, accessToken)),
	deleteBanner: (banner_id, accessToken) =>
		dispacth(deleteBanner(banner_id, accessToken))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BannerContainer)
