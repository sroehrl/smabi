<template>
<div class="p-5">
  <h3>{{currentProduct.name}}</h3>
</div>
</template>

<script>
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {ref} from "vue";

export default {
  name: "Product",
  setup(){
    const route = useRoute();
    const $store = useStore();
    const currentProduct = ref({})
    $store.dispatch('setCurrentProductById', route.params.id).then(()=>{
      currentProduct.value = {...$store.state.Product.currentProduct};
    })
    return {currentProduct}
  }
}
</script>

<style scoped>

</style>