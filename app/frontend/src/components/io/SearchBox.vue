<template>
  <div>
    <div class="input">
      <input :placeholder="label" :required="required" type="text" autocomplete="off" v-model="input" @keydown.down="selected++" @keydown.up="selected--" @keydown.enter="select">
      <label>{{label}}</label>
      <div v-if="input.length>0" class="position-absolute m-2 cursor-pointer" style="right: 0" @click="input=''; results=[]; lockedIn = null">
        <unicon name="times-circle" icon-style="solid" :fill="colors.warning"/>
      </div>

    </div>
    <div v-for="(result,i) in results" class="b-1 b-rounded b-gray-25 position-relative m-b-1" :class="{'bg-primary text-white grow':i===selected}" style="top: -.5rem" @click="selected=i;select()">
      <div class="p-2" >{{result[resultTitle]}}</div>
    </div>
  </div>

</template>

<script>
import debounce from "@/utils/debounce";
import {watch, ref} from "vue";
import colors from "@/utils/colors";

export default {
  name: "SearchBox",
  props: {
    required: {
      default: false
    },
    searchService: Object,
    resultTitle: {
      type:String,
      default: 'name'
    },
    givenId: String,
    label: {
      type:String,
      default: 'search'
    }
  },
  setup({searchService, givenId, resultTitle},{emit}){
    const input = ref('');
    const results = ref([]);
    const selected = ref(-1);
    const lockedIn = ref(null);

    if(givenId){
      searchService.get(givenId).then(res => {
        lockedIn.value = res;
        input.value = res[resultTitle]
      })
    }

    watch(input, debounce(async function(newVal){
      if(newVal.length>2 && !lockedIn.value){
        results.value = await searchService.find(newVal)
      }
    },300),{immediate:true})
    const select = () => {
      lockedIn.value = results.value[selected.value];
      input.value = results.value[selected.value][resultTitle]
      selected.value = -1;
      results.value = [];

      emit('update:givenId', lockedIn.value.id)
    }
    return {input,results,selected, select, lockedIn, colors}
  },

}
</script>
