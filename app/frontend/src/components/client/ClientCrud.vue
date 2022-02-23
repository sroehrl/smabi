<template>
  <form class="m-x-8 grid" @submit.prevent="save">
    <div class="input">
      <input type="text" v-model="localClient.name" required placeholder="Name">
      <label>Name</label>
      <div class="input-error">Name is required</div>
    </div>
    <div class="d-flex">
      <div class="place-y-center p-r-2 p-t-3">
        <unicon name="globe" :fill="colors.primary" />
      </div>
      <div class="input">
        <input type="text" v-model="localClient.website" placeholder="https://">
        <label>Website</label>
      </div>
    </div>
    <div class="b-b-1 b-gray-light-25 p-l-2 m-y-5">Address</div>
    <div class="input">
      <input type="text" v-model="localClient.street_address" placeholder="Street & Number">
      <label>Street & Number</label>
    </div>
    <div class="grid-4-1-7">
      <div class="input">
        <input type="text" v-model="localClient.zip_code" placeholder="Postal Code">
        <label>Postal Code</label>
      </div>
      <div></div>
      <div class="input">
        <input type="text" v-model="localClient.city" placeholder="City">
        <label>City</label>
      </div>
    </div>
    <div class="grid-4-1-7">
      <div class="input">
        <input type="text" v-model="localClient.state" placeholder="State">
        <label>State</label>
      </div>
      <div></div>
      <div class="input">
        <input type="text" v-model="localClient.country" placeholder="Country">
        <label>Country</label>
      </div>
    </div>
    <div class="b-b-1 b-gray-light-25 p-l-2 m-y-5">Global Contact</div>
    <div class="grid-5-2-5">
      <div class="input">
        <input type="email" v-model="localClient.email" placeholder="Main Email">
        <label>Main Email</label>
      </div>
      <div></div>
      <div class="input">
        <input type="text" v-model="localClient.phone" placeholder="Main Phone-#">
        <label>Main Phone-#</label>
      </div>
    </div>
    <div class="grid-6-6">
      <div><button type="button" v-if="localClient.id" class="btn-warning" @click="remove">delete</button></div>
      <div class="place-x-end"><button type="submit" class="btn-primary">save</button></div>
    </div>
  </form>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import {clientStructure} from "@/store/modules/client";
import {watch} from "vue";
import colors from "@/utils/colors";
import {inject} from "vue";

export default {
  name: "ClientCrud",
  props:{
    client: Object
  },
  data:()=>({colors:{...colors}}),
  setup({client},{emit}){
    const notification = inject('notification');
    const localClient = ref({...clientStructure});
    if(client){
      localClient.value = {...client}
    }
    watch(client, newClient => {
      localClient.value = {...client}
    })

    const $store = useStore();
    async function save(){
      await $store.dispatch('storeClient', localClient.value)
      emit('stored', true)
    }
    async function remove(){
      notification({text: 'Are you sure?'}).then(async ()=>{
        await $store.dispatch('removeClient', localClient.value);
        emit('stored', true)
      })
    }
    return {localClient, save, remove}
  }
}
</script>

<style scoped>

</style>