import axios from 'axios'
import request from '../utils/request'

export function register(data) {
    return request({
        url: '/api/register/',
        method: 'post',
        data
    })
}


export function login(username, password) {
    return axios.post('/api/login', { username, password })
        .then(res => res.data)
}
