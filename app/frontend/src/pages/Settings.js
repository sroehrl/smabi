import Dashboard from "../layout/Dashboard";
import {useState} from "react";
import Tabs from "../components/Tabs";

export default function Settings(){
    const [selectedTab, setSelectedTab] = useState(0);
    const tabs= [
        {label:'Emailing', active: true},
        {label:'Payment gateway', active: false},
        {label:'Integrations', active: false},
    ]
    return (
        <Dashboard children={(
            <div className={'p-3'}>
                <Tabs tabs={tabs} onSelect={setSelectedTab}/>
                {selectedTab === 0 && (
                    <p>Emailing</p>
                )}
            </div>
        )}/>
    )
}