import {Route, Redirect} from 'react-router-dom';
import AuthStore from "./store/Auth";
export default function ProtectedRoute({component: Component, ...args}){
    return(
            <Route {...args} render={(props)=>{
                const auth = new AuthStore();
                console.log(auth.token)
                if(auth.token){
                    return <Component {...props}/>
                } else {
                    return <Redirect to={'/login'}/>
                }
            }}/>
        )
}