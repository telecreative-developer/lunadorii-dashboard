import React from "react"
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip, FormControl } from "react-bootstrap"
import Card from "../../components/Card/Card"
import { convertToIDR } from "../../lib/conversion"

const tableHead = [
  "No",
  "Name",
  "Icon",
  "Created at",
  "Updated at",
  // "Reviews",
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

const Product = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  loadingDeleteProduct,
  onShowDetailProduct,
  searchByTitle,
  onChangeSearch
}) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <button
            className="btn btn-primary"
            onClick={onAddProduct}
            style={styles.btnAdd}>
            Add Category
          </button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card
            title="All Category"
            search={
              <form>
                <FormControl
                  type="text"
                  placeholder="Search By Product"
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
                  {products.filter(products => products.product.indexOf(searchByTitle) > -1 ).map((product, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{product.product}</td>
                      <td>
                        <img
                          alt="product-thumbnail"
                          src={product.thumbnails[0].thumbnail_url}
                          style={{ width: 100 }}
                        />
                      </td>
                      
                      <td>{product.subcategories[0].subcategory}</td>
                      <td>{product.brands[0].brand}</td>
                      {/* <td>
                        {product.reviews.length
                          ? product.reviews.length
                          : "Not yet"}
                      </td> */}
                      <td>
                        
                        <OverlayTrigger placement="top" overlay={tooltipEdit}>
                          <button
                            data-product-id={product.product_id}
                            data-product-title={product.product}
                            data-product-brand-id={
                              product.brands[0].product_brand_id
                            }
                            data-product-brand={product.brands[0].brand}
                            data-product-subcategory-id={
                              product.subcategories[0].product_subcategory_id
                            }
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
                            onClick={onUpdateProduct}
                            className="btn btn-info"
                            style={styles.btnEdit}>
                            <i
                              data-product-id={product.product_id}
                              data-product-title={product.product}
                              data-product-brand-id={
                                product.brands[0].product_brand_id
                              }
                              data-product-brand={product.brands[0].brand}
                              data-product-subcategory-id={
                                product.subcategories[0].product_subcategory_id
                              }
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
