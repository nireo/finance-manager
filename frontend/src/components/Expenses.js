import React, { useState } from "react"
import { Container, Header, Menu, Segment } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import ExpenseForm from "./ExpenseForm"
import Chart from "./Chart"
import List from "./List"
import Notification from "./Notification"
import expenseService from "../services/expenseService"
import { newExpense, setExpenses } from "../reducers/expenseReducer"

const Expenses = (props) => {
    const [ title, setTitle ] = useState('')
    const [ value, setValue ] = useState('')
    const [ color, setColor ] = useState('#ff0000')
    const [ page, setPage ] = useState("List")
    const [ graphPage, setGraphPage ] = useState("Doughnut")
    const [ message, setMessage ] = useState(null)

    // check if expenses are there and if not don't render the component
    if (props.expenses === null) {
        return null
    } 

    // prevent strain :)
    const expenses = props.expenses
    // these are for the data distrubuted to the graph vie
    const allLabels = expenses.map(expense => expense.title)
    const allValues = expenses.map(expense => expense.value)    
    const allColors = expenses.map(expense => expense.color)

    // the data template that chart.js uses
    const data = {
        labels: allLabels,
        datasets: [
            {
                label: "Expenses in €",
                data: allValues,
                backgroundColor: allColors
            }
        ]
    }

    // settings the main page List, Chart and Create
    const toPage = (page) => (event) => {
        event.preventDefault()
        setPage(page)
    }

    // same as above but its for the chart view
    const toGraphPage = (page) => (event) => {
        event.preventDefault()
        setGraphPage(page)
    }

    // depending on what the page selected is display the correct content
    const renderPageContent = () => {
        if (page === "List") {
            return <List removeExpense={removeExpense} />
        } else if (page === 'Charts') {
            return (
                <div>
                    <Header as="h2">Expenses graph view</Header>
                    <Menu pointing secondary>
                        <Menu.Item name="Doughnut" active={graphPage === "Doughnut"} onClick={toGraphPage("Doughnut")} />
                        <Menu.Item name="Pie" active={graphPage === "Pie"} onClick={toGraphPage("Pie")} />
                        <Menu.Item name="Bar" active={graphPage === "Bar"} onClick={toGraphPage("Bar")} />
                    </Menu>
                    {renderChartContent()}
                </div>
            )
        } else if (page === 'Create') {
            return (<div>
                <Header as="h2">Create new expense</Header>
                <ExpenseForm 
                    title={ title } setTitle={ setTitle } value={ value } setValue={ setValue } 
                    color={color} setColor={setColor} addExpense={ addExpense }
                />
                <Header as="h3">Preview of custom color</Header>
                <Chart type="form" color={color} />
            </div>)
        }
    }

    const renderChartContent = () => {
        if (graphPage === "Doughnut") {
            return <Chart type="main-doughnut" data={data} /> 
        } else if (graphPage === "Pie") {
            return <Chart type="main-pie" data={data} />
        } else if (graphPage === "Bar") {
            return <Chart type="main-bar" data={data} />
        }
    }

    const addExpense = () => {
        // but all values into an object so that sending it is a lot easier
        const newObject = {
            title: title,
            value: value,
            profit: false,
            color: `${color}`
        }
        // make the call to the backend
        setMessage("The new expense can be found in the expense tab")
        props.newExpense(newObject)
        props.setExpenses()
        // called a setTimeout since i want to show notification just for 3 seconds
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    const removeExpense = async id => {
        const toBeRemovedExpense = await expenses.find(expense => expense._id)
        // ask confirmation since i don't want any accidents to occur
        if (window.confirm(`are you sure you want to remove ${toBeRemovedExpense.title}`)) {
            await expenseService.deleteExpense(toBeRemovedExpense._id)
            props.Expenses()
        }
    }

    if (props.user === null) {
        // this is to fix the error if the user hasn't logged in but on this page
        return null
    }

    return (
        <Container text>
            <Notification type="success" message={message} />
            <Header as="h1">Welcome {props.user.userJSON.name} to the expenses page</Header>
            <p>On this page you can see and edit your expenses. More configuration for this page can be found in the settings tab (navigation bar) or directly <Link to="/settings">here</Link>.</p>
            <div>
                <Menu pointing secondary>
                    <Menu.Item name="List" active={page === "List"} onClick={toPage("List")} />
                    <Menu.Item name="Charts" active={page === "Charts"} onClick={toPage("Charts")} />
                    <Menu.Item name="Create" active={page === "Create"} onClick={toPage("Create")} />
                </Menu>
            </div>
            <Segment>
                {renderPageContent()}
            </Segment>
        </Container>

    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        allUserData: state.userData,
        expenses: state.expenses
    }
}

export default connect(mapStateToProps, { setExpenses, newExpense })(Expenses)