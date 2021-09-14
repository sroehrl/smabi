import {makeAutoObservable} from "mobx";

export default class ClientStore {
    constructor() {
       this.currentClient = {}
        makeAutoObservable(this)
    }
    set(client){
        this.currentClient = client;
    }
}