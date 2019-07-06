import React, { useState } from "react"
import { connect } from "react-redux"
import { Container, Segment, Header, Label, Icon, Menu } from "semantic-ui-react" 
import userService from "../services/user"
import SettingForm from "./SettingForm"

const Settings = (props) => {
    const [ page, setPage ] = useState("Name")
    const [ username, setUsername ] = useState("")
    const [ name, setName ] = useState("")
    if (props.userData === null) {
        return null
    }

    const toPage = (page) => (event) => {
        event.preventDefault()
        setPage(page)
    }  

    const updateProfile = () => {
        if (page === "Name") {
            const object = {
                type: page,
                content: name
            }
            userService.updateProfile(props.userData.allInfo[0]._id, object)
        } else if (page === "Username") {
            const object = {
                type: page,
                content: username
            }
            userService.updateProfile(props.userData.allInfo[0]._id, object)
        }
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
                    <Menu pointing secondary>
                        <Menu.Item name="Name" active={page === "Name"} onClick={toPage("Name")} />
                        <Menu.Item name="Username" active={page === "Username"} onClick={toPage("Username")} />
                    </Menu>
                    {
                        page === "Name" ? (
                            <SettingForm update={updateProfile} icon="male" label="Name"value={name} setValue={setName} />
                        ) : (
                            <SettingForm update={updateProfile} icon="user" label="Username" value={username} setValue={setUsername} />
                        )
                    }
                   
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