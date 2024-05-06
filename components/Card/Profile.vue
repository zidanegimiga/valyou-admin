<template lang="">
  <Card class="card_container h-full">
    <template #content>
      <div class="profile__card">
        <div class="profile__card_grid">
          <Avatar :image="image" class="profile_avatar__image" shape="circle"> </Avatar>
          <div>
            <h1 class="font-size-normal">{{ truncateTitle }}</h1>
            <p class="font-size-small gray_text width-70">{{ truncateSubTitle }}</p>
          </div>
          <i class="pi pi-ellipsis-v p-ripple" v-ripple></i>
          <div class="profile__icon_actions">
            <i class="pi pi-envelope p-ripple styled-box-blue" v-ripple></i>
            <i class="pi pi-whatsapp p-ripple styled-box-green" v-ripple></i>
            <i class="pi pi-eye p-ripple styled-box-red" v-ripple></i>
          </div>
        </div>
        <!-- actions -->
        <Divider class="mt-4 mb-3" v-if="showSeparator"></Divider>
        <slot> </slot>
      </div>
    </template>
  </Card>
</template>
<script>
export default {
  name: "ProfileCard",
  props: {
    image: {
      type: String,
      default: "https://randomuser.me/api/portraits/women/96.jpg",
    },
    title: {
      type: String,
      default: "Your Title is here long and precise accuracy",
    },
    subtitle: {
      default: "Your Subtitle is here long and precise accuracy",
      type: String,
    },
    showSeparator: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    truncateTitle() {
      return this.title.length < 24 ? this.title : this.title.slice(0, 24) + "...";
    },
    truncateSubTitle() {
      return this.subtitle.length < 25 ? this.subtitle : this.subtitle.slice(0, 25) + "...";
    },
  },
};
</script>
<style lang="scss">
$padding-fix: 0.5rem;

.profile__card_grid {
  display: grid;
  grid-template-columns: 40px 1fr 30px;
  align-items: center;
  column-gap: 1rem;
  position: relative;
  padding-bottom: $padding-fix;
  i {
    align-self: flex-start;
    cursor: pointer;
  }
  h1{
    line-height: 1.4;
  }
  p{
    font-weight: 300;
  }
}
.profile_avatar__image {
  width: 100% !important;
  height: 100% !important;
  max-height: 40px !important;
  display: flex;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.profile__icon_actions {
  position: absolute;
  bottom: -$padding-fix + 0.55rem;
  right: 0.5rem;
  z-index: 1;
  display: flex;
  column-gap: 0.8rem;
  align-items: center;
  i {
    color: lightslategray;
    cursor: pointer;
    font-size: 1.1rem;
  }
}
</style>
