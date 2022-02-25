<template>
  <div class="p-5">
    <div class="container d-flex">
      <search-box class="f-1" v-model:given-id="clientChoice" label="Search clients" :search-service="clientService"/>
      <div class="m-l-2 m-t-6">
        <button class="btn-primary" @click="showModal=true">+</button>
      </div>
    </div>
    <div class="grid-4-4-4 p-2 b-1 b-rounded m-y-1 b-gray-light-25" v-for="client in $store.state.Client.clients">
      <div class="b-r-1 b-gray-light-25 place-y-center">{{client.name}}</div>
      <div class="b-r-1 b-gray-light-25 p-l-3 place-y-center"><a :href="'mailto:'+client.email" class="text-decoration-none text-accent">{{client.email}}</a></div>
      <div class="p-l-3">
        <router-link :to="'/client/'+client.id" >
          <button class="btn-accent">open</button></router-link>

      </div>
    </div>
    <modal title="New Client" v-model:is-visible="showModal">
      <client-crud @stored="fetch" />
    </modal>
  </div>
</template>

<script>
import SearchBox from "@/components/io/SearchBox";
import clientService from "@/services/clientService";
import Modal from "@/components/Modal";
import ClientCrud from "@/components/client/ClientCrud";
import {useStore} from "vuex";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "Clients",
  components: {SearchBox, Modal, ClientCrud},
  setup(){
    const store = useStore();
    const router = useRouter();
    const showModal = ref(false)
    const clientChoice = ref(null);
    watch(clientChoice, ()=>{
      if(clientChoice.value){
        router.push('/client/'+clientChoice.value)
      }
    })
    function fetch(){
      store.dispatch('getPaginatedClients');
      showModal.value = false;
    }
    fetch();

    return {clientService, showModal, fetch, clientChoice}
  }

}
</script>

<style scoped>

</style>