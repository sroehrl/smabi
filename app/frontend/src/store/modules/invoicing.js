import invoiceService from "@/services/invoiceService";
export default {
    state:{
        invoices:[],
        currentInvoice:null
    },
    mutations:{
        setInvoices(state, invoices) {
            state.invoices = invoices;
        },
        addInvoice(state, invoice) {
            const found = state.invoices.findIndex(x => x.id === invoice.id);
            if (found !== -1) {
                state.invoices[found] = {...invoice}
            } else {
                state.invoices.push({...invoice})
            }
        },
        setCurrentInvoice(state, invoice) {
            state.currentInvoice = {...invoice}
        }
    },
    actions:{
        async storeInvoice({commit}, invoice) {
            const method = invoice.id ? 'update' : 'create';
            try {
                const newOrUpdated = await invoiceService[method](invoice);
                commit('addInvoice', newOrUpdated)
                return true;
            } catch (e) {
                return false;
            }
        },

        async removeInvoice({commit, state}, client) {
            await invoiceService.delete(client.id);
            commit('setInvoices', state.clients.filter(x => x.id !== client.id))
        },
        async setCurrentInvoiceById({commit}, clientId) {
            try {
                const invoice = await invoiceService.get(clientId)
                commit('setCurrentInvoice', invoice)
                commit('addInvoice', invoice)
                return true;
            } catch (e) {
                return false;
            }
        },
        async getPaginatedInvoices({commit}, config = {}) {
            config.limit = config.limit ?? 30;
            config.offset = config.offset ?? 0;
            try {
                const invoices = await invoiceService.getPaginated(config.offset, config.limit);
                invoices.forEach(invoice => {
                    commit('addInvoice', invoice)
                })
                return true;
            } catch (e) {
                return false;
            }
        }
    }
}