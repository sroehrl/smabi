<template>
  <form @submit.prevent="save" class="m-x-8 p-t-3">
    <div class="grid-4-8 md:grid-2-4-2-4">
      <div class="p-r-2">
        <auto-complete v-model:given-id="localContact.gender" :options="[{id:0,name:'Mrs'},{id:1,name:'Mr',id:2,name: 'Other'}]" />
      </div>
      <div class="p-l-2 md:p-x-2">
        <div class="input">
          <input type="text" v-model="localContact.first_name" required placeholder="First Name">
          <label>First Name</label>
          <div class="input-error">Name is required</div>
        </div>
      </div>
      <div class="p-r-2 md:p-l-2">
        <div class="input">
          <input type="text" v-model="localContact.initials"  placeholder="Initial(s)">
          <label>Initial(s)</label>
        </div>
      </div>
      <div class="p-l-2">
        <div class="input">
          <input type="text" v-model="localContact.last_name" required placeholder="Last Name">
          <label>Last Name</label>
          <div class="input-error">Name is required</div>
        </div>
      </div>

    </div>
    <div class="grid-6-6">
      <div class="p-r-2">
        <div class="input">
          <input type="email" v-model="localContact.email" placeholder="Email">
          <label>Email</label>
        </div>
      </div>
      <div class="p-l-2">
        <div class="input">
          <input type="text" v-model="localContact.phone" placeholder="Phone">
          <label>Phone</label>
        </div>
      </div>
    </div>
    <div class="input">
      <input type="text" v-model="localContact.position" placeholder="Position/Title">
      <label>Position/Title</label>
    </div>
    <div class="input">
      <textarea v-model="localContact.notes" placeholder="Notes"></textarea>
      <label>Notes</label>
    </div>
    <div class="grid-6-6">
      <div>
        <button class="btn-warning" type="button" @click="remove">delete</button>
      </div>
      <div class="place-x-end">
        <button class="btn-primary" type="submit">save</button>
      </div>
    </div>
  </form>
</template>

<script>
import {clientContactStructure} from "@/store/modules/client";
import {inject, ref, watch} from "vue";
import AutoComplete from "@/components/io/AutoComplete";
import {useStore} from "vuex";

export default {
  name: "ClientContactCrud",
  components: {AutoComplete},

  props: {contact:Object},
  setup({contact},{emit}){
    const $store = useStore();
    const notification = inject('notification')
    const localContact = ref({...clientContactStructure});
    if(contact){
      localContact.value = {...contact}
    }
    watch(contact, ()=> localContact.value = {...contact})
    async function save(){
      await $store.dispatch('storeClientContact', localContact.value)
      emit('stored', true)
    }
    async function remove(){
      notification({text: 'Are you sure?'}).then(async ()=>{
        localContact.value.delete_date = '.';
        await $store.dispatch('storeClientContact', localContact.value);
        emit('stored', true)
      })
    }
    return {
      localContact,
      save,
      remove
    }
  }
}
</script>

<style scoped>

</style>