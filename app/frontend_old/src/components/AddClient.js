import countries from "../store/countries";
import {useEffect, useState} from "react";
import {updateState} from "../utils/stateUpdater";
import AutoComplete from "./AutoComplete";
import ClientService from "../services/client";
import {clientStructure} from '../store/ClientStore'
export default function AddClient({propagate, client}){
    const [clientData, setClientData] = useState(clientStructure);
    const updateClientData = updateState(setClientData);

    useEffect(()=>{
        if(client){
            setClientData({...client.currentClient})
        }
    },[client])

    const storeClient = async ev => {
        ev.preventDefault();
        try{
            if(client){
                client.currentClient = await ClientService.update(clientData)
            } else {
                client.currentClient = await ClientService.create(clientData)
            }
            if(propagate){
                propagate()
            }
        } catch (e) {

        }
    }

    return(
        <form className={'grid'} onSubmit={storeClient}>
            <div className="w-75p place-x-center">
                <div className="input">
                    <input value={clientData.name} onChange={updateClientData} required minLength={3} type="text" name={'name'} placeholder={'Client name'} id={'name'}/>
                    <label htmlFor="name">Client name</label>
                </div>
            </div>
            <div className="w-75p place-x-center">
                <div className="input">
                    <input value={clientData.website} onChange={updateClientData} minLength={3} type="url" name={'website'} placeholder={'Website'} id={'website'}/>
                    <label htmlFor="website">Website</label>
                    <div className="input-error">Include protocol (e.g. https://)</div>
                </div>
            </div>
            <div className="w-75p place-x-center">
                <div className="input">
                    <input value={clientData.street_address} onChange={updateClientData} type="text" name={'street_address'} placeholder={'Street address'} id={'street_address'}/>
                    <label htmlFor="street_address">Street address</label>
                </div>
            </div>
            <div className="grid-4-8 w-75p place-x-center">
                <div className=" w-75p">
                    <div className="input">
                        <input value={clientData.zip_code} onChange={updateClientData} type="text" name={'zip_code'} placeholder={'Postal Code'} id={'zip_code'}/>
                        <label htmlFor="zip_code">Postal Code</label>
                    </div>
                </div>
                <div className="p-l-3">
                    <div className="input">
                        <input value={clientData.city} onChange={updateClientData} type="text" name={'city'} placeholder={'City'} id={'city'}/>
                        <label htmlFor="city">City</label>
                    </div>
                </div>
            </div>
            <div className="grid-4-8 w-75p place-x-center">
                <div className=" w-75p">
                    <div className="input">
                        <input value={clientData.state} onChange={updateClientData} type="text" name={'state'} placeholder={'State'} id={'state'}/>
                        <label htmlFor="state">State</label>
                    </div>
                </div>
                <div className="p-l-3">
                    <AutoComplete passedInValue={clientData.country} options={countries} label={'Country'} setter={country =>setClientData({...clientData, country})} />
                </div>
            </div>
            <div className="w-75p place-x-center">
                <div className="input">
                    <input value={clientData.email} onChange={updateClientData} type="email" name={'email'} placeholder={'Main email'} />
                    <label>Main email</label>
                </div>
            </div>
            <div className="w-75p place-x-center">
                <div className="input">
                    <input value={clientData.phone} onChange={updateClientData} type="phone" name={'phone'} placeholder={'Phone #'} />
                    <label >Phone #</label>
                </div>
            </div>
            <div className="grid w-75p place-x-center">
                <div className="place-x-end">
                    <button className={'btn-primary'} type={"submit"}>Save</button>
                </div>
            </div>


        </form>
    )
}