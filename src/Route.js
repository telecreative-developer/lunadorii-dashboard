import React from "react"
import { Get } from "react-pouchdb"
import { Route } from "react-router-dom"

export const PrivateRoute = ({ component: Component, ...props }) => {
	return (
		<Get
			id="session"
			children={({ doc }) => {
				if (doc) {
					return <Route {...props} component={Component} />
				}

				return window.location.replace("/login")
			}}
		/>
	)
}
