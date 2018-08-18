import React from "react"
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip } from "react-bootstrap"
import Card from "../../components/Card/Card"
import { convertToIDR } from "../../lib/conversion"

const tableHead = [
  "No",
  "Picture",
  "Product",
  "Price",
  "Discount",
  "Category",
  "Brand",
  "Reviews",
  "Action"
]

const tooltipShow = (
  <Tooltip id="tooltip">
    <strong>Show Product</strong>
  </Tooltip>
)

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

const Product = ({ products, onAddProduct }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <button
            className="btn btn-primary"
            onClick={onAddProduct}
            style={styles.btnAdd}>
            Add Product
          </button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card
            title="All Products"
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
                  {products.map((product, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>
                        <img
                          alt="product-thumbnail"
                          src={product.thumbnails[0].thumbnail_url}
                          style={{ width: 100 }}
                        />
                      </td>
                      <td>{product.product}</td>
                      <td>{convertToIDR(product.price)}</td>
                      <td>{product.discount_percentage}%</td>
                      <td>{product.subcategories[0].subcategory}</td>
                      <td>{product.brands[0].brand}</td>
                      <td>
                        {product.reviews.length
                          ? product.reviews.length
                          : "Not yet"}
                      </td>
                      <td>
                        <OverlayTrigger placement="top" overlay={tooltipShow}>
                          <button
                            className="btn btn-primary"
                            style={styles.btnShow}>
                            <i
                              className="btn btn-primary"
                              class="pe-7s-look"
                            />
                          </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={tooltipEdit}>
                          <button className="btn btn-info" style={styles.btnEdit}>
                            <i
                              className="pe-7s-eyedropper"
                              style={{ color: "#fff" }}
                            />
                          </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={tooltipRemove}>
                          <button
                            className="btn btn-default"
                            style={styles.btnDefault}>
                            <i
                              className="pe-7s-trash"
                              style={{ color: "#fff" }}
                            />
                          </button>
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
  btnAdd: {
    background: "#3279b8",
    border: "none",
    float: "right",
    marginBottom: 10,
    color: "#fff"
  },
  btnShow: {
    background: "#3279b8",
    border: "none",
    color: "#fff",
    marginRight: 10
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
}

export default Product
