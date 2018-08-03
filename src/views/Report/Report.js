import React from "react"
import moment from "moment"
import { Grid, Row, Col, Table } from "react-bootstrap"
import Card from "../../components/Card/Card"

const tableHead = ["No", "Name", "Email", "Subject", "Content", "Reported At"]

const Report = ({ reports }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col md={12}>
          <Card
            title="All Reports"
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
                  {reports.map((report, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{report.name}</td>
                      <td>{report.email}</td>
                      <td>{report.subject}</td>
                      <td>{report.content}</td>
                      <td>{moment(report.created_at).format("LLL")}</td>
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

export default Report
