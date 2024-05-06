<!-- component for label check box -->

<template>
  <div class="NCheckBox flex align-items-center cursor-pointer" >
    <Checkbox ref="checkbox" v-model="value" :inputId="id" v-bind="$attrs" :binary="true"  />
    <label :for="id" class="ml-2 cursor-pointer"  :class="label_class">{{ label }}</label>
  </div>
</template>

<script>
import { ref, computed, withDefaults } from 'vue';

export default {
  name:"NCheckBox",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: "Some Text",
    },

    label_class:{
      type:String,
      default:""
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);

    function generateRandomId() {
      return Math.floor(Math.random() * Date.now()).toString(16);
    }

    const id = computed(() => generateRandomId()); // Changed _id to id

    // Reference to the CheckBoxButton component
    const checkbox = ref(null);

     // Create a two-way binding for modelValue
     const value = computed({
      get() {
        return modelValue.value;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    // Function to simulate a click on thesCheckBoxButton component
    const clickCheckBox = () => {
      let new_val =  modelValue.value ;
      console.log("old:", new_val )
      emit('update:modelValue', !new_val);
      value(!new_val)
    };

   

    return {
      id, // Return id so it can be used in the template
      checkbox,
      clickCheckBox,
      value,
    };
  },
};


</script>

<style lang="scss">
.NCheckBox .p-checkbox .p-checkbox-box {
  border-radius: 6px;
}
</style>
