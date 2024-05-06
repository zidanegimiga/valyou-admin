<template>
  Dashboard
  <!-- <div class="flex bg-blue-300 h-full">
    Dashboard
  </div> -->


    <!-- <VirtualScroller :items="items" :itemSize="3" class="border-1 surface-border border-round w-full h-full" >
            <template v-slot:item="{ item, options }">
                <div :class="['flex align-items-center p-2', { 'surface-hover': options.odd }]" style="height: 50px">{{ item }}</div>
            </template>
        </VirtualScroller>
        asfasd
    <div class="card" v-for="(item, index) in 30" :key="index">
      asfdasdfasdfasd
    </div> -->
</template>


<script setup>
import { ref } from 'vue';
import VirtualScroller from 'primevue/virtualscroller';

const items = ref(Array.from({ length: 100000 }).map((_, i) => `Item #${i}`));
</script>

<script>
import { useTest } from "~/stores/test.js";
import { useCounter } from "~/stores/counter.js";

export default {
  name: "HomePage",
  data() {
    return {};
  },
  transition: {
    name: "fade",
    mode: "out-in",
  },
};
</script>
