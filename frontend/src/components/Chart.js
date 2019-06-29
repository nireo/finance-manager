import React from "react"
import { Doughnut, Pie, Bar } from "react-chartjs-2"

const Chart = (props) => {
    // example data set for front page
    const exampleChartData = {
        labels: ['Rent', 'Insurance', 'Loans', 'Food', 'Shopping'],
        datasets: [
            {
                label: 'Amount in euro',
                data: [
                    700,
                    500,
                    900,
                    250,
                    300
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ]
            }
        ]
    }
    

    let colorPreviewData = {
        labels: ['Custom', 'Black'],
        datasets: [
            {
                label:"Color showcase",
                data: [
                    500,
                    500
                ],
                backgroundColor: [
                    `rgba(${props.red}, ${props.green}, ${props.blue}, ${props.alpha})`,
                    'rgba(0, 0, 0, 0.5)'
                ]
            }
        ]
    }

    if (props.type=== "form") {
        return (
        <div>
            <Doughnut
                data={colorPreviewData}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>)
    }

    if (props.type === 'doughnut') {
        return (
            <div>
                <Doughnut
                    data={exampleChartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
    
            </div>
        )
    }
    if (props.type === 'pie') {
        return (
            <div>
                <Pie
                    data={exampleChartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
    
            </div>
        )
    }
    if (props.type === 'bar') {
        return (
            <div>
                <Bar
                    data={exampleChartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
    
            </div>
        )
    }

}

export default Chart