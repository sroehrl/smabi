import {useCallback, useEffect, useState} from "react";
import {eventStructure} from "../store/EventStore";
import {updateState} from "../utils/stateUpdater";
import * as calendarService from "../services/calendar";
import * as clientService from "../services/client";
import SearchBox from "./SearchBox";
import AutoComplete from "./AutoComplete";

export default function AddEvent({events, propagate, passedInEvent}){
    const [event, setEvent] = useState(eventStructure)
    const [boundClient, setBoundClient] = useState({})
    const [boundContact, setBoundContact] = useState({})

    const updateEvent = updateState(setEvent)
    useEffect(()=>{
        let isSubscribed = true;
        if(passedInEvent){
            setEvent({
                ...passedInEvent,
                start_date: passedInEvent.start_date.replace(' ','T'),
                end_date: passedInEvent.end_date.replace(' ','T')
            })
            if(passedInEvent.client_id){
                clientService.default.find(passedInEvent.client_id).then(res => {
                    if(isSubscribed && res.length>0){
                        res[0].client_contact.forEach((c, i)=>{
                            res[0].client_contact[i].name = c.first_name + ' ' + c.last_name;
                            if(passedInEvent.contact_id === c.id){
                                setBoundContact(res[0].client_contact[i])
                            }
                        })
                        setBoundClient(res[0])
                    }

                })
            }
        }
        return () => (isSubscribed = false)
    },[passedInEvent])

    const store = async ev => {
        ev.preventDefault()
        if(event.id){
            const newEvents =  events.events.filter(e => e.id !== event.id)
            newEvents.push(await  calendarService.default.update(event));
            events.set(newEvents)
        } else {
            const newEvent = await calendarService.default.create(event);
            newEvent.classNames = ['bg-accent','text-white']
            events.set([...events.events,newEvent])
        }
        setTimeout(()=>propagate(),100)
    }
    const SearchResults = ({result, clear, isSelected, trigger}) => {
        const choose = useCallback(() => {
            result.client_contact.forEach((c, i)=>{
                result.client_contact[i].name = c.first_name + ' ' + c.last_name;
            })
            setBoundClient(result)
            setEvent({...event,client_id: result.id})
            clear()
        },[clear,result])
        useEffect(()=>{
            if(trigger){
                choose()
            }
        },[trigger,choose])
        return (
            <div className={'bg-white b-rounded b-1 b-gray'}>
                <div onClick={choose} className={'p-3 ' + (isSelected ? 'bg-gray-25' : '')}>{result.name}</div>
            </div>
        )
    }
    const handleContactSelection = selection => {
        setBoundContact(boundClient.client_contact.find(c => c.id === selection))
        setEvent({...event,contact_id: selection})
    }

    return (
        <form className={'grid'} onSubmit={store}>
            <div className="w-75p place-x-center">
                <div className="input">
                    <input value={event.title} type="text" name={'title'} placeholder={'Title'} onChange={updateEvent}/>
                    <label>Title</label>
                </div>
                <div className="input">
                    <textarea name={'notes'} value={event.notes || 'Notes'} onChange={updateEvent} rows={5}/>
                </div>
                <div className="grid-5-2-5">
                    <div className="input">
                        <input value={event.start_date} type="datetime-local" name={'start_date'} placeholder={'Start'} onChange={updateEvent}/>
                        <label>Start</label>
                    </div>
                    <div></div>
                    <div className="input">
                        <input value={event.end_date} type="datetime-local" name={'end_date'} placeholder={'End'} onChange={updateEvent}/>
                        <label>End</label>
                    </div>
                </div>

                <div>
                    {boundClient.id ? (
                        <>
                            <div className={'d-flex'}>
                                <p className={'f-1'}>Client: {boundClient.name}</p>
                                <div className={'place-y-center'}>
                                    <button type={'button'} className="btn-warning btn-fab" onClick={()=>setBoundClient({})}>x</button>
                                </div>
                            </div>
                            {boundContact.id ? (
                                <div className={'d-flex'}>
                                    <p className={'f-1'}>Contact: {boundContact.name}</p>
                                    <div className={'place-y-center'}>
                                        <button type={'button'} className="btn-warning btn-fab" onClick={()=>setBoundContact({})}>x</button>
                                    </div>
                                </div>
                            ):(
                                <>
                                    <AutoComplete label={'Add contact'} options={boundClient.client_contact} indexKey={'id'} setter={handleContactSelection}/>
                                </>

                            )}
                        </>

                    ) : (
                        <SearchBox service={clientService.default} label={'Add client'} component={SearchResults}/>
                    )}

                </div>

                <div>
                    <button className="btn-primary" type={'submit'}>save</button>
                </div>
            </div>

        </form>
    )
}