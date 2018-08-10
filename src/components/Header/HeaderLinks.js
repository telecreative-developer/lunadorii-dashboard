import React from "react"
import { NavItem, Nav } from "react-bootstrap"
import PouchDB from "pouchdb"
const db = new PouchDB("lunadorii")

class HeaderLinks extends React.PureComponent {
  handleSelect(key) {
    if (key === 2) {
      this.handleLogout()
    }
  }

  handleLogout() {
    db.destroy().then(res => window.location.reload())
  }

  render() {
    return (
      <div>
        <Nav pullRight onSelect={this.handleSelect.bind(this)}>
          <NavItem eventKey={1}>Account</NavItem>
          <NavItem eventKey={2}>Log out</NavItem>
        </Nav>
      </div>
    )
  }
}

export default HeaderLinks
