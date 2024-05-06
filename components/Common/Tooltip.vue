<template>
 
<div class="tooltip">
  <span class="tooltiptext text-xs">{{text}}</span>
</div>
</template>
<script setup>
const props = defineProps({
    text:{
        type:String,
        default:''
    }
})
</script>
<style>

 .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: rgba(0, 0, 0, 0.664);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  top: -10px;
  z-index: 1;
}


</style>