import React, { useState } from "react"
import { Segment, Button, Header, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { deleteExpense, setExpenses } from "../reducers/expenseReducer"

const List = (props) => {
    const [ showEdit, setShowEdit ] = useState(false)
    if (props.allUserData === null) {
        return null
    }

    const expenses = props.expenses
    const handleRemove = async expense => {
        if (window.confirm(`remove expense ${expense.title}`)) {
            props.deleteExpense(expense._id)
            props.setExpenses()
        }
    }
    const printExpenses = expenses.map(expense => {
        const allReminders = expense.reminders.map(reminder => {
            return <li>{reminder}</li>
        })
        return <Segment>
            <Button.Group floated="right">
                <Button as='a' onClick={() => handleRemove(expense)} >Remove</Button>
                <Button as="a" onClick={() => setShowEdit(!showEdit)}>Edit</Button>
            </Button.Group>
            {expense.title} | {expense.value} € 
            {(expense.reminders.length > 0 && 
            <ul>
                {allReminders}
            </ul>)}
            <p><strong>Created: {expense.time}</strong></p>
        </Segment>    
    })
    return (
        <div>
            <Header as="h2">List of expenses</Header>
            {printExpenses}
        </div>

    )
}

const mapDispatchToProps = (state) => {
    return {
        allUserData: state.userDatam,
        expenses: state.expenses
    }
}

export default connect(mapDispatchToProps, { deleteExpense, setExpenses })(List)