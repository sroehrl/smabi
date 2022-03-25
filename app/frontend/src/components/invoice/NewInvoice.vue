<template>
  <div class="p-5">
    <form @submit.prevent="save">
      <div class="grid-6-6">
        <div class="p-r-2">
          <search-box title="Client" v-model:given-id="invoice.client_id" :search-service="ClientService" :required="true" label="Select Client" />
        </div>
        <div class="p-l-2">
          <auto-complete label="Type" :required="true" v-model:given-id="invoice.status" :options="options" />
        </div>
      </div>
      <div class="grid-6-6" v-if="invoice.client_id">
        <div class="p-r-2">
          <auto-complete label="Contact" v-model:given-id="invoice.contact_id" :options="$store.getters.getClientContactsByClientId(invoice.client_id)" />
        </div>
        <div class="p-l-2 ">
          <div class="input">
            <input type="text" v-model="invoice.invoice_number" placeholder="Number">
            <label>Number</label>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="place-x-end">
          <button class="btn-primary" type="submit">start</button>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";
import {invoiceStructure} from "@/store/modules/invoicing";
import SearchBox from "@/components/io/SearchBox";
import AutoComplete from "@/components/io/AutoComplete";
import ClientService from "@/services/clientService";
import {useRouter} from "vue-router";
export default {
  name: "NewInvoice",
  components: {SearchBox, AutoComplete},
  setup(){
    const store = useStore();
    const router = useRouter();
    store.dispatch('getInvoicingSettings').then(()=>{
      invoice.value.invoice_number = store.getters.getInvoicingSuggestion(invoice.value.status)
    })
    const options = ref([
      {id:'draft',name: 'draft'},
      {id:'estimate',name: 'estimate'},
      {id:'invoice',name: 'invoice'},
    ]);
    const invoice = ref({...invoiceStructure})
    async function save(){
      const newInvoiceId = await store.dispatch('storeInvoice', invoice.value)
      router.push('/invoice/'+newInvoiceId);
    }
    return {save, invoice, ClientService, options}
  }
}
</script>

<style scoped>

</style>