import React from "react"
import { Row } from "react-bootstrap"

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
      <Row>
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
      </Row>
    </div>
  )
}

export default Login
