import React, { useState } from "react"
import { Container, Header } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import ExpenseForm from "./ExpenseForm"
import Chart from "./Chart"

const Expenses = (props) => {
    const [ red, setRed ] = useState(0)
    const [ green, setGreen ] = useState(0)
    const [ blue, setBlue ] = useState(0)
    const [ alpha, setAlpha ] = useState(0) 

    const addExpense = () => {

    }

    if (props.user === null) {
        // this is to fix the error if the user hasn't logged in but on this page
        return null
    }
    return (
        <Container text>
            <Header as="h1">Welcome {props.user.userJSON.name}</Header>
            <p>On this page you can see and edit your expenses. More configuration for this page can be found in the settings tab (navigation bar) or directly <Link to="/settings">here</Link>.</p>
            <Header as="h2">Create new expense</Header>
            <ExpenseForm 
                red={ red } setRed={ setRed }
                blue={ blue } setBlue={ setBlue }
                green={ green } setGreen={ setGreen }
                aplha={ alpha } setAlpha= { setAlpha }
                addExpense={ addExpense }
            />
            <Chart type="form" alpha={alpha} red={red} green={green} blue={blue} />
        </Container>

    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Expenses)