import { plugin as Slicksort } from "vue-slicksort";
import {defineNuxtPlugin} from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Slicksort)
})