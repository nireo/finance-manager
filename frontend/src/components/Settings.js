import React from "react"
import { connect } from "react-redux"
import { Container, Segment, Header, Label, Icon, Form } from "semantic-ui-react" 


const Settings = (props) => {
    if (props.userData === null) {
        return null
    }

    return (
        <Container text>
            <Header cas="h1"><Icon name="settings"/>
                <Header.Content>Settings</Header.Content>
                <Header.Subheader>Manage your user information</Header.Subheader>
            </Header>

            <Segment>
                <Header as="h3">User information</Header>
                <Label>Username</Label>
                <p>{props.userData.allInfo[0].username}</p>
                <Label>Name</Label>
                <p>{props.userData.allInfo[0].name}</p>
                <Label>Amount of expenses</Label>
                <p>{props.userData.allInfo[0].expenses.length}</p>
                <Segment>
                    <Header as="h3">Edit user information</Header>
                    <Form size="small">
                        <Form.Field>
                            <label>Name</label>
                            <Form.Input
                                icon="male"
                                iconPosition="left"
                                type="text"
                            />
                        </Form.Field>
                        
                    </Form>
                </Segment>
            </Segment>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData
    }
}

export default connect(mapStateToProps, null)(Settings)