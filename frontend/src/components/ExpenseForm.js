import React from 'react';
import { Form, Header, Button } from 'semantic-ui-react';

const ExpenseForm = props => {
  return (
    <Form onSubmit={props.addExpense}>
      <Header as="h3">Basic info</Header>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          icon="text cursor"
          iconPosition="left"
          label="Title"
          placeholder="title"
          value={props.title}
          onChange={({ target }) => props.setTitle(target.value)}
        />
        <Form.Input
          fluid
          icon="dollar"
          iconPosition="left"
          label="Value"
          placeholder="value"
          value={props.value}
          onChange={({ target }) => props.setValue(target.value)}
          type="number"
        />
      </Form.Group>
      <Header as="h3">Choose color for graphs</Header>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          value={props.color}
          type="color"
          onChange={({ target }) => props.setColor(target.value)}
        />
      </Form.Group>
      <Button fluid type="submit">
        Add expense
      </Button>
    </Form>
  );
};

export default ExpenseForm;
