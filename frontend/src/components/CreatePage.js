import React from 'react';
import ExpenseForm from './ExpenseForm';
import { Header } from 'semantic-ui-react';
import Chart from './Chart';

const CreatePage = props => {
  return (
    <div>
      <Header as="h2">Create new expense</Header>
      <ExpenseForm
        title={props.title}
        setTitle={props.setTitle}
        value={props.value}
        setValue={props.setValue}
        color={props.color}
        setColor={props.setColor}
        addExpense={props.addExpense}
      />
      <Header as="h3">Preview of custom color</Header>
      <Chart type="from" color={props.color} />
    </div>
  );
};

export default CreatePage;
