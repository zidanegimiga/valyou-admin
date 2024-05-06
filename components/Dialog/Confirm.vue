<template>
  <Dialog
    v-model:visible="value"
    modal
    :header="title"
    class="confirm-modal"
    :style="{ width: '20vw' }"
  >
    <p class="pl-2">{{ message }}</p>
    <template #footer>
      <Button
        :label="cancelBtn"
        :severity="cancelBtn == 'Close' ? 'warning' : 'primary'"
        @click="value = false"
        outlined
      />
      <Button :label="confirmBtn" @click="closeSession" autofocus :severity="confirmBtn == 'Yes, Cancel' ? 'warning' : 'primary'" />
    </template>
  </Dialog>
</template>

<script setup>
const props = defineProps([
  "modelValue",
  "confirmBtn",
  "cancelBtn",
  "title",
  "message",
])
const emit = defineEmits(["update:modelValue", "close"])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})
const closeSession = () => {
  value.value = false
  emit("close")
}
</script>

<style lang="scss"></style>
