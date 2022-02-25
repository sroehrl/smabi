import api from './api';

class SettingsService {
    async find(keyword) {
        const {data} = await api.get('/settings/'+ keyword)
        return data;
    }
    async update(info) {
        const {data} =  await api.put('/settings', {...info})
        return data;
    }
    async create(info) {
        const {data} =  await api.post('/settings', {...info})
        return data;
    }
}

export default new SettingsService();