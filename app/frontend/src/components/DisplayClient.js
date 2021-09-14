import {observer} from "mobx-react-lite";
import Tabs from "./Tabs";
import {useState} from "react";

export default observer(({client})=>{
    const [selectedTab, setSelectedTab] = useState(0)
    const tabs = [{label:'Events',active:true} ,{label:'People', active:false}]
    return(
        <>
            <h3>{client.currentClient.name}</h3>
            <div className="grid-6-6">
                <div className="m-r-2 b-rounded-2 p-3 b-1 b-accent place-y-start">
                    {client.currentClient.name} <br/>
                    {client.currentClient.street_address} <br/>
                    {client.currentClient.city}, {client.currentClient.state} {client.currentClient.zip_code} <br/>
                    {client.currentClient.country} <br/>
                    <a target={'_blank'} href={client.currentClient.website}>{client.currentClient.website.replace(/http(s):\/\//,'')}</a>
                </div>
                <div className="m-x-2">
                    <form>
                        <div className="input" style={{marginTop:0}}>
                            <textarea value={client.currentClient.notes} onChange={ev => client.currentClient.notes = ev.target.value} rows="5">Notes</textarea>
                        </div>
                    </form>
                </div>
            </div>
            <div className={'p-3'}>
                <Tabs tabs={tabs} onSelect={setSelectedTab}/>
                {selectedTab === 0 && (
                    <p>Calendar / timeline</p>
                )}
            </div>
        </>
    )
})