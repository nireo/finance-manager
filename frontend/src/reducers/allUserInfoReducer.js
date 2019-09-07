import userService from '../services/user';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CLEAR_DATA':
      return null;
    case 'SET_DATA':
      return action.data;
    default:
      return state;
  }
};

export const setData = () => {
  return async dispatch => {
    // await for the information about the user | used for expenses
    const allInfo = await userService.getAll();
    // make the dispatch call
    dispatch({
      type: 'SET_DATA',
      data: { allInfo }
    });
  };
};

// clear the data on logOut
export const clearData = () => {
  return { type: 'CLEAR_DATA' };
};

export default reducer;
