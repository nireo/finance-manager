import React from "react"
import { Menu, Container } from "semantic-ui-react"
import { Link } from "react-router-dom"

const NavBar = () => (
    <div>
        <Container>
        <Menu fixed="top" >
            <Container>
                <Menu.Item as='a' header>
                    Finance Manager
                </Menu.Item>
                <Menu.Item link>
                    <Link to="/">home</Link>
                </Menu.Item>
                <Menu.Item link>
                    <Link to="/login">login</Link>
                </Menu.Item>
            </Container>
        </Menu>
        </Container>
    </div>

)

export default NavBar