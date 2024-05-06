<template lang="">
  <div class="IconTitle flex algin-items-center cursor-pointer w-max">
    <i
      v-if="icon_place == 'left'"
      :class="icon"
      :style="{
        transform: `translate(${icon_x}, ${icon_y})`,
        color: icon_color,
        'font-size': icon_font_size
      }"
    ></i>
    <span class="ml-2" :class="text_class" :style="text_style">{{ text }}</span>
    <i
      v-if="icon_place == 'right'"
      :class="icon"
      :style="{
        transform: `translate(${icon_x}, ${icon_y})`,
        color: icon_color,
      }"
    ></i>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Text",
    },

    text_class: {
      type: String,
      default: "",
    },

    text_style: {
      type: String,
      default: "",
    },

    
    icon: {
      type: String,
      default: "pi pi-arrow-left",
    },

    icon_font_size:{
      type: String,
      default: "1rem",
    },


    icon_color: {
      type: String,
      default: "#2C3E50",
    },

    icon_place: {
      type: String,
      default: "left",
    },

    icon_x: {
      type: String,
      default: "2px",
    },
    icon_y: {
      type: String,
      default: "5px",
    },
  },
  computed(){

  }
};
</script>
<style lang="scss">

</style>
