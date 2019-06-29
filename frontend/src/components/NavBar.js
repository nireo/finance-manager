import React from "react"
import { Menu, Container } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

const NavBar = (props) => (
    <div>
        <Container>
        <Menu fixed="top" >
            <Container>
                <Menu.Item as='a' header>
                    <Link style={{ color: 'black' }}to="/">Finance Manager</Link>
                </Menu.Item>
                {(!props.user &&
                    <Menu.Item link>
                       <Link to="/login">login</Link>
                   </Menu.Item>
                )}
                {(props.user &&
                    <Menu.Item link>
                        <Link to="/expenses">expenses</Link>
                    </Menu.Item>    
                )}
                {(props.user &&
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            {props.user.name} logged in
                        </Menu.Item>
                        <Menu.Item link>
                            Sign Out
                        </Menu.Item>
                    </Menu.Menu>
                )}
            
            </Container>
        </Menu>
        </Container>
    </div>

)

export default NavBar