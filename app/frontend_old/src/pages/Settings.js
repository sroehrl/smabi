import Dashboard from "../layout/Dashboard";
import {useState} from "react";
import Tabs from "../components/Tabs";
import SettingsInvoicing from "../components/SettingsInvoicing";

export default function Settings(){
    const [selectedTab, setSelectedTab] = useState(0);
    const tabs= [
        {label:'Emailing', active: true},
        {label:'Payment gateway', active: false},
        {label:'Integrations', active: false},
        {label:'Invoicing', active: false},
    ]
    return (
        <Dashboard children={(
            <div className={'p-3'}>
                <Tabs tabs={tabs} onSelect={setSelectedTab}/>
                {selectedTab === 0 && (
                    <p>Emailing</p>
                )}
                {selectedTab === 3 && <SettingsInvoicing/>}
            </div>
        )}/>
    )
}