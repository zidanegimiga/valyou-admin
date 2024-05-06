<template lang="">
  <div class="cic__input_wrap">
    <p class=" font-medium mb-1 black_text " v-if="label">
      {{label}}
      <span
                class=" font-size-small p-error p-min-error"
                v-if="validationError"
                style="display: inline-block;
    transform: scale(.9) translate(0px, 1px);"
                >{{
                  useRegexUnderScore(validationError) ||
                  "&nbsp;"
                }}</span
              >
    </p>
    
    <slot>
    </slot>
  </div>
</template>
<script>
import { useRegexUnderScore } from "@/composables/regex";
export default {
  name: "CustomInputContainer",
  props:{
    label:{
      type:String,
      default:'This is label'
    },

    validationError:{
      default:""
    }
  }
};
</script>
<style lang="scss">
.cic__input_wrap {
  p {
    font-size: 0.85rem;
    font-weight: 300;
    padding-bottom: 0.4rem;
  }
}
</style>
