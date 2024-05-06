<template lang="">
  <template v-if="true">
    <!-- If an image is provided, it will be displayed as the avatar. -->
    <Image v-if="image" ref="image_ref" :src="image" preview style="display:none"/>
    <Avatar v-if="image" :image="image" v-bind="$attrs" @click="show_image" :class="$style.show_image">
      <slot></slot>
    </Avatar>
    

    <template v-else>
      <!-- If no image is provided, a label will be displayed as the avatar. -->
      <!-- If splits_label_bool is true, the label will be split and transformed. -->
      <Avatar v-if="splits_label_bool" :label="splits_label" v-bind="$attrs">
        <slot></slot>
      </Avatar>
      <!-- If splits_label_bool is false, the original label will be displayed. -->
      <Avatar v-else :label="label" v-bind="$attrs">
        <slot></slot>
      </Avatar>
      
    </template>

  </template>
</template>

<script setup>
// Define the props for the component.
const props = defineProps({
  label: {
    type: String,
    default: "USer",
  },

  splits_label_bool: {
    type: Boolean,
    default: false,
  },
  splits_only_first_last: {
    type: Boolean,
    default: false,
  },

  image: {
    type: [String, Boolean],
    default: "",
  },

  image_clickable: {
    type: Boolean,
    default: false,
  },
})

// Compute the split label if splits_label_bool is true.
const splits_label = computed(() => {
  let label_split;
  if (props.splits_only_first_last) {
    label_split = props.label
      .split(" ")
      .map((item) => item[0]?.toLocaleUpperCase ? item[0]?.toLocaleUpperCase() : item)
      .join("");

    label_split = label_split.split(" ")
      .filter((item, index,array) => {
        if (index == 0) {
          return item
        }
        
        if (index == array.length -1) {
          return item
        }
      }).join(" ")


  }
  else {
    label_split = props.label
      .split(" ")
      .map((item) => item[0]?.toLocaleUpperCase ? item[0]?.toLocaleUpperCase() : item)
      .join("")
  }

  return label_split
})

// Reference to the image element.
const image_ref = ref(null);

// Define the style for the image.
const _style = ref("zoom-in");

// Define the function to show the image when clicked.
const show_image = () => {
  if (props.image_clickable) {
    image_ref.value.$el.children[1].click()
  }
};

// Log the image reference when the component is mounted.
onMounted(() => {
  // nextTick(()=>{
  //   console.log("image_ref:",image_ref.value.$el);
  // })
})
</script>

<!-- Define the CSS for the component. -->
<style lang="scss" module>
.show_image {
  cursor: v-bind("props.image_clickable ? 'zoom-in' : 'unset'");
}
</style>
