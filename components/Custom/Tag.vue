<template lang="">
  <div class="custom_tag" :style="{background: computeBg}">
    <span :style="{color: color }" class="font-extraBold" >
    {{ value === 'TO DO' ? 'UpComing' : value === 'Pending Log' ? 'Pending': value ? value:''  }}
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
  padding: 0.3rem 0;
  text-align: center;
  border-radius: 10px;
  width: 100px !important;
  span{
    letter-spacing: 0.05rem !important;
    text-transform: uppercase !important;
    font-size: 0.7rem !important;
  }
}
</style>
