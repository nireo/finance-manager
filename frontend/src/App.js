import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Home from './components/Home'
import { connect } from "react-redux"
import Expenses from "./components/Expenses"
import { logIn, alreadyLogged } from "./reducers/userReducer"
import { setExpenses } from "./reducers/expenseReducer"
import { setData } from "./reducers/allUserInfoReducer"
import { Container } from 'semantic-ui-react'
import Settings from "./components/Settings"
import {
	BrowserRouter as Router, Route, Redirect
} from "react-router-dom"

const App = (props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const user = props.user

	useEffect(() => {
		// first check if localStorage has a user
		props.alreadyLogged()
		// set the rest of the user data 
		props.setData()
		// after that get the expenses
		props.setExpenses()
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
					<Redirect to="/"/>
				}/> 
				<Route exact path="/expenses" render={() => 
					<Expenses />
				} />
				<Route exact path="/settings" render={() => 
					<Settings />
				} />
			</Container>
			</Router>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		userData: state.userData
	}
}

const mapDispatchToProps = {
	alreadyLogged,
	logIn,
	setData,
	setExpenses
}

export default 
connect(mapStateToProps,mapDispatchToProps)(App)