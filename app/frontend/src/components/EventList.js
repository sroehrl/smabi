import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction";
import {observer} from "mobx-react-lite";
import {useCallback, useEffect, useState} from "react";
import calendar from "../services/calendar";
import dayjs from "dayjs";
export default observer(({events, clientId}) => {
    const [localEvents, setLocalEvents] = useState([])
    const from = dayjs().set('date', 1).valueOf()

    const updateLocalEvents =useCallback(() => {
        calendar.getRange(from).then(res => {
            events.set(res);
            setLocalEvents([...res.filter(e => e.client_id === clientId)])
        })
    },[clientId, from, events])
    useEffect(()=>{
        updateLocalEvents()
    },[updateLocalEvents])


    return (<FullCalendar
        plugins={[listPlugin,interactionPlugin]}
        initialView={'listMonth'}
        events={localEvents}
        editable={true}
        headerToolbar={{start:'',center:'',end:''}}
    />)
})