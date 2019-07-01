// this reducer acidentally turned mostly for expenses, but I don't want to
// go through the hassle of renaming everything
import userService from "../services/user"

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'CLEAR_DATA':
            return null
        case 'SET_DATA':
            return action.data
        case 'NEW_EXPENSE':
            return [...state.allInfo.expenses, action.data]
        default:
            return state
    }
}

export const setData = () => {
    return async dispatch => {
        // await for the information about the user | used for expenses
        const allInfo = await userService.getAll()
        console.log(allInfo)
        // make the dispatch call
        dispatch({
            type: 'SET_DATA',
            data: { allInfo }
        })
    }
}

export const newExpense = newObject => {
    return async dispatch => {
        const newExpense = await userService.createExpense(newObject)
        dispatch({
            type: 'NEW_EXPENSE',
            data: { newExpense }
        })
    }
}

// clear the data on logOut
export const clearData = () => {
    return { type: "CLEAR_DATA" }
}

export default reducer