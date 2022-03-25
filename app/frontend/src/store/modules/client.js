import clientService from "@/services/clientService";

const reuse = {
    prepareContacts(client){
        client.client_contact.forEach((contact, i) => {
            client.client_contact[i].fullName = contact.first_name + ' ' + contact.last_name;
        })
        return client;
    }
}

export default {
    mutations: {
        setClients(state, clients) {
            state.clients = clients;
        },
        addClient(state, client) {
            const found = state.clients.findIndex(x => x.id === client.id);
            if (found !== -1) {
                state.clients[found] = {...client}
            } else {
                state.clients.push({...client})
            }
        },
        setCurrentClient(state, client) {
            state.currentClient = {...client}
        }
    },
    state: {
        clients: [],
        currentClient: null
    },
    actions: {
        async ensureClientAvailability({commit, state}, clientId){
            const client = state.clients.find(x => x.id = clientId);
            if(!client){
                const newClient = await clientService.get(clientId);
                newClient.client_contact = reuse.prepareContacts(newClient);
                commit('addClient', newClient)
                return true;
            }
            return true;
        },
        async storeClient({commit}, client) {
            const method = client.id ? 'update' : 'create';
            try {
                const newOrUpdated = await clientService[method](client);
                commit('addClient', newOrUpdated)
                return true;
            } catch (e) {
                return false;
            }
        },
        async storeClientContact({commit, state},contact){
            // find client
            const client = state.clients.find(x => x.id = contact.client_id);
            // existing or new?
            if(contact.id){
                client.client_contact.push(contact);
            } else {
                client.client_contact = client.client_contact.map(item => {
                    if(item.id === contact.id){
                        return contact;
                    }
                    return item;
                })
            }
            try {
                const newOrUpdated = await clientService.update(client);
                commit('addClient', newOrUpdated)
                return true;
            } catch (e) {
                return false;
            }

        },
        async removeClient({commit, state}, client) {
            await clientService.delete(client.id);
            commit('setClients', state.clients.filter(x => x.id !== client.id))
        },
        async setCurrentClientById({commit}, clientId) {
            try {
                const client = await clientService.get(clientId)

                client.client_contact = reuse.prepareContacts(client);
                commit('setCurrentClient', client)
                commit('addClient', client)
                return true;
            } catch (e) {
                return false;
            }
        },
        async getPaginatedClients({commit}, config = {}) {
            config.limit = config.limit ?? 30;
            config.offset = config.offset ?? 0;
            try {
                const clients = await clientService.getPaginated(config.offset, config.limit);
                clients.forEach(client => {
                    commit('addClient', client)
                })
                return true;
            } catch (e) {
                return false;
            }
        }
    },
    getters: {
        getClientContactsByClientId: state => clientId => {
            return state.clients?.find(x => x.id === clientId)?.client_contact;
        },
        getCurrentClientContacts(state) {
            return state.currentClient?.client_contact || [];
        },
        getClientById : state => clientId => state.clients.find(x => x.id === clientId)
    }
}

export const clientStructure = {
    name: '',
    street_address: '',
    zip_code: '',
    state: '',
    country: '',
    city: '',
    website: '',
    phone: '',
    email: '',
    notes: '',
    client_contact: []
};
export const clientContactStructure = {
    client_id: null,
    gender: null,
    first_name: '',
    initials: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    notes: ''
};