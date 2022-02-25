import api from './api';

class InvoiceService {
    async create(info) {
        const {data} =  await api.post('/invoicing', {...info})
        return data;
    }
    async find(keyword) {
        const {data} = await api.get('/invoicing?search='+ encodeURI(keyword))
        return data;
    }
    async getPaginated(offset=0, limit=30){
        const {data} = await api.get('/invoicing?offset='+ offset+'&limit='+limit);
        return data;
    }
    async get(id) {
        const {data} = await api.get('/invoicing/'+id);
        return data;
    }
    async update(info) {
        const {data} =  await api.put('/invoicing', {...info})
        return data;
    }
    async delete(id) {
        const {data} =  await api.delete('/invoicing/'+id)
        return data;
    }

}
export default new InvoiceService();