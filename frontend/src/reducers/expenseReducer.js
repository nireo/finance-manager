import expenseService from "../services/expenseService"

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return action.data
        case 'NEW_EXPENSE':
            return state.concat(action.data)
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

export default reducer