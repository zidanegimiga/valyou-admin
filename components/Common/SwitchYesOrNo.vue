<script setup>
const props = defineProps({
    modelValue : {
        type:Boolean
    }
})
const emits = defineEmits(['update:modelValue'])
</script>
<template>
  <div class="flex gap-2">
    <span
      class="py-2 px-4  block border-round-md cursor-pointer"
      :class="[
        modelValue !== false
          ? 'bg-primary-600 border-none text-white'
          : 'bg-white border-gray-400 border-1 text-black',
      ]"
      @click="$emit('update:modelValue' , true)"
      >Yes</span
    >
    <span
      class="py-2 px-4 block border-round-md cursor-pointer"
      :class="[
        !modelValue
          ? 'bg-primary-600 border-primary-400 text-white'
          : 'bg-white border-gray-400 border-1 text-black',
      ]"
      @click="$emit('update:modelValue' , false)"
      >No</span
    >
  </div>
</template>
