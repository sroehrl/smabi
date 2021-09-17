import {observer} from "mobx-react-lite";
import Dashboard from "../layout/Dashboard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import dayjs from "dayjs";
import {eventStructure} from "../store/EventStore";
import {useEffect, useRef, useState} from "react";
import * as calendarService from "../services/calendar";
import Modal from "../components/Modal";
import AddEvent from "../components/AddEvent";

export default observer(({events}) => {
    const calendar = useRef();
    const [view, setView] = useState('timeGridWeek')
    const [currentEvent, setCurrentEvent] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [calendarApi, setCalendarApi] = useState(null)
    useEffect(() => {
        setCalendarApi(calendar.current.getApi())

    }, [calendar.current])
    useEffect(() => {
        const today = new Date();
        today.setDate(1);
        fetchEvents(today)
    }, [])

    const fetchEvents = from => {
        calendarService.default.getRange(from.getTime()).then(ssEvents => {
            events.set(ssEvents)
        })
    }



    const eventClick = eContext => {
        setCurrentEvent(events.events.find(e => e.id === eContext.event.id))
        setShowModal(true)
    }
    const convertDateForServer = date => dayjs(date).format('YYYY-MM-DD HH:mm:ss')

    const newEventClick = cContext => {

        const endDate = dayjs(cContext).add(1,'hour').format('YYYY-MM-DD HH:mm:ss');
        setCurrentEvent({
            ...eventStructure,
            start_date: convertDateForServer(cContext.date),
            end_date:endDate
        })
        setShowModal(true)
    }
    const changeView = async ev => {
        const newView = view === 'dayGridMonth' ? 'timeGridWeek' : 'dayGridMonth'
        setView(newView)
        calendarApi.changeView(newView);
    }
    const dragDrop = async e => {
        const saveEvent = {
            ...e.event.extendedProps,
            start_date: convertDateForServer(e.event.start),
            end_date: convertDateForServer(e.event.end),
            id:e.event.id
        }
        const newEvents = [...events.events.filter(x => x.id !== e.event.id), await calendarService.default.update(saveEvent)]
        events.set(newEvents)
    }
    return (
        <Dashboard children={(
            <div className={'p-3'}>
                <h3>Calendar</h3>
                <div className="grid">
                    <div className="menu">
                        <button className={'btn-primary'} onClick={changeView}>
                            <i className={view === 'dayGridWeek' ? 'bi bi-calendar-month' : 'bi bi-calendar-week'}/>
                        </button>

                    </div>
                    <div>
                        <FullCalendar
                            ref={calendar}
                            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                            initialView={view}
                            editable={true}
                            datesSet={(x)=> fetchEvents(x.start)}
                            defaultAllDay={false}
                            dateClick={newEventClick}
                            events={events.events}
                            eventClick={eventClick}
                            eventChange={dragDrop}
                        />
                    </div>

                </div>

                <Modal visible={showModal} setVisible={setShowModal} title={currentEvent?.title ? 'Edit '+ currentEvent.title : 'New Event'} component={() => AddEvent({
                    passedInEvent: currentEvent,
                    events,
                    propagate: () => setShowModal(false)
                })}/>
            </div>
        )}/>
    )
})