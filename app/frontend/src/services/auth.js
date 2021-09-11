import api from "./api";

class Auth{
    async login(credentials){
        const {data} =  await api.post('/auth', {...credentials})
        return data;
    }
    async getUser(){
        const {data} =  await api.get('/auth')
        return data;
    }
    async register(credentials){
        const {data} =  await api.post('/auth/register', {...credentials})
        return data;
    }
}
export default new Auth();