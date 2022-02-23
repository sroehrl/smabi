<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

  </div>
</template>

<script>
// @ is an alias to /src
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc'
export default {
  name: 'Home',
  async mounted(){
    dayjs.extend(dayjsPluginUTC)
    const d = dayjs()
    console.log('d', d.utc().format())
    // this.$notification({text:'Wirklich'}).then(()=> alert('confirmed'))
  }
}
</script>
