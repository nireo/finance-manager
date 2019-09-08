import loginService from '../services/login';
import userService from '../services/user';
import expenseService from '../services/expenseService';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return null;
    case 'LOG_IN':
      return action.data;
    default:
      return state;
  }
};

export const alreadyLogged = () => {
  return async dispatch => {
    const userString = localStorage.getItem('loggedUser');
    if (userString) {
      const userJSON = JSON.parse(userString);
      userService.setToken(userJSON.token);
      expenseService.setToken(userJSON.token);
      dispatch({
        type: 'LOG_IN',
        data: userJSON.user
      });
    }
  };
};

export const logIn = credentials => {
  return async dispatch => {
    // make the post request to login
    const userInfo = await loginService.login(credentials);
    // if the credentials are incorrect
    if (userInfo === 'invalid username or password') {
      return null;
    }
    window.localStorage.setItem('loggedUser', JSON.stringify(userInfo));
    userService.setToken(userInfo.token);
    expenseService.setToken(userInfo.token);

    dispatch({
      type: 'LOG_IN',
      data: userInfo.user
    });
  };
};

export const logOut = () => {
  // clear localStorage
  window.localStorage.clear();
  // send the action
  return { type: 'LOG_OUT' };
};

export default reducer;
