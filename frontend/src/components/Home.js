import React, { useState } from "react"
import { Header, Container, Segment, Menu } from 'semantic-ui-react'
import Chart from "./Chart"

const Home = () => {
    const [ page, setPage] = useState("Doughnut")

    const toPage = (page) => (event) => {
        event.preventDefault()
        setPage(page)
    }

    const renderExampleGraph = () => {
        if (page === "Doughnut") {
            return (
                <div>
                    <Header as="h4">Doughnut chart</Header>
                    <Chart type="doughnut" />
                </div>
            )
        } else if (page === "Pie") {
            return (
                <div>
                    <Header as="h4">Pie chart</Header>
                    <Chart type="pie" />
                </div>
            )
        } else if (page === "Bar") {
            return (
                <div>
                    <Header as="h4">Bar Chart</Header>
                    <Chart type="bar" />
                </div>
            )
        } 
    } 

    return (
        <div>
            <Container text>
                <Header as='h1'>Finance Manager</Header>
                <p>
                    In this day and age it's more important than ever to keep good care of your finances. You can become a true money saving machine if you just keep good care and manage finances with the right tools.
                </p>
                <p>
                    Do you track your finances? If not look no further we've got you covered, with this great web finance manager. With a simple user interface and informative graphs.
                </p>
                <Header as="h3">Why is keeping good care of finances important?</Header>
                <p>
                    Have you faced problems like: keeping all your finances in a single Excel file, and found it quite troublesome? It's hard to keep track care of your money in a non-user friendly interface like a spreadsheet. Gladly this website provides helpful charts e.g. pie charts, doughnut charts and bar charts.
                </p>
                <Header as="h3">Examples of provided graphs</Header>
                <Segment>
                    <Menu pointing secondary>
                        <Menu.Item name="Doughnut" active={page === "Doughnut"} onClick={toPage("Doughnut")} />
                        <Menu.Item name="Pie" active={page === "Pie"} onClick={toPage("Pie")} />
                        <Menu.Item name="Bar" active={page === "Bar"} onClick={toPage("Bar")} />
                    </Menu>
                    {renderExampleGraph()}
                </Segment>

            </Container>
        </div>
    )
}

export default Home