import React from "react"
import { Button, Form, Header, Container } from 'semantic-ui-react'

const LoginForm = (props) => (
    <div>
        <Container text>
        <Header as="h1">Log-in to your account</Header>
        <Form size="large" onSubmit={props.handleLogin}>
            <Form.Field>
                <input 
                placeholder="username" 
                type="text"
                value={props.username}
                onChange={({ target }) => props.setUsername(target.value)}
                />
            </Form.Field>
            <Form.Field>
                <input 
                placeholder="password"
                type="password"
                value={props.password}
                onChange={({ target }) => props.setPassword(target.value)}
                />
            </Form.Field>
            <div><Button type="submit">Login</Button></div>
        </Form>
        </Container>
    </div>
)

export default LoginForm