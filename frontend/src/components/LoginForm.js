import React, { useState } from "react"
import { Button, Form, Header, Container } from 'semantic-ui-react'
import userService from "../services/user"
import Notifaction from "./Notification"
import SignUpForm from "./SignUpForm"

const LoginForm = (props) => {
    const [ showLogin, setShowLogin ] = useState(true)
    const [ name, setName ] = useState("")
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ message, setMessage ] = useState(null)

    const handleSignUp = async () => {
        const user = {
            name: name,
            username: username,
            password: password
        }
        try {
            await userService.signUp(user)
            setMessage(`welcome ${name} to finance manager now you can sign up using the credentials`)
            setTimeout(() =>{
                setMessage(null)
            }, 5000)
        } catch (error) {
            console.log("something went wrong")
        }
    }

    if (!showLogin) {
        return (
        <Container text>
        <Notifaction header="Signed up succesfully" message={message} type="success" />
        <SignUpForm 
                name={name} setName={setName} username={username} setUsername={setUsername}
                password={password} setPassword={setPassword} handleSignUp={handleSignUp}
                setShowLogin={setShowLogin} showLogin={showLogin}
            />
        </Container>
            )
    }

    return (
    <div>
        <Container text>
        <Notifaction header="Signed up succesfully" message={message} type="success" />
        <Header as="h1">Log-in to your account</Header>
        <Form size="large" onSubmit={props.handleLogin}>
            <Form.Field>
                <label>Username</label>
                <Form.Input
                icon="user"
                iconPosition="left"
                type="text"
                value={props.username}
                onChange={({ target }) => props.setUsername(target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <Form.Input
                icon="lock"
                iconPosition="left"
                type="password"
                value={props.password}
                onChange={({ target }) => props.setPassword(target.value)}
                />
            </Form.Field>
            <div>
                <Button type="submit">Login</Button>Don't have an account? 
                <a onClick={() => setShowLogin(!showLogin)}> Sign up</a>
            </div>
        </Form>
        </Container>
    </div>)
}

export default LoginForm