import { hr } from '@faker-js/faker'
import axios from 'axios'
import { UserSession } from './sessionStore';

const sessionService = new UserSession();
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3023',   
})

axiosInstance.interceptors.request.use(request => {
    if (request.url.search("LoginUser") != -1){
        return request
    }
    var token = sessionStorage.getItem("token").toString()
    var header = `Bearer ${token}`
    request.headers["authorization"] = header
    return request
}, error => {
    Promise.reject(error)
})

axiosInstance.interceptors.response.use(
    (response) => {    
        sessionService.SetAuthHeaders(response);
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log('call the refresh token api here')
            // Handle 401 error, e.g., redirect to login or refresh token
        }
        return Promise.reject(error)
    },
)

export default axiosInstance