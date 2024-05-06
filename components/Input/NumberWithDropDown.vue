<template>
    <div class="input-component">
      <InputNumber v-model="value" mode="decimal" :minFractionDigits="2" class="number-input" :placeholder="placeholder != '' ?placeholder:numberPlaceholder" />
      <Dropdown v-model="selectedUnit" :options="options" class="unit-dropdown" :placeholder="dropdownPlaceholder" />
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watchEffect } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default:["cm"],
    validator: (value) => {
      if (value.length === 0) {
        console.error('Error: options array cannot be empty.')
        return false
      }
      return true
    }
  },
  numberPlaceholder: {
    type: String,
    default: 'Enter value'
  },
  dropdownPlaceholder: {
    type: String,
    default: 'Select unit'
  },
  placeholder:{
    type: String,
    default: ''
  },

  modelValue: {
    type: Number,
    default: null,
  },
  selectedUnitModel: {
    type: String,
    required: true
  }
})

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const emits = defineEmits(['update:modelValue', 'update:selectedUnitModel'])

const selectedUnit = ref(props.selectedUnitModel)
const selectedUnit_computed = computed(()=>props.selectedUnitModel);

watch(selectedUnit_computed, (newVal)=>{
  selectedUnit.value = newVal;
  emits('update:selectedUnitModel', selectedUnit.value)
})

watchEffect(() => {
  emits('update:modelValue', value.value)
  emits('update:selectedUnitModel', selectedUnit.value)
});

watch(value, ()=>{
    emits('update:modelValue', value.value);
});




onMounted(()=>{
  console.log("props.selectedUnitModel:",selectedUnit_computed);
if(!(selectedUnit_computed.value)){
    selectedUnit.value = props.options[0];
  }
});
</script>

<style lang="scss">
.input-component {
  display: flex;
  gap: 10px;
  border: 1px solid #e4e8f0 !important;
  border-radius: 5px;

  input.p-inputtext.p-component.p-inputnumber-input {
  border: 0;
}
}

.number-input,
.unit-dropdown {
  border: none !important;
}

.input-component.p-invalid {
    border: 1px solid #f3654a !important;
}
</style>
