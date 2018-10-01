import React from "react"
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip, FormControl } from "react-bootstrap"
import moment from "moment"
import Card from "../../components/Card/Card"
import { convertToIDR } from "../../lib/conversion"

const tableHead = [
  "No",
  "Billing Code",
  "Order Status",
  "Payment Method",
  "Resi Number",
  "Delivery Service",
  "Delivery Price",
  "Total",
  "Transaction Time",
  "Actions"
]

const tooltipRemove = (
  <Tooltip id="tooltip">
    <strong>Decline</strong>
  </Tooltip>
)

const tooltipAccept = (
  <Tooltip id="tooltip">
    <strong>Accept</strong>
  </Tooltip>
)

const tooltipDetail = (
  <Tooltip id="tooltip">
    <strong>Detail Items</strong>
  </Tooltip>
)

const Transaction = ({ transactions, onNavigateTransactionDetail, searchByTitle, onChangeSearch }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col md={12}>
          <Card
            title="All Transaction"
            search={
              <form>
                <FormControl
                  type="text"
                  placeholder="Search By Billing Code"
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
                  {transactions.filter(transactions => transactions.billing_code.toLowerCase().indexOf(searchByTitle) > -1 ).map((transaction, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{transaction.billing_code}</td>
                      {transaction.order_status !== "checkout" ? (
                        <td>{transaction.order_status}</td>
                      ): (
                        <td><p style={styles.checkout} >{transaction.order_status}</p></td>
                      )}
                      <td>
                        {transaction.paid_method === "credit_card"
                          ? "Credit Card"
                          : `${transaction.paid_method} (${transaction.bank})`}
                      </td>
                      <td>
                        {transaction.receipt_number
                          ? transaction.receipt_number
                          : "Not yet"}
                      </td>
                      <td>{transaction.delivery_service}</td>
                      <td>{convertToIDR(transaction.delivery_price)}</td>
                      <td>{convertToIDR(transaction.total)}</td>
                      <td>{moment(transaction.created_at).format("LLL")}</td>
                      <td>
                        <OverlayTrigger placement="top" overlay={tooltipDetail}>
                          <button
                            className="btn btn-primary"
                            data-order-id={transaction.order_id}
                            onClick={onNavigateTransactionDetail}
                            style={styles.btnShow}>
                            <i
                              className="pe-7s-look"
                              data-order-id={transaction.order_id}
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
  btnDetail: {
    background: "#3472F7",
    border: "none",
    marginRight: 10
  },
  btnSuccess: {
    background: "#5bb95b",
    border: "none",
    marginRight: 10
  },
  btnDanger: {
    background: "#da534e",
    border: "none",
    marginRight: 10
  },
  btnShow: {
    background: "#3279b8",
    border: "none",
    color: "#fff",
    marginRight: 10
  },
  btnDecline: {
    background: "#e47672",
    border: "none",
    color: "#fff",
    marginRight: 10
  },
  checkout: {
    color: "red"
  }
}

export default Transaction
