import login from './request'

const loginApi = data =>{
    return login.post({
        url:'/login',
        data
    })
}

const registerApi = data =>{
    return login.post({
        url:'/register',
        data
    })
}

const logoutApi = data =>{
    return login.post({
        url:'/logout',
        data
    })
}

export default {
    loginApi,
    registerApi,
    logoutApi
}