import React, { useState } from "react"
import { Container, Header, Menu, Segment } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import ExpenseForm from "./ExpenseForm"
import Chart from "./Chart"
import InfoCharts from "./InfoCharts"
import List from "./List"

const Expenses = (props) => {
    const [ title, setTitle ] = useState('')
    const [ value, setValue ] = useState('')
    const [ red, setRed ] = useState(0)
    const [ green, setGreen ] = useState(0)
    const [ blue, setBlue ] = useState(0)
    const [ alpha, setAlpha ] = useState(0.1)
    const [ page, setPage ] = useState("List")

    const toPage = (page) => (event) => {
        event.preventDefault()
        setPage(page)
    }

    const renderPageContent = () => {
        if (page === "List") {
            return <List />
        } else if (page === 'Charts') {
            return <InfoCharts />
        } else if (page === 'Create') {
            return <CreateNew />
        }
    }

    // component for create new tab
    const CreateNew = () => {
        return (
            <div>
                <Header as="h2">Create new expense</Header>
                <ExpenseForm 
                    title={ title } setTitle={ setTitle }
                    value={ value } setValue={ setValue } 
                    red={ red } setRed={ setRed }
                    blue={ blue } setBlue={ setBlue }
                    green={ green } setGreen={ setGreen }
                    aplha={ alpha } setAlpha= { setAlpha }
                    addExpense={ addExpense }
                />
                <Header as="h3">Preview of custom color</Header>
                <Chart type="form" alpha={alpha} red={red} green={green} blue={blue} />
            </div>
        )
    }

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
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Expenses)