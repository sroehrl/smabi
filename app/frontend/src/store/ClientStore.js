import {makeAutoObservable} from "mobx";
import Cookies from "universal-cookie";

export default class ClientStore {
    constructor() {
        this.cookies = new Cookies()
        this.currentClient = {}
        if(this.cookies.get('currentClient')){
            this.currentClient = this.cookies.get('currentClient');
        }
        makeAutoObservable(this)
    }

    set(client) {
        this.cookies.set('currentClient', client, { path: '/' })
        this.currentClient = client;

    }
}

export const clientStructure = {
    name: '',
    street_address: '',
    zip_code: '',
    state: '',
    country: '',
    city: '',
    website: '',
    email: '',
    notes: '',
    phone: '',

}
export const contactStructure = {
    gender: undefined,
    position: '',
    first_name: '',
    initials: '-',
    last_name: '',
    email: '',
    phone: '',
    notes: 'Notes'
}