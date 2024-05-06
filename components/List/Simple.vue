<template lang="">
  <div class="simple__list_wrap">
    <div class="sl__category_text">{{category_text}}</div>
    <div class="sl__text">
      <slot name="content">
        {{text}}
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name:"SimpleList",
  props:{
    category_text:{
      default:"Category",
      type:String,
      required:true
    },
    text:{
      default:"",
    }
  }
}
</script>
<style lang="scss">
  .simple__list_wrap{
    display: grid;
    grid-template-columns: 0.4fr 1fr;
    column-gap: 10px;
    border-bottom: 1px solid #f0f0f0;
    padding: 1.28rem;
    padding-left: 0rem;
  }
  .sl__category_text{
    color:#8D98A9;
    text-transform: capitalize;
    font-size: 0.725rem;
    font-weight: 500;
    letter-spacing: -0.42px !important;
  }
  .sl__text{
    color:#000;
    font-weight: 600;
    font-size: 0.725rem;
  }
</style>