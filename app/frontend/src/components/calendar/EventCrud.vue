<template>
  <form class="m-x-8 grid" @submit.prevent="save">
    <div class="input">
      <input required type="text" placeholder="Title" v-model="localEvent.title" />
      <label>Title</label>
      <div class="input-error">Event must have a title</div>
    </div>
    <div class="grid-6-6">
      <auto-complete :required="true" label="Appointment type" v-model:given-id="localEvent.event_type" :options="typeOptions" />
    </div>
    <div class="input">
      <textarea placeholder="Notes" v-model="localEvent.notes" ></textarea>
      <label>Notes</label>
    </div>
    <div class="grid-6-6">
      <div class="p-r-2">
        <div class="input">
          <input required v-model="localEvent.start_date" type="datetime-local" placeholder="Start Time"/>
          <label>Start</label>
        </div>
      </div>
      <div class="p-l-2">
        <div class="input">
          <input required v-model="localEvent.end_date" type="datetime-local" placeholder="Start Time"/>
          <label>End</label>
        </div>
      </div>
    </div>
    <search-box label="Client" v-model:given-id="localEvent.client_id" :search-service="clientService"></search-box>
    <auto-complete v-if="$store.state.Client.currentClient && localEvent.client_id" v-model:given-id="localEvent.contact_id" label="Contact" result-title="fullName" :options="$store.getters.getCurrentClientContacts" />
    <div class="grid-6-6">
      <div>
        <button type="button" class="btn-warning" @click="remove">Delete</button>
      </div>
      <div class="place-x-end">
        <button class="btn-primary" type="submit">Save</button>
      </div>

    </div>

  </form>
</template>

<script>
import {watch, ref, inject, reactive} from "vue";
import {eventStructure} from "@/store/modules/calendar";
import SearchBox from "@/components/io/SearchBox";
import AutoComplete from "@/components/io/AutoComplete";
import clientService from "@/services/clientService";
import {useStore} from "vuex";
export default {
  name: "EventCrud",
  components: {SearchBox,AutoComplete},

  props: {
    event:{type:Object}
  },
  setup(props, {emit}){
    const localEvent = ref({...eventStructure});
    const $store = useStore();
    const notification = inject('notification');
    const currentContacts = ref($store.getters.getCurrentClientContacts)
    const typeOptions = reactive([
      {name: 'Call', id:'call'},
      {name: 'In-person', id:'in_person'},
      {name: 'Event', id:'event'}
    ]);

    function setEvent(passedInEvent){
      localEvent.value = {...passedInEvent}
    }
    function setCurrentClient(cId){
      if(cId){
        $store.dispatch('setCurrentClientById', cId)
      }
    }
    if(props.event){
      setEvent(props.event)
    }
    watch(()=> props.event, (newVal)=>{
      if(newVal){
        setEvent(props.event)
      }
    },{immediate:true})
    watch(localEvent, ()=>setCurrentClient(localEvent.value.client_id))
    if(localEvent.value.client_id){
      setCurrentClient(localEvent.value.client_id)
    }
    const bind = ev => {
      localEvent.value.client_id = ev.id
    }
    const save = async () => {
      await $store.dispatch('storeCalendarEvent', localEvent.value);
      emit('stored', true)
    }
    const remove = () => {
      notification({text: 'Are you sure?'}).then(async ()=>{
        await $store.dispatch('removeCalendarEvent', localEvent.value);
        emit('stored', true)
      })

    }
    return {localEvent, clientService,typeOptions, bind, currentContacts,save, remove}
  }
}
</script>

<style scoped>

</style>