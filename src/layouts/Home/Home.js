import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import PouchDB from "pouchdb"
import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import dashboardRoutes from "../../routes/dashboard"
const db = new PouchDB("lunadorii")

class Home extends Component {
  constructor() {
    super()

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    db.get("session")
      .then(() => this.setState({ loading: false }))
      .catch(async err => {
        await window.location.replace("/login")
      })
  }

  render() {
    if (this.state.loading) {
      return <h1>loading</h1>
    }

    return (
      <div className="wrapper">
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.to} key={key} />
              }

              return (
                <Route path={prop.path} component={prop.component} key={key} />
              )
            })}
          </Switch>
        </div>
      </div>
    )
  }
}

export default Home
