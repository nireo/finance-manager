import React from "react"
import { Form, Header } from "semantic-ui-react"

const ExpenseForm = () => {
    return (
    <Form>
    <Form.Group widths='equal'>
        <Header as="h3">Basic info</Header>
      <Form.Input
        fluid
        label='Title'
        placeholder='title'
      />
      <Form.Input
        fluid
        label='Value'
        placeholder='value'
        type="number"
      />
    </Form.Group>
    <Header as="h3">Choose color for graphs</Header>
    <Form.Group widths="equal">
        <Form.Input 
            fluid
            label="Red"
            placeholder="red"
        />
        <Form.Input 
            fluid
            label="Green"
            placeholder="green"
        />
        <Form.Input 
            fluid
            label="Blue"
            placeholder="blue"
        />
    </Form.Group>
  </Form>)
}

export default ExpenseForm