import axios from 'axios'
const baseUrl = '/api/users'

let token = null

// turn the token into the bearer format which the backend accepts
const setToken = newToken => {
    token = `bearer ${newToken}`
}

// get the specific info from an user
const getAll = async () => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(baseUrl, config)
    return response.data
}

const signUp = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { getAll, setToken, signUp }