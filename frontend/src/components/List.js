import React from "react"
import { Segment, Button, Header } from "semantic-ui-react"
import { connect } from "react-redux"

const List = (props) => {
    if (props.allUserData === null) {
        return null
    }
    const expenses = props.allUserData.allInfo[0].expenses
    const printExpenses = expenses.map(expense => {
        const allReminders = expense.reminders.map(reminder => {
            return <li>{reminder}</li>
        })
        
        return <Segment>
            
            <Button.Group floated="right">
                <Button as='a'>Remove</Button>
                <Button as="a">Edit</Button>
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
        allUserData: state.userData
    }
}

export default connect(mapDispatchToProps, null)(List)