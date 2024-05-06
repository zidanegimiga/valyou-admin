<template lang="">
  <div>
    <template v-if="Image_bool">
  
      <div  v-if="showActive" class="li__wrap cursor-pointer " :class="{ active_secondary: is_active }">
        <template v-if="Image_bool">
          <PrimeUpdateAvatar v-if="image" :image="image"  :shape="is_circle ?'circle':'square' " :image_clickable="image_clickable" @error="(e)=>{
          console.log('error no Image',image);
          image = false
        }" />
  
        <PrimeUpdateAvatar v-else class="pointer-events-none" :image="image" :shape="is_circle ?'circle':'square' "  :label="first_name[0].toUpperCase() + last_name[0].toUpperCase()" style="background: #5c9aa4; color: #fff"  />
        <div class="li__text_wrap pointer-events-none">
          <p v-if="is_sub_first" class="font-light gray_text">{{ subtitle }}</p>
          <h2 v-if="name" class="font-bold">{{ name }}</h2>
          <h2 v-else class="font-bold">{{ `${first_name} ${last_name}` }}</h2>
          <p v-if="!is_sub_first" class="font-light gray_text">{{ subtitle }}</p>
        </div>
        <slot name="actions">
          <!-- <i class="pi pi-ellipsis-v p-ripple" v-ripple></i> -->
        </slot>
        </template>
    </div>
  
    </template>
    <template v-else>
      <!--   -->
      <div class="wrapper-column">
        <div class="item expand">
          <div class="wrapper-row align-items-center p-3  cursor-pointer " :class="{'bg-blue-100':is_active,  }" :style="is_active ? 'border-radius:8px' :''">
            <div class="item expand">
              <div class="wrapper-column">
                <div class="item">
                  <span class="font-bold">
                    {{name}}
                  </span>
                  
                </div>
                <div class="item" :class="{}">
                  
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div class="item " >
          <div class="flex h-full w-full algin-items-center justify-content-center">
            <div style="width: 94%;" class="border-gray-300 border-bottom-1" v-visible="!is_active" ></div>
          </div>
        </div>
      </div>

  
    </template>

  </div>

</template>
<script setup>
defineProps({
  image: {
    default: "https://randomuser.me/api/portraits/women/96.jpg",
    type: String,
  },
  item: {
    default: {},
    type: Object,
  },

  name: {
    default: null,
    type: String
  },

  first_name: {
    default: "First",
    type: String,
  },

  last_name: {
    default: "Last",
    type: String,
  },

  subtitle: {
    default: "CUS-001",
    type: String,
  },
  is_active: {
    default: false,
    type: Boolean,
  },
  is_circle: {
    default: true,
    type: Boolean
  },
  is_sub_first: {
    default: true,
    type: Boolean
  },
  bottom_border: {
    type: Boolean,
    default: true
  },
  showActive: {
    type: Boolean,
    default: false,
  },
  image_clickable: {
    type: Boolean,
    default: true,
  },
  Image_bool: {
    type: Boolean,
    default: true,
  },

});

</script>
<style lang="scss">
.li__wrap {
  display: grid;
  padding: 0.6rem;
  border-radius: 10px;
  grid-template-columns: 37px 1fr 20px;
  column-gap: 0.4rem;
  align-items: center;

  .p-avatar {
    width: 37px !important;
    height: 37px !important;
    object-fit: contain;
  }

  i {
    cursor: pointer;
  }

  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.3rem;
    right: 0.4rem;
    width: 84%;
    height: 1px;
    border-radius: 2px;
    background: v-bind("bottom_border ? `#f2efef` : `bottom_border:unset`")
  }

  &.active_secondary {
    &::after {
      content: none;
    }
  }
}

.li__text_wrap {
  h2 {
    line-height: 1.25;
    font-size: 0.82rem !important;
    font-weight: 500;
    letter-spacing: 0rem !important;
  }

  p {
    font-size: 0.73rem !important;
    letter-spacing: 0.01rem !important;
    color: #8798ad !important;
  }
}</style>
