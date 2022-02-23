import {observer} from "mobx-react-lite";
import AutoComplete from "./AutoComplete";
import {useEffect, useState} from "react";
import settingsService from "../services/settings";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

export default observer(({boundClient, invoiceStore}) => {
    const [boundContact, setBoundContact] = useState({})
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const handleContactSelection = selection => {
        setBoundContact(boundClient.client_contact.find(c => c.id === selection))
        invoiceStore.set({...invoiceStore.currentInvoice, contact_id: selection})
    }

    const handleStatusSelection = selection => {
        invoiceStore.set({...invoiceStore.currentInvoice, status: selection})
        setInvoiceNumber(settingsService.invoicingNumber(selection))
        invoiceStore.set({...invoiceStore.currentInvoice, invoice_number: invoiceNumber})
        if(selection !== 'draft'){
            toast.warning('Estimates and Invoices cannot be changed after saving! In order to keep this document editable, please store it as draft for now.')
        }
    }
    useEffect(() => {
        if(!invoiceStore.currentInvoice.invoice_number){
            settingsService.get('invoicing').then(() => {
                setInvoiceNumber(settingsService.invoicingNumber('draft'))
            })
        } else {
            setInvoiceNumber(invoiceStore.currentInvoice.invoice_number)
        }
        invoiceStore.set({...invoiceStore.currentInvoice, invoice_number: invoiceNumber})

    }, [])
    return (
        <article>
            <h3 className={'p-l-3'}>{boundClient.name}</h3>
            <div className="grid-6-3-3">
                <div>
                    {boundContact.id ? (
                        <div className={'d-flex w-75p'}>
                            <div className={'f-1 p-l-3'}>c/o {boundContact.name}</div>
                            <div className={'place-y-center'}>
                                <button type={'button'} className="btn-warning btn-fab"
                                        onClick={() => setBoundContact({})}>x
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={'w-75p'}>
                            <AutoComplete label={'Add contact'} options={boundClient.client_contact}
                                          indexKey={'id'} setter={handleContactSelection}/>
                        </div>

                    )}
                    <div className={'m-b-5 p-l-3'}>
                        {boundClient.street_address} <br/>
                        {boundClient.city}, {boundClient.state}, {boundClient.zip_code} <br/>
                        {boundClient.country}
                    </div>
                </div>
                <div className={'grid w-75p place-y-start'}>
                    <AutoComplete passedInValue={invoiceStore.currentInvoice.status} setter={handleStatusSelection}
                                  asSelect={true} label={'Status'}
                                  options={[{name: 'draft'}, {name: 'estimate'}, {name: 'invoice'}]}/>
                    <div className={'grid place-y-start'}>
                        <button type={'submit'} className="btn-primary">save</button>
                    </div>
                </div>
                <div className={'grid'}>
                    <div className="input">
                        <input disabled={true} value={invoiceNumber} type="text" placeholder={'Invoice Number'}
                               name={'invoice_number'}/>
                        <label>Invoice Number</label>
                        <i className={'bi-info-circle place-y-center cursor-pointer'}
                           onClick={() => toast.info('Final generation on save')}/>
                    </div>
                    <div className="input">
                        <input disabled={true} value={invoiceStore.currentInvoice.invoice_date} type="date"
                               placeholder={'Invoice Date'} name={'invoice_date'} />
                        <label>Invoice Date</label>
                        <i className={'bi-info-circle place-y-center cursor-pointer'}
                           onClick={() => toast.info('Final generation on save')}/>
                    </div>

                    <div className="input">
                        <input type="date" placeholder={'Due Date'} name={'due_date'}/>
                        <label>Due Date</label>
                    </div>
                </div>
            </div>
            <ToastContainer/>

        </article>
    )
})