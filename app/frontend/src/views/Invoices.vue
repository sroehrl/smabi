<template>
<div class="p-5">
  <div class="container d-flex">
    <search-box class="f-1" label="Search invoices" :search-service="invoiceService"/>
    <div class="m-l-2 m-t-6">
      <button class="btn-primary" @click="showModal=true">+</button>
    </div>
  </div>
  <div class="grid-4-4-4 p-2 b-1 b-rounded m-y-1 b-gray-light-25" v-for="invoice in $store.state.Invoice.invoices">
    <div class="b-r-1 b-gray-light-25 place-y-center">{{$store.getters.getClientById(invoice.client_id).name}}</div>
    <div class="b-r-1 b-gray-light-25 p-l-3 place-y-center">f</div>
    <div class="p-l-3">
      <router-link :to="'/invoices/'+invoice.id" >
        <button class="btn-accent">open</button></router-link>

    </div>
  </div>
</div>
</template>

<script>
import SearchBox from "@/components/io/SearchBox";
import invoiceService from "@/services/invoiceService";
import {ref, watch} from 'vue';
import {useRouter} from "vue-router";
import {useStore} from "vuex";
export default {
  name: "Invoices",
  components: {SearchBox},
  setup(){
    const router = useRouter();
    const showModal = ref(false);
    const clientChoice = ref(null);
    const store = useStore();

    store.dispatch('getPaginatedInvoices')

    watch(clientChoice, ()=>{
      if(clientChoice.value){
        router.push('/invoices/'+clientChoice.value)
      }
    })
    return {invoiceService, showModal}
  }
}
</script>

<style scoped>

</style>