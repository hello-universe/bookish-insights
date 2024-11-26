import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://bookish-insights.onrender.com'
})

export default instance;