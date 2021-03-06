import {observer} from "mobx-react-lite";
import {useParams, useHistory} from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import {useCallback, useEffect, useState} from "react";
import clientService from "../services/client";
import SearchBox from "../components/SearchBox";
import productService from "../services/product";
import InvoiceHeader from "../components/InvoiceHeader";
import InvoiceLineItem from "../components/InvoiceLineItem";
import invoiceService from "../services/invoice";
import dayjs from "dayjs";

export default observer(({productStore, invoiceStore, clientStore}) => {
    const [boundClient, setBoundClient] = useState({})
    const [total, setTotal] = useState(0)
    const [totalTax, setTotalTax] = useState(0)
    const history = useHistory();

    const {invoiceId} = useParams();
    console.log("- " + invoiceId)

    const totalCalc = () =>{
        let totalCalc = 0;
        let totalTaxCalc = 0;
        invoiceStore.currentInvoice.invoice_item.forEach(item => {
            if(item.product_id){
                const product = productStore.products.find(p => p.id === item.product_id);
                totalCalc += product.price * item.amount;
                totalTaxCalc += product.sales_tax / 100 * (product.price * item.amount)
            }
            setTotal(totalCalc)
            setTotalTax(totalTaxCalc)
        })
    }

    useEffect(async ()=>{
       async function getInvoice(){
           await invoiceStore.get(invoiceId)
           setBoundClient(await clientStore.get(invoiceStore.currentInvoice.client_id))
       }
        if(invoiceId){
            getInvoice();
        }
    },[invoiceId])


    useEffect(() => {
        if (productStore.products.length < 1) {
            productService.find().then(res => {
                productStore.set(res)
            })
        }
    }, [productStore])
    useEffect(()=>{
        console.log('update')
    },[invoiceStore.currentInvoice.invoice_item])
    useEffect(()=>{
        let totalCalc = 0;
        invoiceStore.currentInvoice.invoice_item.forEach(item => {
            if(item.product_id){
                totalCalc += productStore.products.find(p => p.id === item.product_id).price * item.amount;
            }
            setTotal(totalCalc)
        })
    },[invoiceStore,productStore.products])

    const SearchResults = ({result, clear, isSelected, trigger}) => {
        const choose = useCallback(() => {
            result.client_contact.forEach((c, i) => {
                result.client_contact[i].name = c.first_name + ' ' + c.last_name;
            })
            setBoundClient(result)
            invoiceStore.set({...invoiceStore.currentInvoice, client_id: result.id})
            clear()
        }, [clear, result])
        useEffect(() => {
            if (trigger) {
                choose()
            }
        }, [trigger, choose])
        return (
            <div className={'bg-white b-rounded b-1 b-gray'}>
                <div onClick={choose} className={'p-3 ' + (isSelected ? 'bg-gray-25' : '')}>{result.name}</div>
            </div>
        )
    }
    const save = ev => {
        ev.preventDefault()
        if(invoiceId){
            invoiceService.update(invoiceStore.currentInvoice);
        } else {
            invoiceService.create(invoiceStore.currentInvoice).then(res => {
                history.push('/invoice/'+res.id)
            })
        }

    }
    return (
        <Dashboard children={(
            <section className={'p-y-3 p-x-5'}>
                {invoiceStore.currentInvoice.client_id ? (
                    <form className={'grid'} onSubmit={save}>
                        <InvoiceHeader invoiceStore={invoiceStore} boundClient={boundClient}/>
                        <div className="sd">
                            <div className={'grid-4-2-2-2-2'}>
                                <p className="font-strong place-x-center">Item</p>
                                <p className="font-strong place-x-center">Amount</p>
                                <p className="font-strong place-x-end">Price</p>
                                <p className="font-strong place-x-end">Total</p>
                            </div>
                            {invoiceStore.currentInvoice.invoice_item.map((item, i) => (
                                <InvoiceLineItem key={i} productStore={productStore} invoiceStore={invoiceStore} itemIndex={i} recalculate={totalCalc}/>
                            ))}
                        </div>

                        <button type={'button'} onClick={()=>invoiceStore.addLineItem()} className="btn-accent">add line item</button>
                        <div className={'grid-8-2-2 m-y-3'}>
                            <div>Tax</div>
                            <div className={'place-x-end'}>{totalTax}</div>
                            <div/>
                            <div>Total</div>
                            <div className={'place-x-end font-strong'}>{total}</div>
                            <div/>
                        </div>
                        {

                        }
                    </form>
                ) : (
                    <>
                        <SearchBox service={clientService} label={'Set client'} component={SearchResults}/>
                    </>

                )}

            </section>
        )}/>
    )
})