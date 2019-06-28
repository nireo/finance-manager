import React, { useState} from 'react';
import login from './services/login'
import LoginForm from './components/LoginForm'
import { Container } from 'semantic-ui-react'

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
       <LoginForm 
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </Container>
  )
}

export default App