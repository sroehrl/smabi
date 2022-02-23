<template>
  <unicon class="cursor-pointer" :fill="colors.primary" @click="call" width="17" name="outgoing-call"/>
</template>

<script>
import colors from "@/utils/colors";
export default {
  name: "PhoneLink",
  props:{
    number: String
  },
  setup({number}){
    console.log('nu', number)
    function call(){
      window.open('tel:'+number)
    }
    return {call, colors}
  }
}
</script>

<style scoped>

</style>