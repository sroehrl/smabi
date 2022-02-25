import settingsService from "@/services/settingsService";
import dayjs from "dayjs";

const lPad = (number) => {
    return ('00000' + number.toString()).slice(-5);
}

const capitalizeFirst = name => name.charAt(0).toUpperCase() + name.slice(1)

export default {
    state:{
        invoicing:null,
        integrations: null,
        payment: null,
        emailing: null
    },
    mutations:{
        setInvoicing(state, invoicingSettings){
            state.invoicing = invoicingSettings;
        }
    },
    actions: {
        async getInvoicingSettings({commit}){
            commit('setInvoicing', await settingsService.find('invoicing'))
        }
    },
    getters: {
        getInvoicingSuggestion:(state) => (status) => {
            const parsed = state.invoicing?.object.format
                .replace(/{{status}}/,`[${capitalizeFirst(status)}]`)
                .replace(/{{running}}/,`[${lPad(state.invoicing.object.runners[status])}]`)
            return dayjs().format(parsed)
        }
    }
}