<template>
  <div>
    <h3>{{localProduct.name}}</h3>
  </div>

</template>

<script>
import {ref, watch} from 'vue';
import {productStructure} from "@/store/modules/product";

export default {
  name: "ProductCrud",
  props: {
    product: Object
  },
  setup({product}){
    const localProduct = ref({...productStructure});
    watch(product, () => {
      localProduct.value = {...product}
    })
    return {localProduct}
  }
}
</script>

<style scoped>

</style>