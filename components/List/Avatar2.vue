<template lang="">
  <div class="flex algin-items-center gap-3" style="border: 0">

    <PrimeUpdateAvatar v-if="image" :image="image"  :shape="is_circle ?'circle':'square' " :image_clickable="true" @error="(e)=>{
      console.log('error no Image',image);
      image = false
    }" />
    <PrimeUpdateAvatar v-else :image="image" :shape="is_circle ?'circle':'square' "  :label="first_name[0].toUpperCase() + last_name[0].toUpperCase()" style="background: #5c9aa4; color: #fff"  />

    <span v-if="text" class="avatar__text flex justify-content-center algin-items-center">{{
      text
    }}</span>
    <span v-else class="avatar__text flex justify-content-center algin-items-center">{{
      first_name + " " + last_name
    }}</span>
  </div>
</template>
<script>
export default {
  props: {
    image: {
      default: "https://randomuser.me/api/portraits/men/32.jpg",
      type: String,
    },
    text:{
      type: String,
      default: "",
    },
    first_name: {
      type: String,
      default: "First",
    },

    last_name: {
      type: String,
      default: "Last",
    },

    is_circle:{
    default: true,
    type:Boolean
  },
  },
}
</script>
<style lang="scss">
// .avatar__list_wrap {
//   display: grid;
//   grid-template-columns: 30px 1fr;
//   column-gap: 10px;
//   padding: 0.7rem;
//   align-items: center;
// }
.avatar__text {
  text-transform: capitalize;
  color: #000;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  // transform: translate(30px, 0);
}
</style>
