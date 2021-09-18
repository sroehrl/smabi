// import auth from "../services/auth";
import {observer} from "mobx-react-lite";
import SmabiIcon from "../assets/smabi-icon.png"

export default observer(({authentication})=>{
    // auth.getUser().then(console.log).catch(console.error)

    return (
        <header className={'bg-primary p-3 text-white d-flex raise-1-gray'}>
            <div className="logo d-flex font-lg">
                <img src={SmabiIcon} alt="logo" style={{maxWidth:50} }/>
                <span className={'place-y-center'}>SMABIware</span>
            </div>
            <div className="f-1"/>
            <div>

                {authentication.user && (
                    <button className={'btn-warning'} onClick={()=>authentication.logout()}>logout ({authentication.user?.email})</button>
                )}
            </div>
        </header>
    );
})