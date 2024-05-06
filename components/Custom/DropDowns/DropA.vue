<template lang="">
  <Dropdown v-model="value" v-bind="$attrs" >
    <template #value="slotProps">
      <div class="grid grid-nogutter p-0">
        <div class="col-6">
          <span class="mr-1 font-size-small gray_text">{{placeholder}}</span>
          <!-- <span v-if="$attrs.optionValue" class="font-size-small" style="color: black">{{slotProps.value}}</span> -->
          <span v-if="$attrs.optionValue" class="font-size-small" style="color: black">{{$attrs?.options.find(item => item.id === value)?.label == undefined ? slotProps.value :$attrs?.options.find(item => item.id === value)?.label}}</span>
          <span v-else class="font-size-small" style="color: black">{{slotProps.value}}</span>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script setup>
defineProps({
    modelValue:{
        default:''
    },
  placeholder: {
    type: String,
    default: "Placeholder",
  },
});
</script>


<script>
export default {
    emits: ['update:modelValue'],
    computed: {
        // Create a two-way binding for modelValue
        value: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    },
}

</script>

<style lang=""></style>
