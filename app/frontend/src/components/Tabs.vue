<template>
<div class="b-b-1 b-b-gray-light-25 m-y-5 d-flex">
  <div @click="$emit('update:activeKey', i)" class="f-1 font-center cursor-pointer" :class="{'b-b-2 b-primary font-strong':i === activeKey}" v-for="(option,i) in options">{{option}}</div>

</div>
</template>

<script>
export default {
  name: "Tabs",
  props:{
    options: {
      type: Array,
      default: []
    },
    activeKey: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

</style>