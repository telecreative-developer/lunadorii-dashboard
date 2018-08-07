import React from "react"
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip } from "react-bootstrap"
import Card from "../../components/Card/Card"

const tableHead = [
  "No",
  "No Rek",
  "Payment Method",
  "Transaction Time",
  "Status",
  "Action"
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

const Transaction = ({ transaction }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col md={12}>
          <Card
            title="All Transaction"
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
                    <td>1666 2222 3333 4412</td>
                    <td>Credit Card</td>
                    <td>21 Januari 2018</td>
                    <td>Waiting for payments</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>211039283712322</td>
                    <td>BCA</td>
                    <td>21 Februari 2018</td>
                    <td>Waiting for approval</td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={tooltipDetail}>
                        <button
                          className="btn btn-primary"
                          style={styles.btnDetail}>
                          <i
                            className="pe-7s-look"
                            style={{ color: "#fff" }}
                          />
                        </button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        overlay={tooltipAccept}>
                        <button
                          className="btn btn-success"
                          style={styles.btnSuccess}>
                          <i
                            className="pe-7s-check"
                            style={{ color: "#fff" }}
                          />
                        </button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        overlay={tooltipRemove}>
                        <button
                          className="btn btn-danger"
                          style={styles.btnDanger}>
                          <i
                            className="pe-7s-close-circle"
                            style={{ color: "#fff" }}
                          />
                        </button>
                      </OverlayTrigger>
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
  btnDetail:{
    background: '#3472F7',
    border: 'none',
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
}

export default Transaction
