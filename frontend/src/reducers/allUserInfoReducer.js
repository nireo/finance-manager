import userService from "../services/user"

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'CLEAR_DATA':
            return null
        case 'SET_DATA':
            return action.data
        default:
            return state
    }
}

export const setData = (user) => {
    return async dispatch => {
        dispatch({
            type: 'SET_DATA'
        })
    }
}

export const clearData = () => {
    return { type: "CLEAR_DATA" }
}

export default reducer