import axios from "axios"
import router from "./router";
const api = axios.create();
api.interceptors.request.use(config => {
    let access_token = localStorage.getItem('access_token') || null
    if (access_token) {
        config.headers.authorization = `Bearer ${access_token}`
    }
    return config
}, error => {
    console.log('error', error)
})
api.interceptors.response.use(config => {
    let access_token = localStorage.getItem('access_token') || null
    if (access_token) {
        config.headers.authorization = `Bearer ${access_token}`
        }
    return config
}, error => {
    if(error.response.status === 401) {
        if(error.response.data.message === 'Token has expired') {
            return axios.post('api/auth/refresh',{},{
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then(result => {
                if(result.data.access_token) {
                    localStorage.setItem('access_token',result.data.access_token)
                    error.config.headers.authorization = `Bearer ${result.data.access_token}`
                    return api.request(error.config)
                }

            })
        } else {
            router.push({name: 'user.login'})
        }
        console.log(error.response.data.message)
        //router.push({name: 'user.login'})
    }
    console.log('ERROR:', error)
})

 export default api
