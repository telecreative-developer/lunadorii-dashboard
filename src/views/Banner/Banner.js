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
        <Col xs={12}>
          <button onClick={onAddBanner} className="btn btn-primary" style={styles.btnAdd}>
            Add Banners
          </button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
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
                      <td>{moment(banner.created_at).format("LLL")}</td>
                      <td>
                        {banner.active ? 
                          <button style={styles.btnActive}>Active</button> : 
                          <button style={styles.btnNotActive}>Not Active</button>
                        }
                      </td>
                      <td>
                        <button
                          className="btn btn-info"
                          style={styles.btnEdit}>
                          Edit
                        </button>
                        {banner.active ? (
                          <button
                            className="btn btn-warning"
                            style={styles.btnEdit}>
                            Set Unactive
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            style={styles.btnEdit}>
                            Set Active
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
  btnAdd:{
    marginTop: 10,
    marginBottom: 10,
    float:'right'
  },
  btnEdit: {
    width: 120,
    marginLeft: 5,
    marginRight: 5
  },
  btnRemove: {
    marginLeft: 5,
    marginRight: 5
  },
  btnActive:{
    background: '#46a946', 
    color: '#fff', 
    width: 90, 
    borderRadius: 13, 
    border:'none', 
    fontSize: 12, 
    padding: 5
  },
  btnNotActive:{
    background: '#f14d4d', 
    color: '#fff', 
    width: 90, 
    borderRadius: 13, 
    border:'none', 
    fontSize: 12, 
    padding: 5
  }
}

export default Banner
