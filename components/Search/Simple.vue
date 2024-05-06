<template lang="">
  <span class="p-input-icon-left custom_search">
    <i class="pi pi-search" />
    <InputText v-model="value" :placeholder="placeholder" />
  </span>
</template>
<script>
import debounce from 'lodash.debounce'

export default {
  name: "SimpleSearch",
  props: {
    placeholder: {
      default: "Search your debounced value",
      type: String,
    },
    modelValue: {
      default: "",
    },
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.debounceSetValue(value)
      },
    },
  },
  methods:{
    debounceSetValue: debounce(function (value) {
      this.$emit("update:modelValue", value);
    }, 450),
  }
  
};
</script>
<style lang="scss"></style>
