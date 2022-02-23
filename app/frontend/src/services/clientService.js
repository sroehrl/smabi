import api from "./api";

class Client{
    async create(info) {
        const {data} =  await api.post('/client', {...info})
        return data;
    }
    async find(keyword) {
        const {data} = await api.get('/client?search='+ encodeURI(keyword))
        return data;
    }
    async getPaginated(offset=0, limit=30){
        const {data} = await api.get('/client?offset='+ offset+'&limit='+limit);
        return data;
    }
    async get(id) {
        const {data} = await api.get('/client/'+id);
        return data;
    }
    async update(info) {
        const {data} =  await api.put('/client', {...info})
        return data;
    }
    async delete(id) {
        const {data} =  await api.delete('/client/'+id)
        return data;
    }

}
export default new Client();