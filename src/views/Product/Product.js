import React from "react"
import { Grid, Row, Col, Table } from "react-bootstrap"
import Card from "../../components/Card/Card"

const tableHead = [
  "No",
  "Picture",
  "Product",
  "Description",
  "Price",
  "Discount",
  "Category",
  "Brand",
  "Reviews",
  "Action"
]

const Product = ({ products }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <button className="btn btn-primary" style={styles.btnAdd}>
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
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>{product.discount_percentage}</td>
                      <td>{product.subcategories[0].subcategory}</td>
                      <td>{product.brands[0].brand}</td>
                      <td>
                        {product.reviews.length
                          ? product.reviews.length
                          : "Not yet"}
                      </td>
                      <td>
                        <button className="btn btn-info" style={styles.btnEdit}>
                          Edit
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
  btnAdd:{
    background: '#3279b8',
    border: 'none',
    float: 'right',
    marginBottom: 10,
    color: '#fff'
  },
  btnEdit: {
    width: 90,
    marginLeft: 5,
    marginRight: 5
  }
}

export default Product
