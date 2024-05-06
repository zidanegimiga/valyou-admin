<template lang="">
  <Card class="card_container">
    <template #content>
      <div class="info__card">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="images" />
        <div>
          <slot name="title">
            <h6>{{ truncateTitle }}</h6>
          </slot>
          <slot name="subtitle">
            <p class="gray_text">{{ truncateSubTitle }}</p>
          </slot>
        </div>
      </div>
    </template>
  </Card>
</template>
<script>
export default {
  name: "InfoCard",
  props: {
    title: {
      default: "This is Title at the most",
      type: String,
    },
    subtitle: {
      default: "this is subtitle at the second most given thing",
      type: String,
    },
  },
  computed: {
    truncateTitle() {
      return this.title.length < 18 ? this.title : this.title.slice(0, 18) + "...";
    },
    truncateSubTitle() {
      return this.subtitle.length < 21 ? this.subtitle : this.subtitle.slice(0, 21) + "...";
    },
  },
};
</script>
<style lang="scss">
.info__card {
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: center;
  column-gap: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 7px;
    object-fit: cover;
  }
  h6 {
    font-weight: 300;
    font-size: 0.9rem;
    line-height: 1.1;
    margin-bottom: 0.2rem;
  }
  p {
    font-size: 0.75rem;
    line-height: 1.1;
    font-weight: 300;
  }
}
</style>
