import auth from "../services/auth";
import {observer} from "mobx-react-lite";

export default observer(({authentication})=>{
    auth.getUser().then(console.log).catch(console.error)

    return (
        <header className={'bg-primary p-3 text-white d-flex raise-1-gray'}>
            <div className="logo font-lg">SMABI</div>
            <div className="f-1"></div>
            <div>

                {authentication.user && (
                    <button className={'btn-warning'} onClick={()=>authentication.logout()}>logout ({authentication.user?.email})</button>
                )}
            </div>
        </header>
    );
})