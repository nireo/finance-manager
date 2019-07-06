import React from "react"
import { Button, Form, Header, Container, Label } from "semantic-ui-react"

const SignUpForm = (props) => {
    return (
        <Container text>
            <Header as="h1">Sign up </Header>
            <Form onSubmit={props.handleSignUp}>
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
                    <label>Name</label>
                    <Form.Input 
                        icon="male"
                        iconPosition="left"
                        type="text"
                        value={props.name}
                        onChange={({ target }) => props.setName(target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    {
                        props.password.length < 4 && <Label basic color="red" pointing="below">Password must be atleast 4 characters long</Label>
                    }
                    <Form.Input
                        icon="lock"
                        iconPosition="left"
                        type="password"
                        value={props.password}
                        onChange={({ target }) => props.setPassword(target.value)}
                    />
                </Form.Field>
                <div>
                    {
                        props.password.length < 4 ? (
                            <Button disabled>Sign up</Button>
                        ) : (
                            <Button type="submit" >Sign up</Button>
                        )
                    }
                    Already have an account?
                    <a onClick={() => props.setShowLogin(!props.showLogin) }> Login</a>
                </div>
            </Form>
        </Container>
    )
}

export default SignUpForm