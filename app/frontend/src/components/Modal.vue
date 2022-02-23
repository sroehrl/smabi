<template>
  <div class="backdrop" style="z-index:9" v-if="isVisible">
    <div class="modal-box">
      <slot name="header">
        <div class="d-flex bg-primary p-y-2 p-x-4">
          <h3 class=" f-1 text-white font-md">{{title}}</h3>
          <div class="grid">
            <button class="btn-warning place-y-center" @click="$emit('update:isVisible', false)">close</button>
          </div>
        </div>
      </slot>

      <div class="modal-content">
        <slot></slot>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props:{
    isVisible: Boolean,
    title: {
      type: String,
      default: 'Interaction'
    }
  }
}
</script>

<style scoped>

</style>