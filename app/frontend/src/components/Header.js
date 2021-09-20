// import auth from "../services/auth";
import {observer} from "mobx-react-lite";
import SmabiIcon from "../assets/smabi-icon.png"
import {Link} from "react-router-dom";

export default observer(({authentication})=>{
    // auth.getUser().then(console.log).catch(console.error)

    return (
        <header className={'bg-primary p-3 text-white d-flex raise-1-gray'}>
            <Link to={'/'} className="logo d-flex font-lg text-decoration-none">
                <img src={SmabiIcon} alt="logo" style={{maxWidth:50} }/>
                <span className={'place-y-center text-white'}>SMABIware</span>
            </Link>
            <div className="f-1"/>
            <div>

                {authentication.user && (
                    <button className={'btn-warning'} onClick={()=>authentication.logout()}>logout ({authentication.user?.email})</button>
                )}
            </div>
        </header>
    );
})