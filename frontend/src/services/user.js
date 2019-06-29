import axios from 'axios'
const baseUrl = '/users'

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

export default { getAll, setToken }