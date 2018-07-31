import React, { Component } from "react"
import { Row, Grid } from "react-bootstrap"

class Users extends Component {
  render() {
    return (
      <div className="contentLoading">
        <Row>
          <Grid xs={12}>
            <div className="loading-bro">
              <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
                <circle id="loading-inner" cx="75" cy="75" r="60"/>
              </svg>
            </div>
          </Grid>
        </Row>
      </div>
    );
  }
}

export default Users;
