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
  // "Reviews",
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

const Product = ({
  products,
  onAddProduct,
  onDeleteProduct,
  loadingDeleteProduct,
  onShowDetailProduct
}) => (
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
                      <td>{convertToIDR(product.price - (product.price * product.discount) / 100)}</td>
                      <td>{product.discount_percentage}%</td>
                      <td>{product.subcategories[0].subcategory}</td>
                      <td>{product.brands[0].brand}</td>
                      {/* <td>
                        {product.reviews.length
                          ? product.reviews.length
                          : "Not yet"}
                      </td> */}
                      <td>
                        <OverlayTrigger placement="top" overlay={tooltipShow}>
                          <button
                            data-product-title={product.product}
                            data-product-brand={product.brands[0].brand}
                            data-product-subcategory={
                              product.subcategories[0].subcategory
                            }
                            data-product-discount={product.discount}
                            data-product-discount-percentage={
                              product.discount_percentage
                            }
                            data-product-price={product.price}
                            data-product-description={product.description}
                            data-product-detail={product.detail}
                            data-product-howtouse={product.to_use}
                            data-product-weight={100}
                            data-product-thumbnails={JSON.stringify(
                              product.thumbnails
                            )}
                            onClick={onShowDetailProduct}
                            className="btn btn-primary"
                            style={styles.btnShow}>
                            <i
                              data-product-title={product.product}
                              data-product-brand={product.brands[0].brand}
                              data-product-subcategory={
                                product.subcategories[0].subcategory
                              }
                              data-product-discount={product.discount}
                              data-product-discount-percentage={
                                product.discount_percentage
                              }
                              data-product-price={product.price}
                              data-product-description={product.description}
                              data-product-detail={product.detail}
                              data-product-howtouse={product.to_use}
                              data-product-weight={100}
                              data-product-thumbnails={JSON.stringify(
                                product.thumbnails
                              )}
                              className="pe-7s-look"
                            />
                          </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={tooltipEdit}>
                          <button
                            className="btn btn-info"
                            style={styles.btnEdit}>
                            <i
                              className="pe-7s-eyedropper"
                              style={{ color: "#fff" }}
                            />
                          </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={tooltipRemove}>
                          {loadingDeleteProduct ? (
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
                              data-product-id={product.product_id}
                              className="btn btn-default"
                              onClick={onDeleteProduct}
                              style={styles.btnDefault}>
                              <i
                                data-product-id={product.product_id}
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
  }
}

export default Product
