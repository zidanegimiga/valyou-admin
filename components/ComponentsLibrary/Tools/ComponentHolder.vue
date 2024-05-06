
<template lang="">
    <div>
        <!-- {{Global_res}} -->
        <!-- <br> -->
        <!-- {{_component_}} -->
        <!-- <br> -->
        <!-- '{{Global_res?.componentName}}' -->
        <!-- <br> -->
        <component
          
          :is='Global_res?.path ? defineAsyncComponent(  ()=> import(Global_res?.path ) ) : Global_res?.componentName'
          v-bind="$attrs"
        >
    
    </component>
    </div>
    
</template>
<script setup>
const props = defineProps({
    load_component :{
        type : Function,
        required : true,
    },

    
})


const Global_res = ref();

function splitCamelCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(" ")
}

const get_component_path = async (ComponentName)=>{
    // check path before import

    
        // Handling Component Name
        //'path1', 'List/Avatar2'
        let paths = []; 
        let words_split;
        var g_path = null;
        let path;
        let path_starter = "../../"


        // import name : directly in components Folder
        path = `${ComponentName}`+ '.vue'
        paths.push(path_starter + path)
        // import Folder name : lookup in Folders with name
        words_split = splitCamelCase(ComponentName)
        path = words_split.join('/') + '.vue';
        paths.push(path_starter + path)
        
        // import Folder name : lookup in Folders with name but its index
        words_split = splitCamelCase(ComponentName)
        path = words_split.join('/') + '/index.vue';
        
        paths.push(path_starter + path)
        
        // import html component
        paths.push(ComponentName)
        

        
        for (let path of paths) {
            
            try {

                let component = await import(path);
                g_path = path
        console.log(path)

                // console.log("g_path:",g_path);
                return { path: g_path, componentName: ComponentName }
                
                break

            } catch (error) {
                // let text = "`"+ComponentName+ "`"
                // console.error(`Load component Failed  at ${path}`, error);
            }
        }

        
    // console.log("paths:",paths);
    
    return { path: g_path, componentName: ComponentName }

    
    

    
}

onBeforeMount(async ()=>{
    let path
    let componentName

    let res = await get_component_path(props.load_component());
    // console.log("res:",res);
    Global_res.value = res;
    // Global_res.value.path = "ss";

   
})
</script>
<style lang="scss">
    
</style>