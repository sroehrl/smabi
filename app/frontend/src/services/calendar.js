import api from "./api";

class Calendar{
    async create(event){
        const {data} = await api.post('/calendar', event);
        return data;
    }
    async update(event){
        const {data} = await api.put('/calendar', event)
        return data;
    }
    async getRange(from, to){
        const {data} = await api.get(`/calendar?from=${from}&to=${to}`)
        return data;
    }
}
export default new Calendar();