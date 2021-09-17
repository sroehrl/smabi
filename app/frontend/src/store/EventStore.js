import {makeAutoObservable} from "mobx";
import Cookies from "universal-cookie";

export default class EventStore{
    constructor() {
        this.cookies = new Cookies()
        this.events = []
        if(this.cookies.get('events')){
            this.events = this.cookies.get('events');
        }
        makeAutoObservable(this)
    }
    set(events) {
        for(let i = 0; i < events.length; i++){
            events[i].start = new Date(events[i].start_date.replace(' ','T'))
            events[i].end = new Date(events[i].end_date.replace(' ','T'))
        }
        this.cookies.set('events', events, { path: '/' })
        this.events = events;

    }
}
export const eventStructure = {
    start_date:'',
    end_date:'',
    title:'',
    client_id:null,
    notes:'',
    start:'',
    end:''
};