<template>
  <div class="container">
    <form @submit.prevent="store">
      <div class="grid-6-6" v-if="settingsObject">
        <div class="p-r-2">
          <h3>Runners</h3>
          <div class="input">
            <input type="number" v-model="settingsObject.runners.draft" placeholder="Running draft number">
            <label>Running draft number</label>
          </div>
          <div class="input">
            <input type="number" v-model="settingsObject.runners.estimate" placeholder="Running estimate number">
            <label>Running estimate number</label>
          </div>
          <div class="input">
            <input type="number" v-model="settingsObject.runners.invoice" placeholder="Running invoice number">
            <label>Running invoice number</label>
          </div>
        </div>
        <div class="p-l-2">
          <h3>Format</h3>
          <div class="input">
            <input type="text" v-model="settingsObject.format" placeholder="Generator format">
            <label>Generator format</label>
          </div>
          <h3>Example</h3>
          <div class="d-flex">
            <div class="f-1">
              <label>
                <input type="radio" value="draft" v-model="previewType">
                Draft</label>
            </div>
            <div class="f-1">
              <label>
                <input type="radio" value="estimate" v-model="previewType">
                Estimate</label>
            </div>
            <div class="f-1">
              <label>
                <input type="radio" value="invoice" v-model="previewType">
                Invoice
              </label>
            </div>
          </div>


          <p class="font-center"><strong>{{ $store.getters.getInvoicingSuggestion(previewType) }}</strong></p>
        </div>

      </div>
      <div class="grid">
        <div class="place-x-end">
          <button class="btn-primary" type="submit">save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {ref} from 'vue';

export default {
  name: "InvoicingCrud",
  setup() {
    const store = useStore();
    const settingsObject = ref(null);
    const previewType = ref('draft')
    store.dispatch('getInvoicingSettings').then(() => {
      settingsObject.value = store.state.Settings.invoicing.object;
    })
    return {store, settingsObject, previewType}
  }
}
</script>

<style scoped>

</style>