import axios from 'axios'
import {ElMessage} from 'element-plus'

// 创建 axios 实例
const service = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // api 的 base_url
    timeout: 5000 // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        return config
    },
    error => {
        // 处理请求错误
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做些什么
        const res = response.data
        if (res.code !== 20000) {
            ElMessage.error(res.message || '接口异常')
            return Promise.reject(new Error(res.message || '接口异常'))
        } else {
            return res
        }
    },
    error => {
        // 处理响应错误
        console.log('err' + error) // for debug
        ElMessage.error(error.message)
        return Promise.reject(error)
    }
)

export default service
