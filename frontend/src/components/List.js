import React from "react"
import { Segment } from "semantic-ui-react"
import { connect } from "react-redux"

const List = (props) => {
    if (props.allUserData === null) {
        return null
    }
    const expenses = props.allUserData.allInfo[0].expenses
    console.log(expenses)
    const printExpenses = expenses.map(expense => {
        const allReminders = expense.reminders.map(reminder => {
            return <li>{reminder}</li>
        })
        
        return <Segment>
        {expense.title} | {expense.value}€ 
            {(expense.reminders.length > 0 && 
            <ul>
                {allReminders}
            </ul>)}
            <p>Created: {expense.time}</p>
        </Segment>    
    })
    return (
        <div>
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