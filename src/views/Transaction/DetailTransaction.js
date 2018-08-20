import React from "react"
import { Grid, Row, Col, Table } from "react-bootstrap"
import Card from "../../components/Card/Card"

const tableHead = [
  "No",
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
              <div style={styles.wrapBody}>
                <Row>
                  <Col md={6}>
                    <div style={styles.divLeft}>
                      <p style={styles.txtLabel}>Transaction Code : <span style={styles.span}>LDFEVBRMCDXOQ</span></p>
                      <p style={styles.txtLabel}>Shipping Method : <span style={styles.span}>JNE</span></p>
                      <p style={styles.txtLabel}>Status : <span style={styles.spanCheckout}>Checkout</span></p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div style={styles.divRight}>
                      <p style={styles.txtLabel}>Total Price : <span style={styles.span}>LDFEVBRMCDXOQ</span></p>
                      <p style={styles.txtLabel}>Payment Method : <span style={styles.span}>Bank Transfer</span></p>
                      <p style={styles.txtLabel}>Payment Expired : <span style={styles.span}>Yesterday at 11:19 AM</span></p>
                    </div>
                  </Col>
                </Row>
                
                <Table striped>
                  <thead>
                    <tr>
                      {tableHead.map((head, key) => <th key={key}>{head}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td>1</td>
                        <td>Rose Lips Vaseline Lip Therapy Mini The Vaseline Petroleum Jell Ori</td>
                        <td>Rp 100.000</td>
                        <td>20</td>
                        <td>Rp 2.000.000</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Rose Lips Vaseline Lip Therapy Mini The Vaseline Petroleum Jell Ori</td>
                        <td>Rp 100.000</td>
                        <td>1</td>
                        <td>Rp 200.000</td>
                      </tr>
                  </tbody>
                  <thead>
                      <tr>
                        <th className="borderBottom"></th>
                        <th className="borderBottom"></th>
                        <th className="borderBottom"></th>
                        <th>Total Qty: </th>
                        <th>Total Price</th>
                      </tr>
                      <tr>
                        <th className="border"></th>
                        <th className="border"></th>
                        <th className="border"></th>
                        <th style={styles.th}>21</th>
                        <th style={styles.th}>Rp. 20.00.000</th>
                      </tr>
                  </thead>
                </Table>
                <Row>
                  <Col md={10}/>
                  <Col md={2}>
                    <button
                      className="btn btn-warning"
                      style={styles.btnCancel}>
                      Back
                    </button>
                  </Col>
                </Row>
              </div>
            }
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

const styles = {
  wrapBody:{
    paddingLeft: 15, 
    paddingRight: 15
  },
  btnCancel: {
    background: "#ffc107",
    border: "none",
    color: "#000",
    float: 'right'
  },
  txtLabel:{
    fontSize: 14
  },
  span:{
    fontWeight: 'bold'
  },
  spanCheckout:{
    color: '#d11e47', 
    fontWeight: 'bold'
  },
  divLeft:{
    float:'left'
  },
  divRight:{
    float:'Right'
  },
  th:{
    fontSize: 14, 
    color:'#000'
  }
}

export default DetailTransaction
