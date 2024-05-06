<template lang="">
  <div class="avatar__list_wrap" :class="border.border_me">
    <Avatar :image="image" shape="circle" ></Avatar>
    <span class="avatar__text">{{ text }}</span>
    
  </div>
</template>
<script>
export default {
  name: "AvatarList",
  props:{
    image:{
      default:'https://randomuser.me/api/portraits/men/32.jpg',
      type:String,
    },
    text:{
      type:String,
      default:"Customer Name"
    },
    sub_text:{
      type:String,
      default: "sub text"
    },
    shape:{
      type:String,
      default:"circle"
    },
    border_bottom_bool:{
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" module="border" scoped>
  
  .border_me{
    border-bottom: v-bind('border_bottom_bool ? "1px solid lightgray":""');
  }

</style>

<style lang="scss">
.avatar__list_wrap {
  display: grid;
  grid-template-columns: 30px 1fr;
  
  column-gap: 10px;
  padding: 0.7rem;
  align-items: center;
}
.avatar__text {
  text-transform: capitalize;
  color: #000;
  font-weight: 500;
  font-size: 0.9rem;
}
</style>
