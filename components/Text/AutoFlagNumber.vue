<template lang="">
  
    <vue-tel-input
      
      disabled
      v-model="value"
      :preferredCountries="['AE']"
      :enabledCountryCode="true"
      :defaultCountry="'AE'"
      :selectedCountryCode="true"
      autocomplete="off"
      name="telephone"
      wrapperClasses="m-4 p-4"
      inputClasses="min-w-min"
      :maxLen="25"
      :disabledFetchingCountry="false"
      :disabled="false"
      :disabledFormatting="false"
      :placeholder="'Enter a phone number'"

      mode="international"
      :inputOptions="{
        showDialCode: true,
      }"
      class="vue-tel-input disabled"

      v-bind="$attrs" 
    />
  
</template>
<script setup>
import "vue-tel-input/vue-tel-input.css";
import { ref } from 'vue';

let modelValue = ref(null);

const value = {
  get: () => modelValue.value,
  set: (value) => (modelValue.value = value)
};

defineEmits(['update:modelValue']);

const props = defineProps({
  gap:{
    type:[String],
    default: ""
  }
})


</script>
<style lang="scss" >
.vue-tel-input {
  border: 0 !important;


  span.vti__dropdown-arrow {
    display: none;
  }

  .vti__input{
    // padding: ;
    padding-left: v-bind('gap ? gap : "7px"');


  }

  .vti__input:disabled{
    pointer-events: visible;
    font-weight: 500;
    color: #000;
    cursor: text;
  }

  

  
}

.vue-tel-input.disabled .selection, .vue-tel-input.disabled .dropdown, .vue-tel-input.disabled input{
    background: #006eff00!important;
  }

.disabled {
    background: transparent;
    color: unset;
    border-color: unset;
    cursor: not-allowed !important;
    opacity: unset ;
    pointer-events: none;
  }
</style>
