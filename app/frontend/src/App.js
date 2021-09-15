import {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import './css/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AuthStore from "./store/AuthStore";
import ClientStore from "./store/ClientStore";
const authentication = new AuthStore();
const currentClient = new ClientStore();


const Settings = lazy(()=> import('./pages/Settings'))
const Client = lazy(()=> import('./pages/Client'))
function App() {
    return (
        <>
            <Header authentication={authentication}/>
            <Switch>
                <Suspense fallback={<p>Loading...</p>}>
                    <Route path={'/login'} component={()=><Login authentication={authentication}/>}/>
                    <ProtectedRoute path={'/'} exact component={Home}/>
                    <ProtectedRoute path={'/client'} component={() =><Client client={currentClient}/>}/>
                    <ProtectedRoute path={'/settings'} component={Settings}/>
                </Suspense>

            </Switch>
        </>
    );
}

export default App;
