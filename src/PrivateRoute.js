import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const logged = false;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      logged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
)

export default PrivateRoute