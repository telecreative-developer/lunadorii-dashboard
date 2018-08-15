import React from "react"
import { Grid, Row, Col, Table } from "react-bootstrap"
import moment from "moment"
import Card from "../../components/Card/Card"

const tableHead = ["No", "Avatar", "Fullname", "Email", "Joined At", "Verified"]

const User = ({ users }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col md={12}>
          <Card
            title="All Users"
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
                  {users.map((user, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>
                        <img
                          alt="user-avatar"
                          src={user.avatar_url}
                          style={styles.userAvatar}
                        />
                      </td>
                      <td>{user.first_name + " " + user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{moment(user.joined_at).format("LL")}</td>
                      <td>
                        {user.verified ? (
                          <button style={styles.btnActive}>Verified</button>
                        ) : (
                          <button style={styles.btnNotActive}>
                            Unverified
                          </button>
                        )}
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
  userAvatar: {
    width: 50,
    height: 50
  },
  btnActive: {
    background: "#80c67b",
    color: "#fff",
    width: 90,
    borderRadius: 13,
    border: "none",
    fontSize: 12,
    padding: 5
  },
  btnNotActive: {
    background: "#e47672",
    color: "#fff",
    width: 90,
    borderRadius: 13,
    border: "none",
    fontSize: 12,
    padding: 5
  }
}

export default User
