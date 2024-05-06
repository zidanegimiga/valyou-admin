<template lang="">
  <h4 class="IconTitleV2 flex align-items-center font-bold cursor-pointer">
    <i
      v-if="icon_place == 'left'"
      class="mr-2"
      :class="icon"
      :style="{
        transform: `translate(${icon_x}, ${icon_y}) scale(1.1)`,
        color: icon_color,
        'font-size': $attrs?.style ? $attrs?.style?.['font-size'] : icon_font_size
      }"
    ></i>
    {{label}}

    <i
      v-if="icon_place == 'right'"
      class="ml-2"
      :class="icon"
      :style="{
        transform: `translate(${icon_x}, ${icon_y})`,
        color: icon_color,
      }"
    ></i>
  </h4>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Text",
  },

  label_class: {
    type: String,
    default: "",
  },

  label_style: {
    type: String,
    default: "",
  },

  icon: {
    type: String,
    default: "pi pi-arrow-left",
  },

  icon_font_size: {
    type: String,
    default: "1rem",
  },

  icon_color: {
    type: String,
    default: "#2C3E50",
  },

  icon_place: {
    type: String,
    default: "left", // left | right
  },

  icon_x: {
    type: String,
    default: "0px",
  },
  icon_y: {
    type: String,
    default: "0px",
  },
})
</script>

<style lang="scss"></style>
