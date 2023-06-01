import axios from 'axios'

// 登录
export function login(username, password) {
    return axios.post('/api/login', {username, password})
        .then(res => {
            const token = res.data.token
            localStorage.setItem('token', token)
            return res.data.user
        })
}

// 退出登录
export function logout() {
    localStorage.removeItem('token')
    return Promise.resolve()
}

// 获取当前用户
export function getCurrentUser() {
    const token = localStorage.getItem('token')
    if (!token) {
        return Promise.reject(new Error('no token'))
    }
    return axios.get('/api/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.data.user)
}

// 判断用户是否已登录
export function isLoggedIn() {
    return !!localStorage.getItem('token')
}


// 设置 token 的方法
export function setToken(token) {
    localStorage.setItem('token', token)
}

// 获取 token 的方法
export function getToken() {
    return localStorage.getItem('token')
}

// 清除 token 的方法
export function clearToken() {
    localStorage.removeItem('token')
}
