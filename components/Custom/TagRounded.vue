<template lang="">
    <div class="custom_tag" :style="{background: computeBg}">
      <span :style="{color: color }" >
      {{ value }}
    </span>
    </div>
  
  </template>
  <script>
  export default {
    props: {
      value: {
        default: "Title",
  
        required: true,
  
        type: String,
      },
  
      color: {
        default: "#0A94FF",
  
        type: String,
      },
    },
  
    computed: {
      computeBg() {
        return this.color + 20;
      },
    },
  };
  </script>
  
  <style lang="scss">
  .custom_tag {
    padding: 0.5rem 0;
    text-align: center;
    border-radius: 100px;
    width: 85px !important;
    span{
      letter-spacing: 0.05rem !important;
      text-transform: capitalize !important;
      font-weight: 500 !important;
      font-size: 0.7rem !important;
    }
  }
  </style>
  