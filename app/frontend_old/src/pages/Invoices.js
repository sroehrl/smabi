import {observer} from "mobx-react-lite";
import Dashboard from "../layout/Dashboard";
import {Link} from "react-router-dom";

export default observer(()=>{
    return (
        <Dashboard children={(
            <div className={'p-3'}>
                <div className="d-flex">
                    <div className="input f-1">
                        <input placeholder={'Filter Invoices'} type="text"   />
                        <label>Filter Invoices</label>
                    </div>
                    <div className={'place-y-center m-l-1'}>
                        <Link to={'/invoice'} className="btn btn-accent">+ new invoice</Link>
                    </div>
                </div>
            </div>
        )}/>
    )
})