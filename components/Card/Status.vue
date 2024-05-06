<template lang="">
    <Card class="card_container">
        <template #content>
          <div class="info__card">

            <Avatar  image="https://randomuser.me/api/portraits/men/32.jpg" class="mr-2" size="xlarge" shape="circle" />
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
}
</script>
<style lang="">
    
</style>