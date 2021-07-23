import {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import './css/main.scss'
import Home from "./pages/Home";
import Header from "./components/Header";
// import Settings from "./pages/Settings";
const Settings = lazy(()=> import('./pages/Settings'))
function App() {
    return (
        <>
            <Header/>
            <Switch>
                <Suspense fallback={<p>Loading...</p>}>
                    <Route path={'/'} exact component={Home}/>
                    <Route path={'/settings'} component={Settings}/>
                </Suspense>

            </Switch>
        </>
    );
}

export default App;
