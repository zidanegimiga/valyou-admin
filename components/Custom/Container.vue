<template lang="">
    <div class="cic__input_wrap">
      <p class="custom_text small__text font-medium">{{label}}</p>
      <slot>
      </slot>
    </div>
  </template>
  <script>
  export default {
    name: "Container",
    props:{
      label:{
        type:String,
        default:'This is label'
      }
    }
  };
  </script>
  <style lang="scss">
  .cic__input_wrap {
    p {
      // font-size: 0.85rem;
      // font-weight: 500;
      padding-bottom: 0.1rem !important;
    }
  }
  </style>
  