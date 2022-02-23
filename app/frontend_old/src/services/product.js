import api from "./api";

class Product{
    async find(searchTerm){
        const {data} = await api.get('/product?find=' + (searchTerm || ''));
        return data;
    }
    async create(product){
        const {data} = await api.post('/product', product);
        return data;
    }
    async delete(product){
        product.delete_date = new Date()
        const {data} = await api.put('/product', product);
        return data;
    }
}
export default new Product();