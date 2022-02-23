import api from './api';

class Invoice{
    async get(id){
        const {data} = await api.get('/invoicing/'+id)
        return data;
    }
    async create(obj){
        const {data} = await api.post('/invoicing', obj)
        return data;
    }
    async update(obj){

        const {data} = await api.put('/invoicing', obj)
        return data;
    }
}
export default new Invoice();

