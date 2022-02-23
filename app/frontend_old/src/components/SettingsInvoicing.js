import {useEffect, useState} from "react";
import AutoComplete from "./AutoComplete";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import settingsService from "../services/settings";
export default function SettingsInvoicing(){
    const [settings, setSettings] = useState({
        format:'{{status}}-YYYY-{{running}}',
        runners: {total:1, estimate:1,invoice:1,draft:1},
        separateRunners: true,
        restart: 'yearly'
    })
    const updateRunner = ev => {
        const runners = {...settings.runners};
        runners[ev.target.name] = Number(ev.target.value)
        setSettings({...settings, runners})
        console.log(settings)
    }
    const [interpretedFormat, setInterpretedFormat] = useState('')


    useEffect(()=>{
        settingsService.get('invoicing').then(obj => {
            setSettings(obj)
        })

    },[])

    useEffect(()=>{
        setInterpretedFormat(settingsService.invoicingNumber('invoice'))
    },[settings])
    const storeSettings = ev => {
        ev.preventDefault();
        settingsService.update('invoicing', settings).then(()=>{
            toast('saved!')
        })
    }
    return (
        <div>
            <ToastContainer hideProgressBar/>
            <p className={'p-5 font-strong'}>Resulting output: {interpretedFormat}</p>
                <form className={'grid m-y-5 p-3'} onSubmit={storeSettings}>
                    <div className="input">
                        <input type="text" placeholder={'Invoice number format'} value={settings.format} onChange={ev => setSettings({...settings,format:ev.target.value})}/>
                        <label>Invoice number format</label>
                    </div>
                    <div className="grid-6-6">
                        <div className={'grid m-r-2'}>
                            {/*<div className="d-flex m-y-4">*/}
                            {/*    <input name={'separateRunners'} onChange={ev => setSettings({...settings, separateRunners:!settings.separateRunners})} checked={settings.separateRunners}  type="checkbox" required role={'switch'}/>*/}
                            {/*    <span className={'f-1 p-l-2'}>Separate running numbers</span>*/}
                            {/*</div>*/}
                            <AutoComplete setter={val => setSettings({...settings, restart: val})} passedInValue={settings.restart} asSelect={true} label={'Reset running numbers'} options={[{name:'never'},{name:'yearly'}]}/>
                        </div>

                        <div className={'grid m-l-2'}>
                            <div className="input">
                                <input type="number" name={'draft'} placeholder={'Draft runner'} value={settings.runners.draft} onChange={updateRunner}/>
                                <label>Draft runner</label>
                            </div>
                            <div className="input">
                                <input type="number" name={'estimate'} placeholder={'Estimate runner'} value={settings.runners.estimate} onChange={updateRunner}/>
                                <label>Estimate runner</label>
                            </div>
                            <div className="input">
                                <input type="number" name={'invoice'} placeholder={'Invoice runner'} value={settings.runners.invoice} onChange={updateRunner}/>
                                <label>Invoice runner</label>
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="place-x-end">
                            <button type={'submit'} className="btn-primary">save</button>
                        </div>
                    </div>

                </form>

        </div>
    )
}