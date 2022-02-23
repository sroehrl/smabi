<template>
  <div class="p-5" >
    <full-calendar :options="options" ref="calendar"></full-calendar>
    <modal v-model:is-visible="modal" >
      <event-crud :event="currentEvent" @stored="modal=false"></event-crud>

    </modal>
  </div>
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import Modal from "@/components/Modal";
import EventCrud from "@/components/calendar/EventCrud";
import {eventStructure} from "@/store/modules/calendar";

export default {
  name: "Calendar",
  components: {EventCrud, FullCalendar,Modal},
  data: () => ({
    modal: false,
    currentEvent: {...eventStructure}
  }),
  computed:{
    options(){
      return {

        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'timeGridWeek',
        height: 'calc(100vh - 160px)',
        editable: true,
        dateClick: this.dateClick,
        eventClick: this.dateClick,
        eventDrop: this.moved,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth'
        },
        events: this.$store.state.Calendar.events
      }
    }
  },
  mounted(){
    let calendarApi = this.$refs.calendar.getApi();
    const startTime = new Date();
    startTime.setDate(1);
    this.$store.dispatch('getEventsByRange', startTime.getTime())
    // calendarApi.view.calendar.changeView('dayGridMonth')
  },
  methods: {
    moved(ev){
      console.log(ev)
      this.$store.dispatch('storeCalendarEvent', ev.event)
    },
    dateClick(ev){
      if(ev.event){
        this.currentEvent = this.$store.state.Calendar.events.find(x => x.id === ev.event.id)
      } else {
        this.currentEvent = {...eventStructure}
      }
      this.modal = true;
    }
  }
}
</script>

