import {makeAutoObservable} from "mobx";

export default class AuthStore{
    constructor() {
        let user = sessionStorage.getItem('smabiUser');
        if(user){
            user = JSON.parse(user);
        }
        this.user = user;
        this.token = sessionStorage.getItem('token');
        makeAutoObservable(this)
    }
    logout(){
        this.user = null;
        this.token = null;
        sessionStorage.clear();
        window.location.reload()
    }
    login(credentials){
        this.user = credentials.user;
        sessionStorage.setItem('user', JSON.stringify(credentials.user))
        this.token = credentials.token;
        sessionStorage.setItem('token', credentials.token);
    }
}