import React, { useState} from 'react';
import login from './service/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})

  const handleLogin = async () => {
    const user = await login.login({username, password})
    console.log(user)
    setUser(user)
    console.log(user)
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        <button type="submit">login</button>
      </form>
      <div>user: {user.name}</div>
    </div>
  )
}

export default App;
