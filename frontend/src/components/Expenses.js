import React, { useState, useEffect } from 'react';
import { Container, Header, Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Notification from './Notification';
import { newExpense, setExpenses } from '../reducers/expenseReducer';
import Loading from './Loading';
import ListExpenses from './ListExpenses';
import CreatePage from './CreatePage';
import ChartPage from './ChartPage';

const Expenses = props => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [color, setColor] = useState('#ff0000');
  const [page, setPage] = useState('List');
  const [message, setMessage] = useState(null);
  const [allLabels, setAllLabels] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [allValues, setAllValues] = useState([]);

  useEffect(() => {
    if (props.user !== null) {
      if (allLabels === [] && allColors === [] && allValues === []) {
        setAllColors(props.user.expenses.map(expense => expense.color));
        setAllLabels(props.user.expenses.map(expense => expense.title));
        setAllValues(props.user.expenses.map(expense => expense.value));
      }
    }
  }, [props, allColors, allValues, allLabels]);

  if (props.user === null) {
    return <Loading />;
  }
  const data = {
    labels: allLabels,
    datasets: [
      {
        label: 'Expenses in €',
        data: allValues,
        backgroundColor: allColors
      }
    ]
  };

  const toPage = page => event => {
    event.preventDefault();
    setPage(page);
  };

  const clearFields = () => {
    setTitle('');
    setValue('');
    setColor('#ff0000');
  };

  const addExpense = () => {
    const newObject = {
      title: title,
      value: value,
      profit: false,
      color: `${color}`
    };
    setMessage('The new expense can be found in the expense tab');
    props.newExpense(newObject);
    props.setExpenses();
    clearFields();
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const renderPages = () => {
    switch (page) {
      case 'List':
        return <ListExpenses />;
      case 'Charts':
        return <ChartPage data={data} />;
      case 'Create':
        return (
          <CreatePage
            title={title}
            setTitle={setTitle}
            value={value}
            setValue={setValue}
            color={color}
            setColor={setColor}
            addExpense={addExpense}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container text>
      <Notification
        header="New expense has been added"
        type="success"
        message={message}
      />
      <Header as="h1">Welcome {props.user.name} to the expenses page</Header>
      <p>
        On this page you can see and edit Your expenses. More configuration for
        this page can be found in the settings tab (navigation bar) or directly{' '}
        <Link to="/settings">here</Link>.
      </p>
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="List"
            active={page === 'List'}
            onClick={toPage('List')}
          />
          <Menu.Item
            name="Charts"
            active={page === 'Charts'}
            onClick={toPage('Charts')}
          />
          <Menu.Item
            name="Create"
            active={page === 'Create'}
            onClick={toPage('Create')}
          />
        </Menu>
      </div>
      <Segment>{}</Segment>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    allUserData: state.userData,
    expenses: state.expenses
  };
};

export default connect(
  mapStateToProps,
  { setExpenses, newExpense }
)(Expenses);
