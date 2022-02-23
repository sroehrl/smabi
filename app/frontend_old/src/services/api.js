import axios from "axios";
const api = axios.create({
    timeout: 4000,
    headers:{},
    baseURL: process.env.REACT_APP_APIURL
})
api.interceptors.request.use(config => {
    if(sessionStorage.token){
        config.headers.Authorization = `baerer ${sessionStorage.token}`
    }
    return config;
})
export default api;