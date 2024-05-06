<template lang="">
    <div class="simple__input_wrap">
      <p class=" black_text font-medium mb-1 "  >{{label}}</p>
      <Textarea variant="outlined" :placeholder="placeholder" :name="label" v-model="value" />
    </div>
  </template>
  <script>
  export default {
    name:"TextInput",
    props:{
      label:{
        default:"This is your label",
        type:String,
      },
      placeholder:{
        default:"Enter your text",
        type:String,
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
    .simple__input_wrap{
      p{
        font-size: 0.85rem;
        font-weight: 300;
        padding-bottom: 0.4rem;
        // padding-left: 0.4rem;
        position: relative;
  
      }
      .p-inputtext{
        padding: 0.5rem;
        font-size: 0.9rem;
        background: transparent;
        width: 100%;
      }
    }
  </style>