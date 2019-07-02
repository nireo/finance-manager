import React from "react"
import { connect } from "react-redux"
import { Container, Segment, Header, Label } from "semantic-ui-react" 


const Settings = (props) => {
    if (props.userData === null) {
        return null
    }

    return (
        <Container text>
            <Header as="h1">Settings</Header>
            <Segment>
                username: {props.userData.allInfo[0].username} <Label as="a">edit</Label>
                name: {props.userData.allInfo[0].name} <Label as="a">edit</Label>
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