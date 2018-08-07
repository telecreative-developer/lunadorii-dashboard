import React from "react"
import { Get } from "react-pouchdb"
import { Route, Redirect } from "react-router-dom"

export const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => (
				<Get
					id="session"
					children={({ exists }) => {
						if (exists) {
							return <Component {...props} />
						} else {
							return props.history.push("/")
						}
					}}
				/>
			)}
		/>
	)
}

export const LoginRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => (
				<Get
					id="session"
					children={({ exists }) => {
						if (exists) {
							return props.history.push("/")
						} else {
							return <Component {...props} />
						}
					}}
				/>
			)}
		/>
	)
}
