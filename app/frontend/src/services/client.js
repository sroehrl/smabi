import api from "./api";

class Client {
    async create(info) {
        const {data} =  await api.post('/client', {...info})
        return data;
    }
    async find(keyword) {
        const {data} = await api.get('/client?search='+ encodeURI(keyword))
        return data;
    }
    async update(info) {
        const {data} =  await api.put('/client', {...info})
        return data;
    }
}

export default new Client();