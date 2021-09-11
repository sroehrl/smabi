import axios from "axios";
const api = axios.create({
    timeout: 4000,
    headers:{},
    baseURL: 'http://localhost:8090/api.v1'
})
export default api;