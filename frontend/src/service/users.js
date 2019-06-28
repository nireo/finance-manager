import axios from 'axios'
const baseUrl = '/users'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = axios.get(baseUrl, token)
}

export default { getAll }