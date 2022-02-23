import {Route, Redirect} from 'react-router-dom';
import AuthStore from "./store/AuthStore";
export default function ProtectedRoute({component: Component, ...args}){
    return(
            <Route {...args} render={(props)=>{
                const auth = new AuthStore();
                if(auth.token){
                    return <Component {...props}/>
                } else {
                    return <Redirect to={'/login'}/>
                }
            }}/>
        )
}