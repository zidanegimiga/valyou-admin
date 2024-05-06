<template lang="">
    <div class="chip_tag" :style="{background: computeBg}">
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
  .chip_tag {
    padding: 0 0 !important;
    text-align: center !important;
    border-radius: 100px;
    width: 60px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    span{
      letter-spacing: 0.05rem !important;
      text-transform: capitalize !important;
      font-weight: 500 !important;
      font-size: 0.625rem !important;
      padding: 1px !important;
      
    }
  }
  </style>
  