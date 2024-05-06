<template lang="">
    
    <span :style="{ background: computeBg, color: color }" class="custom_tag">
      {{ value }}
    </span>
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
        default: "#72C7FF",
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
    padding: 0.3rem 0.7rem;
    text-align: center;
    font-size: 0.6rem !important;
    text-transform: capitalize !important;
    letter-spacing: 0.05rem !important;
    border-radius: 10px;
    font-weight: 500 !important;
    // min-width: 70px !important;
  }
  </style>
  