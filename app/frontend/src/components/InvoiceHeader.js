import {observer} from "mobx-react-lite";
import AutoComplete from "./AutoComplete";
import {useState} from "react";

export default observer(({boundClient, invoiceStore})=>{
    const [boundContact, setBoundContact] = useState({})
    const handleContactSelection = selection => {
        setBoundContact(boundClient.client_contact.find(c => c.id === selection))
        invoiceStore.set({...invoiceStore.currentInvoice, contact_id: selection})
    }

    return (
        <article>
            <h3 className={'p-l-3'}>{boundClient.name}</h3>
            <div className="grid-6-6">
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
                </div>
                <div>here be status & co</div>
            </div>

            <div className={'m-b-5 p-l-3'}>
                {boundClient.street_address} <br/>
                {boundClient.city}, {boundClient.state}, {boundClient.zip_code} <br/>
                {boundClient.country}
            </div>
        </article>
    )
})