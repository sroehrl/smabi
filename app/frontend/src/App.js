import {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import './css/main.scss'
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AuthStore from "./store/Auth";
const authentication = new AuthStore();
// import Settings from "./pages/Settings";
const Settings = lazy(()=> import('./pages/Settings'))
function App() {
    return (
        <>
            <Header authentication={authentication}/>
            <Switch>
                <Suspense fallback={<p>Loading...</p>}>
                    <Route path={'/login'} component={()=><Login authentication={authentication}/>}/>
                    <ProtectedRoute path={'/'} exact component={Home}/>
                    <ProtectedRoute path={'/settings'} component={Settings}/>
                </Suspense>

            </Switch>
        </>
    );
}

export default App;
