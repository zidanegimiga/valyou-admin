<template lang="">
  <div class="topBar__icon_wrap">

    <i class="pi pi-clock cursor-pointer" ></i>
    <i class="pi pi-calendar cursor-pointer" ></i>
    <NuxtLink to="/messages"><i class="pi pi-comments cursor-pointer" ></i></NuxtLink>
    <i v-badge  class="pi pi-bell p-overlay-badge cursor-pointer" ></i>
    <Avatar image="https://randomuser.me/api/portraits/men/43.jpg" shape="circle"/>
    <Image src="/icons/chevron-down.svg" alt="chevron" width="20" class="p-ripple" v-ripple/>
  </div>
</template>
<script>
export default {
  name: "IconWrap",
};
</script>
<style lang="scss" scoped>

i{
  color: gray;
}

i:hover{
  color: #0A94FF;
}


.topBar__icon_wrap {
  display: flex;
  column-gap: 1rem;
  align-items: center;
  margin-left: auto;
  img{
    cursor: pointer;
  }
}
</style>
