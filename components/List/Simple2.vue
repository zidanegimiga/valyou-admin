<template lang="">
  <div class="simple__list_wrap simple2" :style="{ 'border-bottom': border_bottom }" >
    <div class="sl__category_text">{{ category_text }}</div>
    <div
      class="sl__text flex algin-items-center gap-3"
      style="align-items: center"
    >
      <template v-if="avatar_bool">
        <PrimeUpdateAvatar v-if="image_src" shape="circle" :image="image_src" />
        <PrimeUpdateAvatar v-else shape="circle" icon="pi pi-user" />
      </template>

      <slot name="content">
        <div v-if="list_names.length" class="flex flex-column gap-3">
          <div
            
            v-for="(name, index) in list_names"
            :key="index"
          >
            {{ name }}
            <br />
          </div>
        </div>

        <template v-else>
          <div>{{ name }}</div>
        </template>
      </slot>
    </div>
  </div>
</template>
<script setup>
const prop = defineProps(
  {
    category_text: {
      default: "Category",
      type: String,
      required: true,
    },

    image_src: {
      type: String,
      default: "",
    },

    avatar_bool: {
      type: Boolean,
      default: false,
    },

    name: {
      default: "Title is here",
    },

    list_names: {
      type: Array,
      default: [], // ["Name1", "Name2"]
    },

    border_bottom_bool:{
      type:Boolean,
      default: true
    }
  }
);

const border_bottom = ref(prop.border_bottom_bool ? `1px solid #f0f0f0 ` :`unset`);

</script>
<style lang="scss">
.simple2{

  .simple__list_wrap {
    display: grid;
    grid-template-columns: 0.66fr 0.6fr 0.48fr 0.5fr;
    column-gap: 10px;
    border-bottom: unset;
    padding: 1.28rem;
    padding-left: 0rem;
  }
  .sl__category_text {
    color: #8d98a9;
    text-transform: unset;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: -0.42px !important;
  }
  .sl__text {
    text-transform: unset;
    color: #000;
    font-weight: 600;
    font-size: 0.8rem;
  }
}
</style>
