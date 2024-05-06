<template>
  <div ref="observer" >
    <template v-if="isVisible">
        
      <slot></slot>

    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, defineProps } from 'vue';

const props = defineProps({
  super_lazy:{
    type:Boolean,
    default:true
  }
});



let isVisible = ref(false);
let observer = ref();
let ob;

onMounted(async () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // ob = new IntersectionObserver((entries, observer) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       isVisible.value = true;
  //       ob.unobserve(entry.target);
  //     }
  //   });
  // }, options);

  ob = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        if (props.super_lazy) {
          ob.unobserve(entry.target);
        }
        
      } else {
        isVisible.value = false;
      }
    });
  }, options);


  await nextTick();
  ob.observe(observer.value);
});


onUnmounted(() => {
  if (ob) {
    ob.disconnect();
  }
});
</script>
