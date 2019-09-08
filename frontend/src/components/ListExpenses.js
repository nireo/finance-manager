import React from 'react';
import { connect } from 'react-redux';

const ListExpenses = props => {
  return <div>this is the list component</div>;
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(ListExpenses);
