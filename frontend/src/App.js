import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Home from './components/Home'
import { connect } from "react-redux"
import Expenses from "./components/Expenses"
import { logIn, alreadyLogged } from "./reducers/userReducer"
import { Container } from 'semantic-ui-react'
import {
	BrowserRouter as Router, Route, Redirect
} from "react-router-dom"

const App = (props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const user = props.user

	useEffect(() => {
		props.alreadyLogged()
	}, [])

	const handleLogin = async () => {
		// make the 2 strings into an object
		const credentials = {
			username: username,
			password: password
		}
		props.logIn(credentials)
	}

	return (
		<Container>
			<Router>
				<div>
					<NavBar user={user} />
				</div>
				<Container style={{ marginTop: '7em' }}>
				<Route exact path="/" render={() =>
					<Home />
				}/>
				<Route exact path="/login" render={() => 
					user === null ?
					<LoginForm 
						handleLogin={handleLogin}
						username={username}
						setUsername={setUsername}
						password={password}
						setPassword={setPassword}
					/> :
					<Redirect to="/expenses"/>
				}/> 
				<Route exact path="/expenses" render={() => 
					<Expenses />
				} />
			</Container>
			</Router>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	alreadyLogged,
	logIn
}

export default 
connect(mapStateToProps,mapDispatchToProps)(App)