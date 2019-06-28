import React, { useState} from 'react';
import login from './services/login'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Home from './components/Home'
import { Container } from 'semantic-ui-react'
import {
  BrowserRouter as Router, Route, Link, Redirect, withRouter
} from "react-router-dom"

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async () => {
    const user = await login.login({username, password})
    console.log(user)
    setUser(user)
    console.log(user)
  }

  return (
    <Container>
      <Router>
        <div>
          <NavBar />
        </div>
        <Container style={{ marginTop: '7em' }}>
        <Route exact path="/" render={() =>
          <Home />
        }/>
        <Route exact path="/login" render={() => 
          <LoginForm 
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        }/> 
      </Container>
      </Router>
       
    </Container>
  )
}

export default App