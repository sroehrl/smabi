<template>
<div class="p-5">
  <div class="container d-flex">
    <search-box @update:given-id="navigate" class="f-1" label="Search products" :search-service="productService"/>
    <div class="m-l-2 m-t-6">
      <router-link to="/product">
        <button class="btn-primary" >+</button>
      </router-link>

    </div>
  </div>
  <div class="grid-3-3-3-3 p-2 b-1 b-rounded m-y-1 b-gray-light-25" v-for="product in $store.state.Product.products">
    <div class="b-r-1 b-gray-light-25 place-y-center">{{product.product_number || '-'}}</div>
    <div class="b-r-1 b-gray-light-25 place-y-center p-l-3">{{product.name}}</div>
    <div class="b-r-1 b-gray-light-25 place-y-center p-l-3">{{product.category || '-'}}</div>
    <div class="p-l-3">
      <router-link :to="'/product/'+product.id" >
        <button class="btn-accent">open</button>
      </router-link>
    </div>
  </div>
  <modal v-model:is-visible="showModal">

  </modal>
</div>
</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";
import SearchBox from "@/components/io/SearchBox";
import productService from "@/services/productService";

import Modal from "@/components/Modal";
import {useRouter} from "vue-router";

export default {
  name: "Products",
  components: {
    Modal,
    SearchBox
  },
  setup(){
    const $store = useStore();
    const router = useRouter();
    const showModal = ref(false)
    function fetch(){
      $store.dispatch('getPaginatedProducts');
      showModal.value = false;
    }
    fetch();

    function navigate(ev){
      router.push('/product/'+ev)
    }

    return {showModal, fetch, productService, navigate}
  }
}
</script>

<style scoped>

</style>