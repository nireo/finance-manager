import React from "react"
import { Menu, Container, Dropdown, Icon } from "semantic-ui-react"
import { Link  } from "react-router-dom"
import { connect } from 'react-redux'
import { logOut } from "../reducers/userReducer"

const NavBar = (props) => {
    return (
        <Container>
        <Menu fixed="top" >
            <Container>
                <Menu.Item as='a' header>
                    <Link style={{ color: 'black' }}to="/"><Icon name="pie chart" />Finance Manager</Link>
                </Menu.Item>
                {(!props.user &&
                    <Menu.Item link>
                       <Link to="/login">login</Link>
                   </Menu.Item>
                )}
                {(props.user &&
                    <Menu.Item link>
                        <Link to="/expenses"><Icon name="dollar" />expenses</Link>
                    </Menu.Item>    
                )}
                {(props.user &&
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Icon name="user" />
                            <Dropdown text={props.user.name} item simple>
                                <Dropdown.Menu>
                                    <Dropdown.Item><Link style={{ color: 'black' }}to="/expenses"><Icon name="dollar" />Expenses</Link></Dropdown.Item>
                                    <Dropdown.Item><Icon name="settings" /><Link style={{ color: 'black' }} to="/settings">Settings</Link></Dropdown.Item>
                                    <Dropdown.Item onClick={props.logOut}><Icon name="sign out"/>Sign out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </Menu.Menu>
                )}
            </Container>
        </Menu>
        </Container>
    )
}

const mapDispatchToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapDispatchToProps, { logOut })(NavBar)