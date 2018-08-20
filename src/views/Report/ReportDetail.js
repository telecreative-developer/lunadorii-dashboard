import React from "react"
import moment from "moment"
import { Grid, Row, Col } from "react-bootstrap"
import Card from "../../components/Card/Card"

const ReportDetail = ({
  name,
  email,
  subject,
  content,
  date,
  reply,
  onSendReply,
  onChangeReplyMessage,
  onCloseReport
}) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col md={12}>
          <Card
            title={subject}
            ctTableFullWidth
            ctTableResponsive
            content={
              <div style={styles.wrapFullMessage}>
                <Row>
                  <Col xs={10}>
                    <p style={styles.textFullName}>
                      <small>{name}</small>
                    </p>
                    <p>
                      <small>{email}</small>
                    </p>
                    <div style={styles.wrapMessage}>
                      <p style={styles.textMessage}>{content}</p>
                    </div>
                  </Col>
                  <Col xs={2}>
                    <p style={styles.textDate}>{moment(date).format("LLL")}</p>
                  </Col>
                </Row>
              </div>
            }
          />
          <label>Reply Report</label>
          {!reply.length ? (
            <div>
              <textarea
                className="form-control"
                rows="5"
                required="ON"
                maxLength="255"
                placeholder="Type something..."
                onKeyUp={onChangeReplyMessage}
              />
              <button
                className="btn btn-primary"
                onClick={onSendReply}
                style={styles.btnSend}>
                Send
              </button>
              <button
                className="btn btn-warning"
                onClick={onCloseReport}
                style={styles.btnCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <Card
              title={reply[0].subject}
              ctTableFullWidth
              ctTableResponsive
              content={
                <div style={styles.wrapFullMessage}>
                  <Row>
                    <Col xs={10}>
                      <div style={styles.wrapMessage}>
                        <p style={styles.textMessage}>{reply[0].content}</p>
                      </div>
                    </Col>
                    <Col xs={2}>
                      <p style={styles.textDate}>
                        {moment(reply[0].created_at).format("LLL")}
                      </p>
                    </Col>
                  </Row>
                  <button
                    className="btn btn-warning"
                    onClick={onCloseReport}
                    style={styles.btnClose}>
                    Close
                  </button>
                </div>
              }
            />
          )}
        </Col>
      </Row>
    </Grid>
  </div>
)

const styles = {
  btnSend: {
    background: "#3279b8",
    border: "none",
    float: "right",
    marginTop: 10,
    color: "#fff"
  },
  btnCancel: {
    background: "#ffc107",
    border: "none",
    float: "right",
    marginTop: 10,
    marginRight: 10,
    color: "#000"
  },
  btnClose: {
    background: "#ffc107",
    border: "none",
    float: "right",
    marginTop: 20,
    color: "#000"
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

export default ReportDetail
