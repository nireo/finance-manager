import React from "react"
import { Form, Header, Button } from "semantic-ui-react"

const ExpenseForm = (props) => {
    return (
    <Form onSubmit={props.addExpense}>
        <Header as="h3">Basic info</Header>
    <Form.Group widths='equal'>
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
			value={props.red}
			min="0"
			max="255"
			type="number"
			onChange={({ target }) => props.setRed(target.value)}
        />
        <Form.Input 
            fluid
            label="Green"
			value={props.green}
			min="0"
			max="255"
			type="number"
			onChange={({ target }) => props.setGreen(target.value)}
        />
        <Form.Input
            fluid
            label="Blue"
			value={props.blue}
			min="0"
			max="255"
			type="number"
			onChange={({ target }) => props.setBlue(target.value)}
        />
		<Form.Input 
			fluid
			label="Aplha"
			value={props.alpha}
			min="0"
			step="0.1"
			max="1"
			type="number"
			onChange={({ target }) => props.setAlpha(target.value)}
		/>
    </Form.Group>
	<Button type="submit">Add expense</Button>
  </Form>)
}

export default ExpenseForm