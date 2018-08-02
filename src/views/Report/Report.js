import React from "react"
import moment from "moment"
import { Grid, Row, Col } from "react-bootstrap"
import Card from "../../components/Card/Card"

const Report = ({ reports }) => (
  <div className="content">
    <Grid fluid>
      <Card
        title="Reports"
        ctTableFullWidth
        ctTableResponsive
        content={
          <Row>
            <Col xs={12}>
              {reports.map(report => (
                <Row
                  className={
                    report.read ? "wrapper-inbox" : "wrapper-inbox-read"
                  }>
                  <a href="/">
                    <div>
                      <Col xs={2}>
                        <label style={styles.reportLabel}>{report.email}</label>
                      </Col>
                      <Col xs={9}>
                        <p style={styles.reportSubject}>{report.subject}</p>
                        <p style={styles.reportContent}>{report.content}</p>
                      </Col>
                      <Col xs={1}>
                        <p style={styles.reportDate}>
                          {moment(report.created_at).format("LLL")}
                        </p>
                      </Col>
                    </div>
                  </a>
                </Row>
              ))}
            </Col>
          </Row>
        }
      />
    </Grid>
  </div>
)

const styles = {
  reportLabel: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#000"
  },
  reportSubject: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000"
  },
  reportContent: {
    fontSize: 12,
    color: "#000"
  },
  reportDate: {
    float: "right",
    fontSize: 12,
    color: "#000"
  }
}

export default Report
