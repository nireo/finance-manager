import React from 'react';
import { Menu, Container, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../reducers/userReducer';

const NavBar = props => {
  return (
    <Container>
      <Menu fixed="top">
        <Container>
          <Menu.Item as="a" header>
            <Link style={{ color: 'black' }} to="/">
              <Icon name="pie chart" />
              Finance Manager
            </Link>
          </Menu.Item>
          {!props.user && (
            <Menu.Item link>
              <Link to="/login">login</Link>
            </Menu.Item>
          )}
          {props.user && (
            <Menu.Menu position="right">
              <Menu.Item as="a">
                <Link style={{ color: 'black' }} to="/expenses">
                  Expenses
                </Link>
              </Menu.Item>
              <Menu.Item as="a">
                <Link style={{ color: 'black' }} to="/settings">
                  Settings
                </Link>
              </Menu.Item>
              <Menu.Item as="a" onClick={() => props.logOut()}>
                Sign out
              </Menu.Item>
            </Menu.Menu>
          )}
        </Container>
      </Menu>
    </Container>
  );
};

const mapDispatchToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapDispatchToProps,
  { logOut }
)(NavBar);
