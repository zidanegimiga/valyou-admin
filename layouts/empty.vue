<template lang="">
  <div class="layout__wrap">
    <slot />
  </div>
</template>
<script>
export default {
  name: "empty",
};
</script>
<style lang="scss">
.layout__wrap {
  background: #f4f5f6 !important;
}
</style>
