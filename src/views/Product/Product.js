import React from "react"
import moment from "moment"
import { Grid, Row, Col, Table } from "react-bootstrap"
import Card from "../../components/Card/Card"

const tableHead = ["No", "Picture", "Product", "Description", "Price", "Discount", "Sub Category", "Brand", "Action"]

const Product = ({ product }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <button className="btn btn-primary" style={styles.btnAdd}>
            Add Products
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
                  <tr>
                    <td>1</td>
                    <td><img src="https://www.optidaily.com/wp-content/uploads/2017/11/4-Merek-Produk-Kecantikan-Korea-yang-Populer-.jpg" style={{width: 100}}/></td>
                    <td>L'Oreal Paris Voluminous Lash Paradise Waterproof Mascara - Black</td>
                    <td>L'Oreal Paris Lash Paradise Mascara!</td>
                    <td>102900</td>
                    <td>100</td>
                    <td>Face</td>
                    <td>Zara</td>
                    <td>
                      <button
                        className="btn btn-info"
                        style={styles.btnEdit}>
                        Edit
                      </button>
                    </td>
                  </tr>
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
    marginTop: 10,
    marginBottom: 10,
    float:'right'
  },
  btnEdit: {
    width: 90,
    marginLeft: 5,
    marginRight: 5
  },
}


export default Product