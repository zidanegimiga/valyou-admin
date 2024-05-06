<template lang="">
  <Dialog
    v-model:visible="errorState.display"
    modal
    :style="{ width: '20vw' }"
    :closable="false"
  >
    <template #header>
      <h5 class="font-bold danger">Something went Wrong.</h5>
    </template>
    <p class="font-medium accent1">
      Please reload browser or sign in again to see the latest changes.
    </p>
    <div class="flex mt-3 gap-2 justify-content-end align-items-center">
      <Button
        icon="pi pi-refresh"
        severity="danger"
        outlined
        label="Reload Page"
        @click.prevent="reloadPage"
      ></Button>
      <Button
        icon="pi pi-sign-out"
        severity="danger"
        label="Log out"
        @click.prevent=""
      ></Button>
    </div>
    <template #footer>
      <p class="accent5">
        {{ errorState?.error?.statusCode }} -
        {{ errorState?.error?.statusMessage }}
      </p>
    </template>
  </Dialog>
</template>
<script setup>
import { useErrorDialogState } from "@/composables/store"

const errorState = useErrorDialogState()

const reloadPage = () => {
  window.location.reload()
}
</script>
<style lang="scss"></style>
