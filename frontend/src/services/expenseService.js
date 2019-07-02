import axios from "axios"
const baseUrl = "/api/expenses"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(baseUrl, config)
    return response.data
}

const deleteExpense = async id => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const createExpense = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(`${baseUrl}`, newObject, config)
    return response.data
}

export default { setToken, getAll, deleteExpense, createExpense }