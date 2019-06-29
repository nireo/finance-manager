import React from "react"
import { Container, Header } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import ExpenseForm from "./ExpenseForm"

const Expenses = (props) => {
    console.log(props.user)

    if (props.user === null) {
        // this is to fix the error if the user hasn't logged in but on this page
        return null
    }
    return (
        <Container text>
            <Header as="h1">Welcome {props.user.userJSON.name}</Header>
            <p>On this page you can see and edit your expenses. More configuration for this page can be found in the settings tab (navigation bar) or directly <Link to="/settings">here</Link>.</p>
            <Header as="h2">Create new expense</Header>
            <ExpenseForm />
        </Container>

    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Expenses)