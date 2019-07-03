import expenseService from "../services/expenseService"
import { SSL_OP_TLS_BLOCK_PADDING_BUG } from "constants";

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return action.data
        case 'NEW_EXPENSE':
            return [...state, action.data]
        case 'REMOVE_BLOG':
            return state.filter(e => e._id !== action.id)
        default:
            return state
    }
}

export const setExpenses = () => {
    return async dispatch => {
        const expenses = await expenseService.getAll()
        dispatch({
            type: 'SET_EXPENSES',
            data: expenses
        })
    }
}

export const newExpense = newObject => {
    return async dispatch => {
        const newExpense = await expenseService.createExpense(newObject)
        dispatch({
            type: 'NEW_EXPENSE',
            data: newExpense
        })
    }
}

export const deleteExpense = id => {
    return async dispatch => {
        await expenseService.deleteExpense(id)
        dispatch({
            type: 'REMOVE_BLOG',
            id: id
        })
    }
}

export default reducer