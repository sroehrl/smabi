import {makeAutoObservable} from "mobx";

export default class InvoiceStore{
    constructor() {
        this.currentInvoice = {...invoiceStructure}
        makeAutoObservable(this)
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
    invoice_date: null,
    due_date:null,
    invoice_item: []
}
export const invoiceItemStructure = {
    product_id:undefined,
    amount:1
}