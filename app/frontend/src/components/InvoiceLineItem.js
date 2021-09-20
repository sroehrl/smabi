import {observer} from "mobx-react-lite";
import AutoComplete from "./AutoComplete";
import {useCallback, useEffect, useState} from "react";

export default observer(({invoiceStore, productStore, itemIndex, recalculate})=>{
    const [price, setPrice] = useState(0)
    const [lineTotal, setLineTotal] = useState(0)

    const calculations =useCallback(() => {
        const product = productStore.products.find(p => p.id === invoiceStore.currentInvoice.invoice_item[itemIndex].product_id);
        if(product){
            setPrice(product.price)
            setLineTotal((product.price * invoiceStore.currentInvoice.invoice_item[itemIndex].amount).toFixed(2))
        }
        if(typeof recalculate === 'function'){
            recalculate()
        }

    },[invoiceStore.currentInvoice.invoice_item,itemIndex, productStore.products, recalculate])
    const updateLineItem = (name, val) => {
        invoiceStore.updateLineItem(name, val, itemIndex)
        calculations()
    }


    useEffect(()=>{
        calculations()
    },[invoiceStore, productStore, calculations])

    return (
        <div className={'grid-4-2-2-2-2'} >
            <AutoComplete label={'Line item'} options={productStore.products} indexKey={'id'}
                          passedInValue={invoiceStore.currentInvoice.invoice_item[itemIndex].amount.product_id}
                          noFloatingLabel
                          setter={(val) => updateLineItem('product_id', val)}/>
            <div className="m-x-2">
                <div className="input">
                    <input type="number" placeholder={'Amount'} value={invoiceStore.currentInvoice.invoice_item[itemIndex].amount}
                           onChange={ev => updateLineItem( 'amount', ev.target.value)}/>
                </div>
            </div>

            <p className={'place-x-end place-y-center'}>
                {price}
            </p>
            <p className={'place-x-end place-y-center'}>
                {lineTotal}
            </p>
        </div>
    )
})