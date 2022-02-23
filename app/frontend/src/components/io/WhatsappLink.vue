<template>
  <unicon class="cursor-pointer" :fill="colors.primary" @click="call" width="17" name="whatsapp"/>
</template>

<script >
import colors from "@/utils/colors";
export default {
  name: "WhatsappLink",
  props:{
    number: String
  },
  setup({number}){
    const base = 'https://api.whatsapp.com/send?phone='
    function call(){
      window.open(base+number)
    }
    return {call, colors}
  }
}
</script>

<style scoped>

</style>