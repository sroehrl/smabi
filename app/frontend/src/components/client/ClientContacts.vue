<template>
  <div>
    <div class="container d-flex position-relative">
      <div class="input">
        <input type="text" placeholder="Filter contacts" v-model="filter">
        <label>Filter contacts</label>
        <div v-if="filter.length>0" class="position-absolute m-2 cursor-pointer" style="right: 0; z-index: 2"
             @click="filter=''">
          <unicon name="times-circle" icon-style="solid" :fill="colors.warning"/>
        </div>
      </div>
      <div class="m-t-5 m-l-2">
        <popover title="Create new contact">
          <button class="btn-primary" @click="editContact">+</button>
        </popover>

      </div>
    </div>

    <div class="grid-6-6 md:grid-4-4-4">
      <div class="m-1 b-1 b-gray-light-25 p-x-2 p-y-1 bg-white hover:grow hover:raise-2-primary-50"
           v-for="(contact,i) in filteredContacts">

        <h3 class="text-primary font-md">{{ contact.gender === 0 ? 'Mrs.' : 'Mr.' }} {{ contact.first_name }}
          {{ contact.initials }} {{ contact.last_name }}</h3>
        <div class="grid-6-6">
          <div>{{ contact.position }}</div>
          <div class="d-flex">
            <div class="f-1">
              <popover title="Whatsapp">
                <whatsapp-link :number="contact.phone"/>
              </popover>
            </div>
            <div class="f-1">
              <Popover title="Phone">
                <phone-link :number="contact.phone"/>
              </Popover>

            </div>
            <div class="f-1">
              <popover title="Email">
                <unicon class="cursor-pointer" :fill="colors.primary" @click="mail(contact.email)" width="17"
                        name="envelope"/>
              </popover>

            </div>
            <div class="f-1 appear-container" v-if="contact.notes && contact.notes.length>0">
              <unicon class="cursor-pointer" :fill="colors.primary" width="17" name="notes"/>
              <div class="position-relatives d-hidden appear">
                <div v-html="lineBreaks(contact.notes)" class="position-absolute bg-white b-rounded-3 p-3 b-1 b-gray-light-25 raise-1-primary font-sm" style="bottom: 40%; right:-5px;left:-5px"></div>
              </div>
            </div>
            <div class="f-1">
              <popover title="Edit contact">
                <unicon class="cursor-pointer" :fill="colors.accent" @click="editContact(contact)" name="edit-alt"/>
              </popover>

            </div>
          </div>

        </div>
      </div>
    </div>
    <modal title="Contact" v-model:is-visible="showModal">
      <client-contact-crud :contact="currentContact"/>
    </modal>
  </div>

</template>

<script>
import WhatsappLink from "@/components/io/WhatsappLink";
import PhoneLink from "@/components/io/PhoneLink";
import Modal from "@/components/Modal";
import ClientContactCrud from "@/components/client/ClientContactCrud";
import colors from "@/utils/colors";
import {ref, watch} from "vue"
import {clientContactStructure} from "@/store/modules/client";
import Popover from "@/components/io/Popover";

export default {
  name: "ClientContacts",
  components: {WhatsappLink, PhoneLink, Modal, ClientContactCrud, Popover},
  props: {
    contacts: Array
  },
  setup({contacts}) {
    const filter = ref('')
    const filteredContacts = ref([...contacts])
    const currentContact = ref({...clientContactStructure})
    const showModal = ref(false);
    watch(filter, () => {
      filteredContacts.value = contacts.filter(x => {
        return (`${x.first_name} ${x.last_name}`).toLowerCase().includes(filter.value.toLowerCase()) || (x.notes && x.notes.toLowerCase().includes(filter.value.toLowerCase()))
      })
    })

    function mail(email) {
      window.open('mailto:' + email);
    }

    function editContact(selectedContact) {
      if(selectedContact){
        currentContact.value = {...selectedContact}
      } else {
        currentContact.value = {...clientContactStructure}
      }
      showModal.value = true;
    }
    function lineBreaks(content){
      return content.replace(/\n/m, '<br>')
    }

    return {colors, mail, filter, filteredContacts, editContact, currentContact, showModal, lineBreaks}
  }
}
</script>

<style scoped>
.appear-container:hover > .appear{
  display: block;
}
</style>