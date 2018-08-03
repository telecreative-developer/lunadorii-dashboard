import React from "react"
import { Grid, Row, Col } from "react-bootstrap"

const Login = ({
  username,
  password,
  loading,
  onInputUsername,
  onInputPassword,
  onLogin
}) => {
  return (
    <div className="contentLogin">
      <Grid>
        <Row>
          <Col xs={3}/>
          <Col xs={6}>
            <div className="login-page">
              <div className="form">
                <center>
                  <h3>Lunadorii</h3>
                </center>
                <input
                  type="text"
                  onInput={onInputUsername}
                  value={username}
                  placeholder="username"
                />
                <input
                  type="password"
                  onInput={onInputPassword}
                  value={password}
                  placeholder="password"
                />
                {loading ? (
                  <button>LOADING</button>
                ) : (
                  <button onClick={onLogin}>LOGIN</button>
                )}
              </div>
            </div>
          </Col>
          <Col xs={3}/>
        </Row>
      </Grid>
    </div>
  )
}

export default Login
