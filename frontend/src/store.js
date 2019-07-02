import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import userReducer from "./reducers/userReducer"
import allUserInfoReducer from "./reducers/allUserInfoReducer"
import expenseReducer from "./reducers/expenseReducer"

const reducer = combineReducers({
    user: userReducer,
    userData: allUserInfoReducer,
    expenses: expenseReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store