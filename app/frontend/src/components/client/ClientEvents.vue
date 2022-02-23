<template>
  <div>
    <full-calendar :options="calendarOptions"/>
    <modal v-model:is-visible="showModal">
      <event-crud :event="selectedEvent" @stored="refetch"/>
    </modal>
  </div>

</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from "@/components/Modal";
import EventCrud from "@/components/calendar/EventCrud";
import {ref} from "vue";
import dayjs from "dayjs";
import {useStore} from "vuex";
import {eventStructure} from "@/store/modules/calendar";
export default {
  name: "ClientEvents",
  components:{FullCalendar,Modal,EventCrud},
  props: {
    clientId: String
  },
  setup({clientId}){
    const showModal = ref(false);
    const selectedEvent = ref(null);
    const $store = useStore();
    const from = dayjs().valueOf();

    function refetch(){
      $store.dispatch('getEventsByRange', from, '', 'client_id='+clientId)
          .then(() => {
            calendarOptions.value.events = $store.state.Calendar.events.filter(x => x.client_id === clientId)
          })
      showModal.value = false;
    }
    refetch();

    const calendarOptions = ref({
      plugins: [listPlugin, interactionPlugin],
      initialView: 'listMonth',
      eventClick: (ev) => {
        let pEvent = {...ev.event.extendedProps,id: ev.event.id,title: ev.event.title};
        selectedEvent.value = pEvent;
        showModal.value = true;
      },
      editable:true,
      customButtons: {
        createEvent: {
          text: 'NEW EVENT',
          click: () => {
            selectedEvent.value = {...eventStructure, client_id: clientId}
            showModal.value = true;
          }
        }
      },
     headerToolbar: {
       start: '',
       center: '',
       end: 'createEvent'
      },
      events: []
    })
    return {calendarOptions,showModal, selectedEvent, refetch}
  }
}
</script>

<style scoped>

</style>