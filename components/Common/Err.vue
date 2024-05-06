<template>
  <small
    class="p-error p-min-error"
    id="security_deposit-error"
    >
    {{error}}
    </small
  >
</template>
<script setup>
const props = defineProps({
    error:{
        type:Boolean,
        default:''
    }
})
</script>
