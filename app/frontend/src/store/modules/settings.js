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
        },
        async storeInvoicingSettings({commit}, settings){
            const method = settings.id ? 'update' : 'create';
            try {
                const newOrUpdated = await settingsService[method](settings);
                commit('setInvoicing', newOrUpdated)
                return true;
            } catch (e) {
                return false;
            }
        }
    },
    getters: {
        getInvoicingSuggestion:(state) => (status) => {
            const parsed = state.invoicing?.object.format
                .replace(/{{status}}/,`[${capitalizeFirst(status)}]`)
                .replace(/{{running}}/,`[${lPad(state.invoicing.object.runners[status])}]`)
            return dayjs().format(parsed)
        },
        formatCurrency: state => num => {

            if(state.invoicing && state.invoicing.object.currency_locale && state.invoicing.object.currency_locale.length === 5 && state.invoicing.object.currency && state.invoicing.object.currency.length ===3){
                return new Intl.NumberFormat(state.invoicing.object.currency_locale,{style: 'currency', currency: state.invoicing.object.currency}).format(num)
            }
            return num;
        }
    }
}