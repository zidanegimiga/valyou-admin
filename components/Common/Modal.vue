<script setup>

const props = defineProps({
    title:{
        type:String
    },
    show:{
        type:Boolean,
        default:false
    },
    btnText:{
        type:String,
        default:'Done'
    },
    btnStyle:{
        type:Object
    },
    minWidth:{
      type:String
    },
    showBtn:{
      type:Boolean,
      default:true
    }
})
const visible = ref(false)
const {show} = toRefs(props)
watch(()=>show.value , (val)=>{
    console.log(val)
    visible.value = val
})
const emits = defineEmits(['close'])
</script>
<template>
    <Dialog
    v-model:visible="visible"
    modal
    :style="minWidth ? { 'min-width': minWidth} : { 'min-width': '20vw'}"
    @update:visible="$emit('close')"
  >
    <template #header>
      <h5 class="font-extraBold p-2">{{title}}</h5>
    </template>
    <slot />
      <div class="col-12 flex justify-content-end gap-2" v-if="showBtn">
        <Button
          outlined
          @click.prevent="$emit('close')"
          class="font-extraBold w-7rem align-items-center text-center flex justify-content-center"
          >Cancel</Button
        >
        <Button
          @click.prevent="$emit('submit')"
          :class="['font-extraBold w-7rem align-items-center text-center flex justify-content-center' , btnStyle ? btnStyle : '' ]"
          >{{btnText}}</Button
        >
      </div>
      <div class="" v-if="!showBtn">
        <slot name="button" />
      </div>
  </Dialog>
</template>