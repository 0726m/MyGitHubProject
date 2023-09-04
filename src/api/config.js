import axios from 'axios'

// 创建axios实例
const Service = axios.create({
    // 设置baseURL地址
    baseURL:'/api',
    // 定义统一请求头
    headers:{
        'Content-Type':"application/json;charset=UTF-8"
    },
    // 配置请求超时时间
    time:10000
})

// 请求拦截器
Service.interceptors.request.use((config) =>{
    // 配置请求头
    let token = window.localStorage.getItem('token');
    config.headers.Authorization = token
    return config
})

// 响应拦截器
Service.interceptors.response.use(
    (response) =>{
    // 获取接口返回结果
    return response.data
    },
    // 响应失败的回调函数
    (error) =>{
        return Promise.reject(new Error('faile'))
    }
)

export default Service