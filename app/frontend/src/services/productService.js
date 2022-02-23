import api from "./api";

class Product{
    async create(info) {
        const {data} =  await api.post('/product', {...info})
        return data;
    }
    async find(keyword) {
        const {data} = await api.get('/product?search='+ encodeURI(keyword))
        return data;
    }
    async getPaginated(offset=0, limit=30){
        const {data} = await api.get('/product?offset='+ offset+'&limit='+limit);
        return data;
    }
    async get(id) {
        const {data} = await api.get('/product/'+id);
        return data;
    }
    async update(info) {
        const {data} =  await api.put('/product', {...info})
        return data;
    }
    async delete(id) {
        const {data} =  await api.delete('/product/'+id)
        return data;
    }

}
export default new Product();