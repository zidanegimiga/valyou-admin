import VueTelInput from "vue-tel-input"
import {defineNuxtPlugin} from '#app'

export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.vueApp.use(VueTelInput)
    nuxtApp.vueApp.component('VueTelInput',VueTelInput)
})