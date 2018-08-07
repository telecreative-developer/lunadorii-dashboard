import React from "react"
import { Grid, Row, Col } from "react-bootstrap"
import Card from "../../components/Card/Card"

const DetailReport = ({ DetailReport }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col md={12}>
          <Card
            title="AWS Support (Basic) Sign-Up Confirmation"
            ctTableFullWidth
            ctTableResponsive
            content={
              <div style={styles.wrapFullMessage}>
                <Row>
                  <Col xs={10}>
                    <p style={styles.textFullName}>
                      <small>Rendi Simamora</small>
                    </p>
                    <p>
                      <small>rendisimamora7127@gmail.com</small>
                    </p>
                    <div style={styles.wrapMessage}>
                      <p style={styles.textMessage}>
                        Greetings from Amazon Web Services, Thank you for
                        signing up for AWS Support (Basic). You now have access
                        to AWS Support (Basic). If you interact with AWS
                        programmatically using the SDKs, Command Line Interface
                        (CLI), or APIs, you must provide access keys to verify
                        who you are and whether you have permission to access
                        the resources you're requesting. Manage your account's
                        access keys »
                      </p>
                    </div>
                  </Col>
                  <Col xs={2}>
                    <p style={styles.textDate}>12 Juni 2018</p>
                  </Col>
                </Row>
              </div>
            }
          />
          <label>Reply</label>
          <textarea
            className="form-control"
            rows="5"
            required="ON"
            maxLength="255"
            placeholder="Write.."
          />
          <button className="btn btn-primary" style={styles.btnSend}>
            Send
          </button>
        </Col>
      </Row>
    </Grid>
  </div>
)

const styles = {
  btnSend: {
    background: '#3279b8',
    border: 'none',
    float: 'right',
    marginTop: 10,
    color: '#fff'
  },
  iconSend: {
    fontSize: 18
  },
  textDate: {
    fontSize: 12,
    float: "right",
    marginRight: 15
  },
  textMessage: {
    fontSize: 12
  },
  textFullName: {
    marginTop: 5,
    lineHeight: 0,
    fontWeight: "bold"
  },
  wrapFullMessage: {
    marginLeft: 15
  },
  wrapMessage: {
    marginTop: 10
  }
}

export default DetailReport
