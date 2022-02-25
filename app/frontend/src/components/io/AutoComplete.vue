<template>
  <div>
    <div class="input">
      <input @click="isFocused=true" @blur="delayedUnfocus" ref="inputField" type="text" v-model="filter"
             :placeholder="label" :required="required" autocomplete="off"
             @keydown.down="selected++" @keydown.up="selected--" @keydown.enter.prevent="select">
      <label>{{ label }} </label>
      <div v-if="filter.length>0" class="position-absolute m-2 cursor-pointer" style="right: 0"
           @click="filter=''; lockedIn=null">
        <unicon name="times-circle" icon-style="solid" :fill="colors.warning"/>
      </div>
    </div>
    <div v-if="filter.length>0||isFocused" v-for="(option,i) in filteredOptions"
         class="b-1 b-rounded b-gray-25 position-relative m-b-1 cursor-pointer"
         :class="{'bg-primary text-white grow':i===selected}" style="top: -.5rem" @click="selected=i;select()">
      <div class="p-2">{{ option[resultTitle] }}</div>
    </div>
  </div>

</template>

<script>
import {ref, watch} from "vue";
import colors from "@/utils/colors";

export default {
  name: "AutoComplete",
  props: {
    options: {
      type: Array,
      default: []
    },
    resultTitle: {
      type: String,
      default: 'name'
    },
    label: {
      type: String,
      default: 'Select'
    },
    required: {
      default: false
    },
    allowNewEntry: {
      type: Boolean,
      default: false
    },
    givenId: {
      type: String,
      default: null
    }
  },
  setup({options, resultTitle, givenId, allowNewEntry}, {emit}) {
    const filter = ref('')
    const selected = ref(-1);
    const filteredOptions = ref([])
    const lockedIn = ref(null);
    const inputField = ref(null);
    const isFocused = ref(false);

    const delayedUnfocus = () => setTimeout(() => {
          isFocused.value = false;
          if(allowNewEntry){
            emit('update:givenId', filter.value.id)
          }
        }, 100)


    watch(options, (val) => {
      setFilteredOptions();
    })

    function setFilteredOptions() {
      if (options) {
        filteredOptions.value = [...options];
      }
    }

    setFilteredOptions();

    function setFilter() {
      if (givenId !== null && filteredOptions) {
        filter.value = filteredOptions.value.find(x => x.id === givenId)[resultTitle]
        filteredOptions.value = [];
      }
    }

    setFilter();
    watch(()=>givenId, () => setFilter())
    const select = () => {
      lockedIn.value = filteredOptions.value[selected.value];
      filter.value = filteredOptions.value[selected.value][resultTitle]
      selected.value = -1;
      filteredOptions.value = [];
      emit('update:givenId', lockedIn.value.id)
    }
    watch(filter, () => {
      if (options && !lockedIn.value) {
        filteredOptions.value = options?.filter(x => x[resultTitle].toLowerCase().includes(filter.value.toLowerCase()))
      }

    })
    return {filter, selected, select, filteredOptions, lockedIn, inputField, isFocused, delayedUnfocus, colors}
  }
}
</script>

<style scoped>

</style>