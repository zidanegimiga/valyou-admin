<template lang="">
    <Paginator v-bind="$attrs" :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]" />

</template>
<script setup>


const props = defineProps({

  modelValue: {
    default: "",
  },


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
<style lang="">
    
</style>