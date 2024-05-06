<template lang="">
  <div class="flex justify-content-center align-items-center w-full gap-3 pr-2 pl-2">
    <template v-if="true" v-for="(item, index) in _list" :key="index">
      <Avatar
        v-if="item.is_complete"
        icon="pi pi-check font-bold"
        class="flex-none"
        :style="style_active"
        shape="circle"
      />
      <Avatar
        v-else
        :label="item?.label ? item?.label : (index + 1).toString()"
        class="flex-none font-bold"
        :style="item.is_active ? style_active : style_normal"
        shape="circle"
      />
      <h3 class="-ml-1 flex-none font-bold" :class="item.is_active || item.is_complete ?'':'gray_text'" >{{item.name}}</h3>

      <!-- <Divider v-if="_list.length - 1 != index " class="flex-grow-1" /> -->
      <div v-if="_list.length - 1 != index " class="p-timeline-event-connector flex-grow-1" data-pc-section="connector" 
      style="height: 3px; width: 100%;
      background: rgb(222, 226, 230);
      "
      :style=" item.is_complete ? 'background: #2196F3;':''"
      ></div>

    </template>

    
  </div>
</template>
<script setup>
const style_normal = reactive({
  backgroundColor: "#dee2e6",
  color: "#000",
})

const style_active = reactive({
  backgroundColor: "#2196F3",
  color: "#ffffff",
})

const is_active = ref(false);

const props = defineProps({
    _list:{
        type:Array,
        default:[
          {
            label:"1", // optional
            is_active:false,
            name:"order received",
            is_complete: false
          }
        ]
    }
});
</script>
<style lang=""></style>
