import auth from "../services/auth";
import {observer} from "mobx-react-lite";

export default observer(({authentication})=>{
    auth.getUser().then(console.log).catch(console.error)

    return (
        <header className={'bg-primary p-3 text-white d-flex raise-1-gray'}>
            <div className="logo">name</div>
            <div className="f-1"></div>
            <div>
                <button onClick={()=>authentication.login({user:{email:'bubu',password:'123123'},token:'123123123'})} className={'b-2 b-rounded-2 b-transparent bg-accent hover:b-white'}>login</button>
                <button onClick={()=>authentication.logout()}>logout ({authentication.user?.email})</button>
            </div>
        </header>
    );
})