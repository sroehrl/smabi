<template>
  <div class="m-5">
    <h1>{{ client.name }}</h1>
    <div class="grid md:grid-6-6">
      <div class="grid-5-5-2 b-1 b-gray-light-25 p-3">
        <div>
          {{ client.name }} <br>
          {{ client.street_address }} <br>
          {{ client.city }} {{ client.state }} {{ client.zip_code }} <br>
          {{ client.country }}
        </div>
        <div>
          <a class="text-decoration-none text-primary" :href="client.website" target="_blank" rel="noopener noreferrer">{{client.website?.replace(/https*:\/\//,'')}}</a> <br>
          <div class="grid-8-2-2 b-b-1 b-gray-light-25 m-b-3">
            {{client.phone}}
            <popover title="Whatsapp">
              <whatsapp-link :number="client.phone"/>
            </popover>
            <popover title="Phone">
              <phone-link :number="client.phone" />
            </popover>

          </div>
          <popover title="Write email">
            <a class="text-primary text-decoration-none" :href="'mailto:'+client.email">{{client.email}}</a>
          </popover>

        </div>
        <div class="place-y-end place-x-end p-l-3 cursor-pointer" @click="showModal=true">
          <popover title="Edit client info">
            <unicon name="edit-alt" :fill="colors.accent"/>
          </popover>

        </div>
      </div>
      <form class="grid m-x-5" @submit.prevent="$store.dispatch('storeClient', client)">
        <div class="input">
          <textarea v-model="client.notes" placeholder="Notes" rows="3"></textarea>
        </div>
        <div class="place-x-end">
          <button class="btn-primary">save notes</button>
        </div>
      </form>
    </div>
    <div class="m-t-5">
      <tabs v-model:active-key="tabIndex" :options="['Calendar','People','Contracts']"></tabs>
      <client-events v-if="tabIndex===0" :client-id="$route.params.id"/>
      <client-contacts v-if="tabIndex===1" :contacts="client.client_contact"/>
    </div>
    <modal v-model:is-visible="showModal">
      <client-crud v-if="client" :client="client" @stored="fetch"/>
    </modal>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {ref} from "vue";
import Tabs from "@/components/Tabs";
import ClientEvents from "@/components/client/ClientEvents";
import WhatsappLink from "@/components/io/WhatsappLink";
import PhoneLink from "@/components/io/PhoneLink";
import colors from "@/utils/colors";
import Modal from "@/components/Modal";
import ClientCrud from "@/components/client/ClientCrud";
import ClientContacts from "@/components/client/ClientContacts";
import Popover from "@/components/io/Popover";
export default {
  name: "Client",
  components: {Tabs, ClientEvents, WhatsappLink, PhoneLink, Modal, ClientCrud, ClientContacts, Popover},

  setup() {
    const route = useRoute();
    const $store = useStore();
    const showModal = ref(false);
    const tabIndex = ref(0);
    // $store.dispatch('setCurrentClientById', route.params.id)
    const currentClient = ref({});
    function fetch(){
      $store.dispatch('setCurrentClientById', route.params.id).then(() => {
        currentClient.value = {...$store.state.Client.currentClient};
        showModal.value = false;
      })
    }
    fetch();
    return {client: currentClient, tabIndex, colors, fetch, showModal}
  }
}
</script>

<style scoped>

</style>