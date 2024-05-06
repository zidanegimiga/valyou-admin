<!-- i add some Features -->

<template lang="">
  <div :style='{"min-width":min_width,"height":height}' class="datepicker_custom simple__input_wrap flex align-items-center justify-content-between ">
    <!-- span => date -? -->
    <span class="ml-2 gray_text font-bold w-max">{{placeholder}}</span>

    <Calendar v-if="inherent_attrs" v-bind="$attrs" class="font-bold" style="flex-grow: 1" v-model="value"  selectionMode="range" :manualInput="false" dateFormat="yy/MM/dd"/>
    <Calendar v-else class="font-bold" style="flex-grow: 1" v-model="value"  selectionMode="range" :manualInput="false" dateFormat="yy/MM/dd"/>
    <i class="pi pi-calendar mr-3"></i>
  </div>
</template>


<script setup>
import Calendar from "primevue/calendar";
import { ref, computed } from "vue";

const props = defineProps({
  placeholder:{
    type: String,
    default: 'Date'
  },
  modelValue: {
    default: "",
  },

  inherent_attrs:{
    type:Boolean,
    default:false
  },

  min_width:{
    type:String,
    default:"170px"
  },

  height:{
    type:String,
    default:'35.2px',
  }
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style lang="scss">
.simple__input_wrap {
  p {
    font-size: 0.85rem;
    font-weight: 300;
    padding-bottom: 0.4rem;
    // padding-left: 0.4rem;
    position: relative;
    color: #000;
  }
  .p-inputtext {
    padding: 0.5rem;
    font-size: 0.9rem;
    background: transparent;
    width: 100%;
  }
}
// BREDER REMOVED
.datepicker_custom.simple__input_wrap.flex.align-items-center {
  border: 1px solid #e0e5ee;
  border-radius: 7px;
}
.datepicker_custom {
  input.p-inputtext.p-component {
    border: 0;
  }
  i{
    color: #0A94FF; 
    // transform: translate(10px, 0px);
  }
}
</style>
