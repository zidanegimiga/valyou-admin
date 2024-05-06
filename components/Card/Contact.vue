<template lang="">
  <Card class="card_container contact__card">
    <template #content>
      <div class="mb-2 cc__avatar_wrap">
        <Avatar v-if="image" :image="image" shape="circle"></Avatar>
        <Avatar v-else :image="'https://randomuser.me/api/portraits/women/96.jpg'" shape="circle" size="large"></Avatar>
        <span  class="cc__chip"> {{ status }}</span>
        <!-- <span v-else class="inactive__chip"> {{ status }} </span> -->
      </div>
      <h1 v-if="title" class=" font-size-normal spacing_none font-bold accent5 capsize">{{ title }}</h1>
      <h1 v-else class=" font-size-normal spacing_none font-bold accent5">no name</h1>
      <p class=" font-bold spacing_none accent5 card_mail">{{ email }}</p>
      <p class="mobile__text spacing_none font-medium custom_text">{{ mobile }}</p>
    </template>
  </Card>
</template>
<script>
export default {
  name: "ContactCard",
  props: {
    image: {
      default: "https://randomuser.me/api/portraits/women/96.jpg",
      type: String,
    },
    title: {
      type: String,
      default: "",
    },
    email: {
      default: "email@contact.com",
      type: String,
    },
    status: {
      type: String,
      default: "",
    },
    mobile: {
      default: "0561234567",
      type: String,
    },
  },
};
</script>
<style lang="scss">
.contact__card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.2rem;
  background: transparent;
  border: 1px solid lightgray !important;

  p {
    // font-size: 0.86rem;
  }

  h1 {
    position: relative;
    bottom: 0.2rem;
    font-size: 0.95rem;
    line-height: 1.1;
    color: #000;
    margin-bottom: 0.2rem;
  }
  .card_mail {
  white-space: nowrap !important;
  overflow: hidden !important;
  font-size: 0.85rem !important;
  text-overflow: ellipsis !important;
}

  .mobile__text {
    font-size: 0.85rem !important;
    margin-top: 0.4rem !important;
  }

  .cc__avatar_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .p-avatar {
      width: 5rem;
      height: 5rem;
    }

    .cc__chip {
      color: white;
      font-size: 0.6rem !important;
      padding: 2px 6px;
      border-radius: 0px;
      background-color: #1AD598 !important;
      position: relative;
      bottom: 0.4rem;
      border-radius: 4px;
      font-weight: 400;
    }

    .inactive__chip {
      color: white;
      font-size: 0.6rem !important;
      padding: 2px 6px;
      border-radius: 0px;
      background-color: #8D98A9 !important;
      position: relative;
      bottom: 0.4rem;
      border-radius: 4px;
      font-weight: 400;
    }

  }
}</style>
