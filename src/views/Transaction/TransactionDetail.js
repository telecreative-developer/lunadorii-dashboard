import React from "react"
import { Grid, Row, Col, Table } from "react-bootstrap"
import Card from "../../components/Card/Card"
import moment from "moment"
import { convertToIDR } from "../../lib/conversion"

const tableHead = ["No", "Product", "Price", "Qty", "Subtotal"]

const TransactionDetail = ({ transaction, onNavigateToTransaction, onChangeResi, resi, loadingProduct, handleChangeToPacking, handleChangeToShipping }) => (
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
                      <p style={styles.txtLabel}>
                        Transaction Code :{" "}
                        <span style={styles.span}>
                          {transaction.billing_code &&
                            transaction.billing_code.toUpperCase()}
                        </span>
                      </p>
                      <p style={styles.txtLabel}>
                        Delivery Service :{" "}
                        <span style={styles.span}>
                          {transaction.delivery_service &&
                            transaction.delivery_service.toUpperCase()}
                        </span>
                      </p>
                      <p style={styles.txtLabel}>
                        Delivery Price :{" "}
                        <span style={styles.span}>
                          {transaction.delivery_price &&
                            convertToIDR(transaction.delivery_price)}
                        </span>
                      </p>
                      <p style={styles.txtLabel}>
                        Total Price :{" "}
                        <span style={styles.span}>
                          {transaction.total && convertToIDR(transaction.total)}
                        </span>
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div style={styles.divRight}>
                      <p style={styles.txtLabel}>
                        Order Status :{" "}
                        <span style={styles.spanCheckout}>
                          {transaction.order_status &&
                            transaction.order_status.toUpperCase()}
                        </span>
                      </p>
                      <p style={styles.txtLabel}>
                        Transaction Status (Midtrans) :{" "}
                        <span style={styles.spanCheckout}>
                          {transaction.midtrans_response &&
                            transaction.midtrans_response.transaction_status.toUpperCase()}
                        </span>
                      </p>
                      <p style={styles.txtLabel}>
                        Payment Method :{" "}
                        <span style={styles.span}>
                          {transaction.paid_method}
                        </span>
                      </p>
                      <p style={styles.txtLabel}>
                        Payment Date :{" "}
                        <span style={styles.span}>
                          {moment(transaction.created_at).format("LLL")}
                        </span>
                      </p>
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
                    {transaction.list &&
                      transaction.list.map((d, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{d.product}</td>
                          <td>{convertToIDR(d.price)}</td>
                          <td>{d.qty}</td>
                          <td>{convertToIDR(d.qty * d.price)}</td>
                        </tr>
                      ))}
                  </tbody>
                  <thead>
                    <tr>
                      <th className="borderBottom" />
                      <th className="borderBottom" />
                      <th className="borderBottom" />
                      <th className="borderBottom" />
                      <th>Total Price : </th>
                    </tr>
                    <tr>
                      <th className="border" />
                      <th className="border" />
                      <th className="border" />
                      <th className="border" />
                      <th style={styles.th}>
                        {transaction.total && convertToIDR(transaction.total)}
                      </th>
                    </tr>
                  </thead>
                </Table>
                {transaction.order_status && transaction.order_status.toUpperCase() === "PACKING" ? (
                  <Row>
                    <Col md={8} />
                    <Col md={4} style={{paddingLeft: 35, marginBottom: 10}}>
                    <label>Resi Number</label>
                    <input
                      type="text"
                      name="resi"
                      className="form-control"
                      onKeyUp={onChangeResi}
                      disabled={loadingProduct}
                      placeholder="Resi Number"
                      style={{textTransform: 'uppercase'}}
                    />
                    </Col>
                  </Row>
                ) : null }
                <Row>
                  <Col md={8} />
                  <Col md={4}>
                    {transaction.order_status && transaction.order_status.toUpperCase() === "ACCEPTED_PAYMENT" ||
                      (transaction.order_status && transaction.order_status.toUpperCase() === "CHECKOUT" &&
                      transaction.midtrans_response && transaction.midtrans_response.transaction_status.toUpperCase() === "SETTLEMENT") ? (
                      <button
                        data-transaction-code={transaction.billing_code && transaction.billing_code.toUpperCase()}
                        className="btn btn-primary"
                        onClick={handleChangeToPacking}
                        style={styles.btnSave}>
                          change to packing
                      </button>
                    ) : transaction.order_status && transaction.order_status.toUpperCase() === "PACKING" ? (
                      <button
                      data-transaction-code={transaction.billing_code && transaction.billing_code.toUpperCase()}
                        disabled={!resi}
                        className="btn btn-primary"
                        onClick={handleChangeToShipping}
                        style={styles.btnSave}>
                          change to shipping
                      </button>
                    ) : null}
                    <button
                      className="btn btn-warning"
                      onClick={onNavigateToTransaction}
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
  wrapBody: {
    paddingLeft: 15,
    paddingRight: 15
  },
  btnSave: {
    background: "#3279b8",
    border: "none",
    float: "left",
    marginLeft: 20,
    color: "#fff"
  },
  btnCancel: {
    background: "#ffc107",
    border: "none",
    color: "#000",
    float: "right"
  },
  txtLabel: {
    fontSize: 14
  },
  span: {
    fontWeight: "bold"
  },
  spanCheckout: {
    color: "#d11e47",
    fontWeight: "bold"
  },
  divLeft: {
    float: "left"
  },
  divRight: {
    float: "Right"
  },
  th: {
    fontSize: 14,
    color: "#000"
  }
}

export default TransactionDetail
