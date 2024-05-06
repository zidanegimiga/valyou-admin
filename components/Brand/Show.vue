<template lang="">
  <div class="flex" ref="el">
    <div class="pr-3 w-10 flex"  >
      <Image
        :src="current_image"
        class="product-main-image w-full border-2 border-transparent border-round"
         preview
         :class="image_main_class"
      />
    </div>
    <div
      class="-ml-2 image_slider flex flex-column w-3 justify-content-between pr-2"
      style="row-gap: 1rem"
      :class="image_slider_class"
    >
      <img
        v-for="(item, index) in Images_list"
        :key="index"
        :src="item"
        class="w-full cursor-pointer border-2 border-transparent transition-colors transition-duration-150 border-round"
        @click="small_image_click(item)"
        :class="current_image == item ?`border-primary`:''"
        style="border-radius: 3px"
      />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  images: {
    type: Array,
    default: [
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-1.png",
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-2.png",
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-3.png",
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-4.png",
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-1.png",
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-2.png",
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-3.png",
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-4.png",
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-1.png",
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-2.png",
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-3.png",
      "https://freya.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-4.png",
    ],
    validator: (images) => {
      if (images.length === 0) {
        console.error('Error: Images list cannot be empty.')
        return false
      }
      return true
    },
  },
})

// const current_image = ref("https://placehold.co/500x500");
const current_image = ref(props.images[0]);
const add_all_image = ref(false)

watch(add_all_image, () => {
  if (add_all_image.value) {
    // add all image
  }
})

// get the first four images from the list
const firstFourImages = props.images.slice(0, 4)
const Images_list = ref(firstFourImages)

const small_image_click= (link)=>{
  current_image.value = link;
};

function generateRandomId() {
  return Math.floor(Math.random() * Date.now()).toString(16)
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const image_slider_class = ref("image_slider-" + generateRandomId());
const image_main_class = ref("image_main-" + generateRandomId())

const change_design = ()=>{
  Images_list.value = firstFourImages.values;
  let main_image = document.querySelector(`.${image_main_class.value}`)
  let image_slider = document.querySelector(`.${image_slider_class.value}`)
  // console.log(image_slider)
  
  if (image_slider) {
      // Get the current height
      let height = main_image.offsetHeight - 6;

      // Set the max scroll value
      image_slider.style.setProperty("height", height + "px", "important");

      // Enable scroll
      image_slider.style.overflowY = "scroll";
      
      Images_list.value = props.images;
    }
};


// responsive
const sleep_num = ref(10);
onMounted( async () => {
  await sleep(sleep_num.value)
  change_design();
});
const windowWidth = ref(window.innerWidth);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

watch(windowWidth, async (newWidth, oldWidth) => {
  // console.log(`Window width changed from ${oldWidth} to ${newWidth}`);
  await sleep(sleep_num.value)
  change_design();
});

// also we need to check and detect parent width
const el = ref(null)
let parentWidth = ref(0);

onMounted(() => {
  const resizeObserver = new ResizeObserver(async (entries) => {
    for (let entry of entries) {

      if (entry.target === el.value?.parentElement) {
        parentWidth.value = entry.contentRect?.width;
      }
    }
  });

  resizeObserver.observe(el.value.parentElement);

  onUnmounted(() => {
    if (el.value?.parentElement) {
      resizeObserver.unobserve(el.value.parentElement);
    }
  });

  sleep(sleep_num.value).then(() => {
    parentWidth.value = el.value.parentElement.offsetWidth;
  });
});




watch(parentWidth, async (newWidth, oldWidth) => {
  // console.log(`Parent width changed from ${oldWidth} to ${newWidth}`);
  await sleep(sleep_num.value)
  change_design();
});
</script>
<style lang="scss">
.p-image img{
  // width: 100%;
  aspect-ratio: 1/1;
  width: 100%;
    height: 100%;
}

.p-image.product-main-image{
  width: 100%;
  height: min-content;
}

.p-image .p-image-preview-indicator {
    height: 99%;
}
</style>
