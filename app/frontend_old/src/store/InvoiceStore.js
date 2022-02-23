import {makeAutoObservable} from "mobx";
import dayjs from "dayjs";
import InvoiceService from '../services/invoice'

export default class InvoiceStore{
    constructor() {
        this.currentInvoice = {...invoiceStructure}
        makeAutoObservable(this)
    }
    get = async (id) => {
        this.currentInvoice = await InvoiceService.get(id);
        return this.currentInvoice;
    }
    set(invoice){
        this.currentInvoice = invoice
    }
    updateLineItem(name, val, ind){
        this.currentInvoice.invoice_item[ind][name] = val;
    }
    addLineItem(){
        this.currentInvoice.invoice_item.push({...invoiceItemStructure})
    }
}

export const invoiceStructure = {
    invoice_number:'',
    client_id:'',
    contact_id:null,
    notes:'',
    invoice_date: dayjs().format('YYYY-MM-DD'),
    due_date:null,
    invoice_item: [],
    status: 'draft'
}
export const invoiceItemStructure = {
    product_id:undefined,
    amount:1
}