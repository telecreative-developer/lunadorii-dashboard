import React from "react"
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip, FormControl } from "react-bootstrap"
import moment from "moment"
import Card from "../../components/Card/Card"

const tableHead = [
  "No",
  "Thumbnail",
  "Title",
  "Type",
  "Category",
  "Created At",
  "Active",
  "Action"
]

const tooltipRemove = (
  <Tooltip id="tooltip">
    <strong>Remove</strong>
  </Tooltip>
)

const tooltipEdit = (
  <Tooltip id="tooltip">
    <strong>Edit</strong>
  </Tooltip>
)

const tooltipUnActive = (
  <Tooltip id="tooltip">
    <strong>Set Unactive</strong>
  </Tooltip>
)

const tooltipActive = (
  <Tooltip id="tooltip">
    <strong>Set Active</strong>
  </Tooltip>
)

const Banner = ({
  banners,
  onAddBanner,
  onUpdateBanner,
  onSetUnactive,
  onSetActive,
  onDeleteBanner,
  loadingDeleteBanner,
  searchByTitle,
  onChangeSearch
}) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <button
            onClick={onAddBanner}
            className="btn btn-primary"
            style={styles.btnAdd}>
            Add Banner
          </button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card
            title="All Banners"
            search={
              <form>
                <FormControl
                  type="text"
                  placeholder="Search By Title"
                  value={searchByTitle}
                  onChange={onChangeSearch}
                />
              </form>
            }
            ctTableFullWidth
            ctTableResponsive
            content={
              <Table striped hover>
                <thead>
                  <tr>
                    {tableHead.map((head, key) => <th key={key}>{head}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {banners.filter(banner => banner.title.toLowerCase().indexOf(searchByTitle) > -1 ).map((banner, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>
                        <img
                          alt="banner-thumbnail"
                          src={banner.thumbnail_url}
                          style={styles.bannerThumbnail}
                        />
                      </td>
                      <td>{banner.title}</td>
                      <td>{banner.type}</td>
                      <td>{banner.category}</td>
                      <td>{moment(banner.created_at).format("LLL")}</td>
                      <td>
                        {banner.active ? (
                          <div style={styles.btnActive}>Active</div>
                        ) : (
                          <div style={styles.btnNotActive}>Not Active</div>
                        )}
                      </td>
                      <td>
                        <OverlayTrigger placement="top" overlay={tooltipEdit}>
                          <button
                            data-banner-id={banner.banner_id}
                            data-banner-title={banner.title}
                            data-banner-thumbnail={banner.thumbnail_url}
                            data-banner-type={banner.type}
                            data-banner-category={banner.category}
                            className="btn btn-info"
                            onClick={onUpdateBanner}
                            style={styles.btnEdit}>
                            <i
                              data-banner-id={banner.banner_id}
                              data-banner-title={banner.title}
                              data-banner-thumbnail={banner.thumbnail_url}
                              data-banner-type={banner.type}
                              data-banner-category={banner.category}
                              className="pe-7s-eyedropper"
                              style={{ color: "#fff" }}
                            />
                          </button>
                        </OverlayTrigger>
                        {banner.active ? (
                          <OverlayTrigger
                            placement="top"
                            overlay={tooltipUnActive}>
                            <button
                              data-banner-id={banner.banner_id}
                              className="btn btn-danger"
                              onClick={onSetUnactive}
                              style={styles.btnDanger}>
                              <i
                                data-banner-id={banner.banner_id}
                                className="pe-7s-close-circle"
                                style={{ color: "#fff" }}
                              />
                            </button>
                          </OverlayTrigger>
                        ) : (
                          <OverlayTrigger
                            placement="top"
                            overlay={tooltipActive}>
                            <button
                              data-banner-id={banner.banner_id}
                              onClick={onSetActive}
                              className="btn btn-success"
                              style={styles.btnSuccess}>
                              <i
                                data-banner-id={banner.banner_id}
                                className="pe-7s-check"
                                style={{ color: "#fff" }}
                              />
                            </button>
                          </OverlayTrigger>
                        )}
                        <OverlayTrigger placement="top" overlay={tooltipRemove}>
                          {loadingDeleteBanner ? (
                            <button
                              className="btn btn-default"
                              style={styles.btnDefault}>
                              <i
                                className="pe-7s-trash"
                                style={{ color: "#fff" }}
                              />
                            </button>
                          ) : (
                            <button
                              data-banner-id={banner.banner_id}
                              className="btn btn-default"
                              onClick={onDeleteBanner}
                              style={styles.btnDefault}>
                              <i
                                data-banner-id={banner.banner_id}
                                className="pe-7s-trash"
                                style={{ color: "#fff" }}
                              />
                            </button>
                          )}
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            }
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

const styles = {
  bannerThumbnail: {
    width: 100
  },
  btnAdd: {
    background: "#3279b8",
    border: "none",
    float: "right",
    marginBottom: 10,
    color: "#fff"
  },
  btnEdit: {
    background: "#59c1de",
    border: "none",
    marginRight: 10
  },
  btnDefault: {
    background: "#6d6d6d",
    border: "none",
    marginRight: 10
  },
  btnSuccess: {
    background: "#5bb95b",
    border: "none",
    marginRight: 10
  },
  btnDanger: {
    background: "#da534e",
    border: "none",
    marginRight: 10
  },
  btnActive: {
    background: "#80c67b",
    color: "#fff",
    width: 90,
    borderRadius: 13,
    border: "none",
    textAlign: "center",
    fontSize: 12,
    padding: 5
  },
  btnNotActive: {
    background: "#e47672",
    color: "#fff",
    width: 90,
    borderRadius: 13,
    border: "none",
    textAlign: "center",
    fontSize: 12,
    padding: 5
  }
}

export default Banner
