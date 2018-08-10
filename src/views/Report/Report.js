import React from "react"
import moment from "moment"
import { Grid, Row, Col, Table } from "react-bootstrap"
import Card from "../../components/Card/Card"

const tableHead = [
  "No",
  "Name",
  "Email",
  "Subject",
  "Content",
  "Reported At",
  "Read",
  "Reply",
  "Action"
]

const Report = ({ reports, onShowReport }) => (
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
                      <td>{report.read ? "Read" : "Unread"}</td>
                      <td>{report.reply.length ? "Answered" : "Unanswered"}</td>
                      <td>
                        <button
                          data-report-id={report.report_id}
                          data-report-name={report.name}
                          data-report-email={report.email}
                          data-report-subject={report.subject}
                          data-report-content={report.content}
                          data-report-read={report.read}
                          data-report-date={report.created_at}
                          data-report-reply={JSON.stringify(report.reply)}
                          onClick={onShowReport}>
                          Show Report
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

export default Report
