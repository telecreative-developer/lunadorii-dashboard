import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import HeaderLinks from "../Header/HeaderLinks"
import dashboardRoutes from "../../routes/dashboard"
import logo from "../../assets/img/917a9f5f-1633-40b6-830e-d06fe964b3f5.jpeg"

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth
    }
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : ""
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth })
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  render() {
    return (
      <div id="sidebar" className="sidebar" data-color="black">
        <div className="sidebar-background"/>
          {/* <img src="https://res.cloudinary.com/ajsdjasdbnajsdasjd/image/upload/v1536923311/917a9f5f-1633-40b6-830e-d06fe964b3f5.jpg" alt=""/> */}
        <div className="logo" style={{padding:25}}>
        <div className="logo-img" style={{position:"absolute"}}>
          <img src={logo} alt="logo_image" style={{width:50,height:50,position:"absolute",margin:0}}/>
          </div>
          <a
            href="#"
            style={{marginLeft:80,marginTop:0}}
            className="simple-text logo-normal">
            Lunadorii
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {dashboardRoutes.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.path)
                    }
                    key={key}>
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active">
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                )
              return null
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar
