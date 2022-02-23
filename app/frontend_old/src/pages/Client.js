import {observer} from "mobx-react-lite";
import Dashboard from "../layout/Dashboard";
import SearchBox from "../components/SearchBox";
import AddClient from "../components/AddClient";
import Modal from "../components/Modal";
import {useCallback, useEffect, useState} from "react";
import * as ClientService from "../services/client";
import DisplayClient from "../components/DisplayClient";

export default observer(({client, events}) => {
    const [showModal, setShowModal] = useState(false);
    const SearchResults = ({result, clear, isSelected, trigger}) => {
        const choose = useCallback(() => {
            client.set(result)
            clear()
        },[clear,result])
        useEffect(()=>{
            if(trigger){
                choose()
            }
        },[trigger,choose])

        return (
            <p onClick={choose} className={'bg-white b-rounded b-1 m-2 p-3 raise-1-gray cursor-pointer' + (isSelected?' b-primary':' b-transparent')}>
                {result.name} <br/>
                {result.website.replace(/http(s):\/\//, '')} <br/>
                {result.zip_code} {result.city}{result.state && ', ' + result.state}
            </p>
        )
    }

    return (
        <>
            <Dashboard children={(
                <>
                    <div className={'p-3'}>
                        <div className="d-flex">
                            <SearchBox service={ClientService.default} label={'Find clients'}
                                       component={SearchResults}/>
                            <div className={'place-y-center m-l-1'}>
                                <button onClick={() => setShowModal(true)} className="btn btn-accent">+</button>
                            </div>
                        </div>
                        {client.currentClient.name && (
                            <DisplayClient client={client} events={events}/>
                        )}
                    </div>
                </>
            )}/>

            <Modal visible={showModal} setVisible={setShowModal}
                   component={() => AddClient({propagate: () => setShowModal(false)})} title={'Add new client'}/>
        </>

    )
})