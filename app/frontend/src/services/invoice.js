const api = require("./api");

class Invoice{
    async get(id){
        const {data} = await api.get('/invoice/'+id)
        return data;
    }
}
export default new Invoice();

