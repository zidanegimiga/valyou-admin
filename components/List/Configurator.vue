<template lang="">
    <div class="li__wrap cursor-pointer" :class="{ active_secondary: is_active }">
      <img alt="svg" :src="image" />
      <div class="li__text_wrap">
        <h2 class="custom_color">{{ title }}</h2>
      </div>
    </div>
  </template>
  <script setup>
  defineProps({
    image: {
      default: "",
      type: String,
    },
   
    title: {
      default:"Samsung Electronics",
      type: String,
    },
    is_active: {
      default: false,
      type: Boolean,
    },
  });
  </script>
  <style lang="scss">
  .li__wrap {
    display: grid;
    padding: 0.9rem;
    border-radius: 10px;
    grid-template-columns: 37px 1fr 20px;
    column-gap: 1rem !important;
    align-items: center;
    .p-avatar {
      width: 37px !important;
      height: 37px !important;
      object-fit: contain;
    }
   
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: -0.3rem;
      right: 0.4rem;
      width: 84%;
      height: 1px;
      border-radius: 2px;
      background: #f2efef;
    }
    &.active_secondary {
      &::after {
        content: none;
      }
    }
  }
  .li__text_wrap {
    h2 {
      line-height: 1.25;
      font-size: 0.82rem !important;
      font-weight: 500;
      letter-spacing: 0rem !important;
      text-transform: capitalize !important;
      
    }
    
  }
  </style>
  