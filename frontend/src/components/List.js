import React from 'react';
import { Segment, Button, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteExpense, setExpenses } from '../reducers/expenseReducer';

const List = props => {
  if (props.allUserData === null) {
    return null;
  }

  const expenses = props.expenses;
  const handleRemove = async expense => {
    if (window.confirm(`remove expense ${expense.title}`)) {
      props.deleteExpense(expense._id);
      props.setExpenses();
    }
  };
  const printExpenses = expenses.map(expense => (
    <Segment key={expense._id} style={{ borderRadius: '0%' }}>
      <Button floated="right" as="a" onClick={() => handleRemove(expense)}>
        Remove
      </Button>
      {expense.title} | {expense.value} €
      <p>
        <strong>Created: {expense.time}</strong>
      </p>
    </Segment>
  ));
  return (
    <div>
      <Header as="h2">List of expenses</Header>
      {expenses.length > 0 ? { printExpenses } : <p>You need to add data</p>}
    </div>
  );
};

const mapDispatchToProps = state => {
  return {
    allUserData: state.userDatam,
    expenses: state.expenses
  };
};

export default connect(
  mapDispatchToProps,
  { deleteExpense, setExpenses }
)(List);
