<template lang="">
    <Card class="card_container h-full  flex align-items-center" :class="{ card_border: is_colored }">
      <template #content v-if="is_colored">
        <div class="card_wrapper flex align-items-center justify-content-between" >
            <!-- left side -->
          <div class="profile__card flex align-items-center gap-3 ">
            <Avatar :image="image" class="" size="large" shape="circle"> </Avatar>
            <div class=" flex flex-column " >
              <span class=" font-bold small__text black_text spacing_none">{{ title }}</span>
              <span class="small__text custom_text spacing_none">{{ subtitle }}</span>
            </div>
          </div>
          <!-- right side -->
          <div class="flex align-items-center gap-1">
            <i class="pi pi-phone p-ripple custom_text p-1" v-ripple></i>
            <span class=" custom_text small__text spacing_none">{{phone}}</span>
          </div>
        </div>
      </template>

      <template #content v-else>
        <div class="card_wrapper flex align-items-center justify-content-between" >
            <!-- left side -->
          <div class="profile__card flex align-items-center gap-3 ">
            <Avatar :image="image" class="" size="large" shape="circle"> </Avatar>
            <div class=" flex flex-column " >
              <span class=" font-bold small__text black_text spacing_none">{{ title }}</span>
              <span class="small__text custom_text spacing_none">{{ subtitle }}</span>
            </div>
          </div>
          <!-- right side -->
          <div class="flex align-items-center gap-1">
            <i class="pi pi-phone p-ripple styled-box-blue" v-ripple></i>
            <span>{{phone}}</span>
          </div>
        </div>
      </template>
     
    </Card>
  </template>
  <script>
  export default {
    name: "ProfileCard",
    props: {
        is_colored: {
      type: Boolean,
      default: true,
    },
      image: {
        type: String,
        default: "https://randomuser.me/api/portraits/women/96.jpg",
      },
      title: {
        type: String,
        default: "Jonathan Boshuizen",
      },
      subtitle: {
        default: "jonathanb@gmail.com",
        type: String,
      },
      showSeparator: {
        type: Boolean,
        default: false,
      },
      phone:{
        type: String,
        default: "0568545256"
      }
    },
    // computed: {
    //   truncateTitle() {
    //     return this.title.length < 24 ? this.title : this.title.slice(0, 24) + "...";
    //   },
    //   truncateSubTitle() {
    //     return this.subtitle.length < 25 ? this.subtitle : this.subtitle.slice(0, 25) + "...";
    //   },
    // },
  };
  </script>
  <style lang="scss">
  .card_container.p-card .p-card-body{
      width: 100% !important;
  }
  .card_border{
    border:  solid 2px #E2E7F1 !important;
  }
  $padding-fix: 0.5rem;
  </style>
  