<!-- for get radio button fit the ui -->

<template lang="">
  <div class="flex align-items-center cursor-pointer">
    
    <input ref="radio" v-model="value"  :id="_id"  type="radio" v-bind="$attrs" >
    <label :for="_id" class="ml-2 cursor-pointer">{{ label }}</label>
    
  </div>
</template>

<script setup>
function generateRandomId() {
  return Math.floor(Math.random() * Date.now()).toString(16);
}
const _id = computed(() => generateRandomId());

// Reference to the RadioButton component
const radio = ref(null);

</script>

<script>
export default {
  props: {
    modelValue: {
      default: "",
    },

    label: {
      type: String,
      default: "Some Text",
    },
  },
  emits: ["update:modelValue"],
  computed: {
    // Create a two-way binding for modelValue
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
