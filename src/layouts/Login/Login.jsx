import React, { Component } from "react";
import { Row } from 'react-bootstrap'

class Notifications extends Component {

  render() {
    return (
      <div className="contentLogin">
        <Row>
        <div class="login-page">
          <div class="form">
            <form class="login-form" action="/dashboard">
              <center>
                <h3>Lunadorii</h3>
              </center>
              <input type="text" placeholder="username"/>
              <input type="password" placeholder="password"/>
              <button>login</button>
            </form>
          </div>
        </div>
        </Row>
      </div>
    );
  }
}

export default Notifications;
