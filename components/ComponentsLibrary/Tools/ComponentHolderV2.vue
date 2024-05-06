<template lang="">
  <div>
      <!-- {{Global_res}} -->
      <!-- <br> -->
      <!-- {{_component_}} -->
      <!-- <br> -->
      <!-- '{{Global_res?.componentName}}' -->
      <!-- <br> -->
      <template v-if="Global_res?.path">
        <component
          :is='defineAsyncComponent( ()=> import( /* @vite-ignore */ Global_res?.path )  )'
          v-bind="$attrs"
        ></component>
      </template>
      <template v-else>
        <component
          :is='Global_res?.componentName'
          v-bind="$attrs"
        ></component>
      </template>
  </div>
</template>
<script setup>
import { paths as paths_components } from "@/config/dynamic_components_path"
import { paths as paths_pages } from "@/config/dynamic_pages_path"
import { paths as paths_containers } from "@/config/dynamic_containers_path"

const props = defineProps({
  load_component :{
      type : Function,
      required : true,
  },
})

const Global_res = ref();

const get_component_path = async (ComponentName)=>{
  let g_path ;

  g_path = paths_components?.[ComponentName];
  if (g_path) {
    let my_path = `../../${g_path}`  
    return { path: my_path, componentName: ComponentName }
  }

  g_path = paths_containers?.[ComponentName];
  if (g_path) {
    let my_path = `../../../containers/${g_path}`  
    return { path: my_path, componentName: ComponentName }
  }

  g_path = paths_pages?.[ComponentName];
  if (g_path) {
    let my_path =  `../../../pages/${g_path}` 
    return { path: my_path, componentName: ComponentName }
  }

  return { path: null, componentName: ComponentName }
}

onBeforeMount(async ()=>{
  let path
  let componentName
  let res = await get_component_path(props.load_component());
  // console.log("res:",res);
  Global_res.value = res;
})

onMounted(()=>{
  // console.log("Im randering Matherfather");
})
</script>
<style lang="scss">
  
</style>
