<template lang="">
  <div class="select__input_wrap">
    <p>{{label}}</p>
    <v-select variant="outlined" :placeholder="placeholder" :label="placeholder" single-line v-model="value" :items="items" append-inner-icon="mdi-chevron-down"></v-select>
  </div>
</template>
<script>
export default {
  name:"SelectInput",
  props:{
    label:{
      default:"This is your label",
      type:String,
    },
    placeholder:{
      default:"Enter your text",
      type:String,
    },
    items:{
      type:Array,
      default(){
        return []
      }
    },
    modelValue:{
      default:''
    }
  },
  emits:['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>
<style lang="scss">
  .select__input_wrap{
    p{
      font-size: 0.85rem;
      font-weight: 300;
      padding-bottom: 0.2rem;
      padding-left: 0.4rem;
    }
  }
</style>