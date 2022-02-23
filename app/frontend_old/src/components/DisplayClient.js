import {observer} from "mobx-react-lite";
import Tabs from "./Tabs";
import {useEffect, useState} from "react";
import Modal from "./Modal";
import AddClient from "./AddClient";
import ClientService from '../services/client'
import DisplayContact from "./DisplayContact";
import AddContact from "./AddContact";
import EventList from "./EventList";
import AddEvent from "./AddEvent";

export default observer(({client, events}) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [showEventModal, setShowEventModal] = useState(false)
    const [showClientModal, setShowClientModal] = useState(false)
    const [showContactModal, setShowContactModal] = useState(false)
    const [contactFilter, setContactFilter] = useState('')
    const [filteredContacts, setFilteredContacts] = useState(client.currentClient.client_contact)
    const tabs = [
        {label: 'Activity', active: true},
        {label: 'People', active: false},
        {label: 'Contracts', active: false}
    ]
    useEffect(()=>{
        setContactFilter('')
        setFilteredContacts(client.currentClient.client_contact)
    },[showContactModal, client, showContactModal])
    const filterContacts = ev => {
        setContactFilter(ev.target.value)
        const filtered = client.currentClient.client_contact.filter(x => {
            return (x.first_name + ' ' + x.last_name).toLowerCase().includes(ev.target.value.toLowerCase())
        }).sort((a,b)=>a.last_name>b.last_name?1:0)
        setFilteredContacts(filtered)
    }
    const updateClient = ev => {
        ev.preventDefault();
        ClientService.update(client.currentClient)
    }
    return (
        <>
            <h3>{client.currentClient.name}</h3>
            <div className="grid-6-6">
                <div>
                    <div className="grid lg:grid-6-6 m-r-2 b-rounded-2 p-3 b-1 b-accent place-y-start">
                        <div>
                            {client.currentClient.name} <br/>
                            {client.currentClient.street_address} <br/>
                            {client.currentClient.city}, {client.currentClient.state} {client.currentClient.zip_code}
                            <br/>
                            {client.currentClient.country}
                        </div>
                        <div>
                            <a rel={'noreferrer'} target={'_blank'}
                               href={client.currentClient.website}>{client.currentClient.website.replace(/http(s):\/\//, '')}</a>
                            <br/>
                            <a rel={'noopener'} href={'tel:' + client.currentClient.phone}>{client.currentClient.phone}</a> <br/>
                            <a rel={'noopener'} href={'mail:' + client.currentClient.email}>{client.currentClient.email}</a> <br/>
                            <div className="grid">
                                <i className="bi-pencil place-x-end cursor-pointer"
                                   onClick={() => setShowClientModal(true)}>&nbsp;</i>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="m-x-2">
                    <form onSubmit={updateClient}>
                        <div className="input" style={{marginTop: 0}}>
                            <textarea value={client.currentClient.notes}
                                      onChange={ev => client.currentClient.notes = ev.target.value}
                                      rows="5">Notes</textarea>
                        </div>
                        <div className="grid">
                            <button type={'submit'} className="btn-primary place-x-end">save notes</button>
                        </div>

                    </form>
                </div>
            </div>
            <div className={'p-3'}>
                <Tabs tabs={tabs} onSelect={setSelectedTab}/>
                {selectedTab === 0 && client.currentClient.id && (
                    <div className="grid-3-9">
                        <div className={'p-3 m-t-5'}>
                            <button className="btn-accent" onClick={x=>setShowEventModal(true)}>add activity/event</button>
                        </div>
                        <div className={''}>
                            <EventList events={events} clientId={client.currentClient.id}/>
                        </div>
                    </div>
                )}
                {selectedTab === 1 && (
                    <div className={''}>
                        <div className="d-flex">
                            <div className="input">
                                <input value={contactFilter} onChange={filterContacts} type="text" placeholder={'Filter contacts'}/>
                            </div>
                            <div className={'place-y-center m-l-1'}>
                                <button className="btn-accent" onClick={() => setShowContactModal(true)}>+</button>
                            </div>
                        </div>
                        <div className="grid-6-6 lg:grid-4-4-4">
                            {filteredContacts.map(contact => <DisplayContact key={contact.id} contactId={contact.id} client={client}/>)}
                        </div>
                    </div>
                )}
            </div>
            {/*Event modal*/}
            <Modal visible={showEventModal} setVisible={setShowEventModal} title={'New Event'} component={() => AddEvent({
                events,
                clientId:client.currentClient.id,
                propagate: () => setShowEventModal(false)
            })}/>
            {/* Client modal */}
            <Modal visible={showClientModal} setVisible={setShowClientModal} title={'Edit Client Details'}
                   component={() => AddClient({propagate: () => setShowClientModal(false), client})}/>
            {/* Contact modal */}
            <Modal visible={showContactModal} setVisible={setShowContactModal} title={'Client Contact'} component={()=> AddContact({propagate: () => setShowContactModal(false),client})}/>
        </>
    )
})