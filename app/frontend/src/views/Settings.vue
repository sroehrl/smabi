<template>
<div class="p-5">
  <tabs :options="tabOptions" v-model:active-key="activeTab"/>
  <invoicing-crud v-if="activeTab===3"/>
</div>
</template>

<script>
import {ref, watch} from 'vue';
import {useRoute} from "vue-router";
import Tabs from "@/components/Tabs";
import InvoicingCrud from "@/components/settings/InvoicingCrud";
export default {
  name: "Settings",
  components: {Tabs, InvoicingCrud},
  setup(){
    const activeTab = ref(0);
    const tabOptions = ref(['Account','Emailing', 'Payment','Invoicing','Integrations','Templates'])
    const route = useRoute();

    const setTab = () => {
      if(route.params.tab){
        activeTab.value = tabOptions.value.findIndex(x => x.toLowerCase() === route.params.tab[0]);
      }
    }
    setTab();
    watch(()=>route.params.tab, setTab)

    return {activeTab, tabOptions}
  }
}
</script>

<style scoped>

</style>