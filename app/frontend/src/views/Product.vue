<template>
<div class="p-5">
  <h3 class="font-center">Product: {{currentProduct && currentProduct.name.length>0 ? currentProduct.name : 'New Product'}}</h3>
  <form @submit.prevent="save" class="container" v-if="currentProduct">
    <div class="grid-8-4">
      <div class="p-r-2">
        <div class="input">
          <input required type="text" placeholder="Title" minlength="4" v-model="currentProduct.name" />
          <label>Title</label>
          <div class="input-error">Product must have a title</div>
        </div>
      </div>
      <div class="p-l-2">
        <div class="input">
          <input required type="text" placeholder="Product Number" v-model="currentProduct.product_number" />
          <label>Product Number</label>
          <div class="input-error">Product must have a title</div>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="input">
        <textarea rows="6" placeholder="Product description" v-model="currentProduct.description" ></textarea>
        <label>Product description</label>
      </div>
    </div>
    <div class="grid-6-6 md:grid-3-3-3-3">
      <div class="p-r-2">
        <auto-complete v-if="loaded === 2" :allow-new-entry="true" result-title="category" :required="true" label="Product Category" v-model:given-id="currentProduct.category" :options="categoryOptions"/>
      </div>
      <div class="p-r-2 md:p-l-2">
        <auto-complete v-if="loaded === 2" :required="true" label="Charge Type" v-model:given-id="currentProduct.item_type" :options="itemTypes"/>
      </div>
      <div class="p-r-2 md:p-l-2">
        <div class="input">
          <input type="number" step="0.01" v-model="currentProduct.price" placeholder="Price" required>
          <label>Price</label>
          <div class="input-error">Price is required</div>
        </div>
      </div>
      <div class="md:p-l-2">
        <div class="input">
          <input type="number" step="0.1" v-model="currentProduct.sales_tax" placeholder="Sales Tax %">
          <label>Sales Tax %</label>
        </div>
      </div>
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
</div>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {ref, inject} from "vue";
import AutoComplete from "@/components/io/AutoComplete";
import Api from "@/services/api";
import {productStructure} from "@/store/modules/product";

export default {
  name: "Product",
  components: {AutoComplete},
  setup(){
    const notification = inject('notification');
    const route = useRoute();
    const router = useRouter();
    const $store = useStore();
    const currentProduct = ref({...productStructure})
    const loaded = ref(0);
    const itemTypes = ref([
      {id:'hour',name:'Per hour'},
      {id:'fixed',name:'Fixed price'},
      {id:'piece',name:'Per piece'},
    ])
    if(route.params.id){
      $store.dispatch('setCurrentProductById', route.params.id).then(()=>{
        currentProduct.value = {...$store.state.Product.currentProduct};
        loaded.value++;
      })
    } else {
      loaded.value++;
    }

    const categoryOptions = ref([]);
    Api.get('/category').then(res => {
      categoryOptions.value = res.data;
      loaded.value++;
    })
    async function save(){
      await $store.dispatch('storeProduct', currentProduct.value)
      notification({text:'Product saved', type:'toast'})
    }
    function remove(){
      const text = 'Are you sure? <br>(Related documents will stay untouched)'
      notification({text}).then(async ()=>{
        await $store.dispatch('storeProduct', {...currentProduct.value, delete_date: '.'});
        router.push('/products');
      })
    }

    return {currentProduct, categoryOptions, itemTypes, loaded, save, remove}
  }
}
</script>

<style scoped>

</style>