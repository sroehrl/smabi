<template>
<div class="p-5">
  <div class="grid-3-3-3-3 p-2 b-1 b-rounded m-y-1 b-gray-light-25" v-for="product in $store.state.Product.products">
    <div class="b-r-1 b-gray-light-25 place-y-center">{{product.product_number}}</div>
    <div class="b-r-1 b-gray-light-25 place-y-center p-l-3">{{product.name}}</div>
    <div class="b-r-1 b-gray-light-25 place-y-center p-l-3">{{product.category}}</div>
    <div class="p-l-3">
      <router-link :to="'/product/'+product.id" >
        <button class="btn-accent">open</button></router-link>
    </div>
  </div>
  <modal v-model:is-visible="showModal">

  </modal>
</div>
</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";
import Modal from "@/components/Modal";

export default {
  name: "Products",
  components: {
    Modal
  },
  setup(){
    const $store = useStore();
    const showModal = ref(false)
    function fetch(){
      $store.dispatch('getPaginatedProducts');
      showModal.value = false;
    }
    fetch();

    return {showModal, fetch}
  }
}
</script>

<style scoped>

</style>