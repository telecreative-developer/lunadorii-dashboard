import React from "react"
import { Grid, Row, Col, Table } from "react-bootstrap"
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

const Banner = ({ banners, onAddBanner }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col md={12}>
          <button onClick={onAddBanner} className="btn btn-primary">
            Add Mode
          </button>
          <Card
            title="All Banners"
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
                  {banners.map((banner, key) => (
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
                      <td>{banner.active ? "Active" : "Not Active"}</td>
                      <td>{moment(banner.created_at).format("LLL")}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          style={styles.btnEdit}>
                          Edit
                        </button>
                        {banner.active ? (
                          <button
                            className="btn btn-danger"
                            style={styles.btnEdit}>
                            Unactive
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            style={styles.btnEdit}>
                            Active
                          </button>
                        )}
                        <button
                          className="btn btn-danger"
                          style={styles.btnEdit}>
                          Remove
                        </button>
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
  btnEdit: {
    marginLeft: 5,
    marginRight: 5
  },
  btnRemove: {
    marginLeft: 5,
    marginRight: 5
  }
}

export default Banner
