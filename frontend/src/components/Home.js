import React from "react"
import { Header, Container } from 'semantic-ui-react'
import Chart from "./Chart"

const Home = () => (
    <Container>
        <Container text>
            <Header as='h1'>Finance Manager</Header>
            <p>In this day and age it's more important than ever to keep good care of your finances. You can become a true money saving machine if you just keep good care and manage finances with the right tools.</p>
            <p>
                Do you track your finances? If not look no further we've got you covered, with this great web finance manager. With a simple user interface and informative graphs.
            </p>
            <Header as="h3">Why is keeping good care of finances important?</Header>
            <p>
                Have you faced problems like: keeping all your finances in a single Excel file, and found it quite troublesome? It's hard to keep track care of your money in a non-user friendly interface like a spreadsheet. Gladly this website provides helpful charts e.g. pie charts, doughnut charts and bar charts.
            </p>
            <Header as="h3">Examples of provided graphs</Header>
            <Header as="h4">Doughnut chart</Header>
            <Chart type="doughnut" />
            <Header as="h4">Pie chart</Header>
            <Chart type="pie" />
            <Header as="h4">Bar Chart</Header>
            <Chart type="bar" />
        </Container>
    </Container>
    
)

export default Home