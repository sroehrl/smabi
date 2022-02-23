<template>
<div class="popover position-relative" style="white-space: nowrap" @mouseover="toggle=true" @mouseleave="toggle=false">
  <div :class="{'d-hidden':!toggle}" class="position-absolute bg-primary-light-90 text-white b-1 b-rounded b-gr p-x-2 p-y-0 b-r-0" ref="popover" :style="positionStyle">{{title}}</div>
  <slot></slot>
</div>
</template>

<script>
import {ref, watch} from "vue";

export default {
  name: "Popover",
  props: {
    title: String
  },
  setup({title}){
    const popover = ref();
    const positionStyle = ref({
      bottom: '2.1rem',
      right: '-.25rem'
    })
    const toggle = ref(false);

    return {popover, positionStyle, toggle}
  }
}
</script>

<style scoped>


</style>