import React from "react"
import { Grid, Row, Col, Table } from "react-bootstrap"
import Card from "../../components/Card/Card"

const tableHead = [
  "No",
  "Picture",
  "Product",
  "Price",
  "Qty",
  "Total",
]

const DetailTransaction = ({ DetailTransaction }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col md={12}>
          <Card
            title="Detail Transaction"
            ctTableFullWidth
            ctTableResponsive
            content={
              <Table striped hover>
                <thead>
                  <tr>
                    {tableHead.map((head, key) => <th key={key}>{head}</th>)}
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-danger" style={{fontSize: 16, fontWeight: 'bold'}}>
                      Rp 2.200.000
                    </td>
                  </tr>
                </tfoot>
                <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <img
                          alt="product-thumbnail"
                          src="https://cdn.popbela.com/content-images/post/20171230/hmgoepprod-74f1db24ccce932562be6322ef017396_750x500.jpg"
                          style={{ width: 100 }}
                        />
                      </td>
                      <td>Rose Lips Vaseline Lip Therapy Mini The Vaseline Petroleum Jell Ori</td>
                      <td>Rp 100.000</td>
                      <td>20</td>
                      <td>Rp 2.000.000</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <img
                          alt="product-thumbnail"
                          src="https://cdn.popbela.com/content-images/post/20171230/hmgoepprod-74f1db24ccce932562be6322ef017396_750x500.jpg"
                          style={{ width: 100 }}
                        />
                      </td>
                      <td>Rose Lips Vaseline Lip Therapy Mini The Vaseline Petroleum Jell Ori</td>
                      <td>Rp 100.000</td>
                      <td>1</td>
                      <td>Rp 200.000</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>Total Price</th>
                    </tr>
                </thead>
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

export default DetailTransaction
