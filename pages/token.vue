<template>
  <div>
    {{ token || 'No Token' }}
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  auth: false,
});

const headers = useRequestHeaders(["cookie"]) as HeadersInit;

const { data: token } = await useFetch("/api/auth/token", { headers });
</script>
