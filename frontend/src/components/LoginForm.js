import React from "react"
import { Button, Form } from 'semantic-ui-react'

const LoginForm = (props) => (
    <div>
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
            <Button type="submit">Login</Button>
        </Form>
    </div>
)

export default LoginForm