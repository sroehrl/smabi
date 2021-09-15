import {contactStructure} from "../store/ClientStore";
import {useEffect, useState} from "react";
import {updateState} from "../utils/stateUpdater";
import AutoComplete from "./AutoComplete";
import * as ClientService from "../services/client";
import Tabs from "./Tabs";

export default function AddContact({client, propagate, existingContact}) {
    const [contact, setContact] = useState(contactStructure)
    const [tab, setTab] = useState(0)
    const updateContactData = updateState(setContact)
    const genderOptions = [
        {name: 'Female', key: 0},
        {name: 'Male', key: 1},
        {name: 'Other', key: 2},

    ];
    useEffect(() => {
        if (existingContact) {
            setContact({...existingContact})
            setTab(1)
        }
    }, [existingContact])

    const storeClient = async ev => {
        ev.preventDefault();
        try {

            const clientCopy = JSON.parse(JSON.stringify(client.currentClient))
            clientCopy.client_contact.push(contact);
            client.set(await ClientService.default.update(clientCopy))
            // client.currentClient = await ClientService.default.update(clientCopy)
            if (propagate) {
                propagate()
            }
        } catch (e) {

        }
    }
    return (
        <>
            {existingContact && <Tabs onSelect={setTab} tabs={[{label: 'Edit Info', active: false}, {label: 'Notes', active: true}]}/>}
            <form className={'grid m-t-4'} onSubmit={storeClient}>
                {tab === 0 ? (
                    <>
                        <div className="grid lg:grid-5-2-5 w-75p place-x-center">
                            <div className="input">
                                <input value={contact.position} onChange={updateContactData} type="text" name={'position'}
                                       placeholder={'Position/Title'}/>
                                <label>Position/Title</label>
                            </div>
                            <div></div>
                            <AutoComplete asSelect={true} indexKey="key" label={'Gender'} options={genderOptions}
                                          type={'text'} setter={gender => setContact({...contact, gender})}
                                          passedInValue={contact.gender}/>
                        </div>

                        <div className="grid lg:grid-5-2-5 w-75p place-x-center">
                            <div>
                                <div className="input">
                                    <input value={contact.first_name} onChange={updateContactData} type="text"
                                           name={'first_name'} placeholder={'First name'}/>
                                    <label>First name</label>
                                </div>
                            </div>
                            <div></div>
                            <div>
                                <div className="input">
                                    <input required value={contact.last_name} onChange={updateContactData} type="text"
                                           name={'last_name'} placeholder={'Last name'}/>
                                    <label>Last name</label>
                                </div>
                            </div>
                        </div>
                        <div className="w-75p place-x-center">
                            <div className="input">
                                <input value={contact.email} onChange={updateContactData} type="email" name={'email'} placeholder={'Email'} />
                                <label>Email</label>
                            </div>
                        </div>
                        <div className="w-75p place-x-center">
                            <div className="input">
                                <input value={contact.phone} onChange={updateContactData} type="tel" name={'phone'} placeholder={'Phone'} />
                                <label>Phone</label>
                            </div>
                        </div>
                    </>
                    ): (
                        <>
                            <div className="w-75p place-x-center">
                                <div className="input">
                                    <textarea value={contact.notes} onChange={updateContactData} name={'notes'} rows={8}/>
                                </div>
                            </div>
                        </>
                    )}


                <div className="grid w-75p place-x-center">
                    <div className="place-x-end">
                        <button className={'btn-primary'} type={"submit"}>Save</button>
                    </div>
                </div>
            </form>
        </>

    )
}