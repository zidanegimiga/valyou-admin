<template>
  <div
    class="col-12 flex align-items-center justify-content-between bg_card"
    :style="{ background: bgcolor }"
  >
    <slot name="score_card"> </slot>
    <slot name="score_des"> </slot>
    <div v-if="!status" class="col-12 grid p-0">
      <!-- renew type -->
      <div  class="col-12 grid">
                <div class="col-7 p-0">
                    <span class=" font-bold small__text black_text spacing_none
                     ">Renew type </span>
                </div>
                <div class="col-5 p-0">
                    <span class=" spacing_none font-bold small__text custom_text">Manual</span>
                </div>
      </div>
      <!-- renew date -->
      <div  class="col-12 grid">
                <div class="col-7 p-0">
                    <span class=" font-bold small__text black_text spacing_none
                     ">Renewal Date</span>
                </div>
                <div class="col-5 p-0">
                    <span class=" spacing_none font-bold small__text custom_text">13 May 2023</span>
                </div>
      </div>
      <!-- Payment Type -->
      <div  class="col-12 grid">
                <div class="col-7 p-0">
                    <span class=" font-bold small__text black_text spacing_none
                     ">Payment Type </span>
                </div>
                <div class="col-5 p-0">
                    <span class=" spacing_none font-bold small__text custom_text">Online Payment</span>
                </div>
      </div>
      <!-- Payment Via -->
      <div  class="col-12 grid">
                <div class="col-7 p-0">
                    <span class=" font-bold small__text black_text spacing_none
                     ">Payment Via</span>
                </div>
                <div class="col-5 p-0">
                    <span class=" spacing_none font-bold small__text custom_text">Card ending X563</span>
                </div>
      </div>
      <!-- Previous membership -->
      <div  class="col-12 grid">
                <div class="col-7 p-0">
                    <span class=" font-bold small__text black_text spacing_none
                     ">Previous membership</span>
                </div>
                <div class="col-5 p-0">
                    <span class=" spacing_none font-bold small__text custom_text">Full Week Premium</span>
                </div>
      </div>
      <!-- Invoice -->
      <div  class="col-12 grid">
                <div class="col-7 p-0">
                    <span class=" font-bold small__text black_text spacing_none
                     ">Invoice </span>
                </div>
                <div class="col-5 p-0">
                    <span class=" spacing_none font-bold small__text custom_text">INV-565</span>
                </div>
      </div>
    </div>
    
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
const props = defineProps({
  bgcolor: {
    default: "#000000",
    type: String,
  },
  status: {
    default: "",
    type: Boolean,
  },
})
</script>
<style lang="scss">
.bg_card {
  border-radius: 0.625rem !important;
  padding: 1rem;
}
</style>
