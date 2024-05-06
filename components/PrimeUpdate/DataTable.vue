
<template lang="">
    <template v-if="true">
        <!-- {{ Object.keys( $slots )}} -->

        
        <DataTable v-bind="$attrs" class="DataTable" :class="props.wrapper_class" ref="ref_DataTable">
            
            <!-- <template v-for="(item, index) in Object.keys( $slots )" :key="index">
                <slot :name="item" ></slot>
            </template>
            <template #footer> In total there are products. </template> -->

            <template v-for="(slot, key) in $slots" :key="key" v-slot:[key]>
                <slot :name="key"></slot>
            </template>
        </DataTable>
    </template>
</template>
<script setup>

const props = defineProps({
    wrapper_class:{
        type: String,
        default: ''
    }
})


// playground 
const ref_DataTable = ref(null);



// This code sets the max-height of temp1.$el and .p-datatable-wrapper to the parent's height
onMounted(()=>{
    nextTick(()=>{
        // console.log("DataTable",ref_DataTable.value);

        let temp1 = ref_DataTable.value;

        // Get the parent's height
        let parentHeight = temp1.$el.parentNode.offsetHeight + 'px';

        let height = temp1.$attrs?.style?.height;

        // Set the max-height of temp1.$el and .p-datatable-wrapper to the parent's height
        let wrapper = temp1.$el.querySelector('.p-datatable-wrapper');
        
        if (wrapper) {
            temp1.$el.style.maxHeight = parentHeight;
            wrapper.style.height = parentHeight;
            wrapper.style.maxHeight = parentHeight;
            wrapper.style.maxHeight = temp1.$el.style.maxHeight

            // Set class wrapper_class for wrapper
            wrapper.classList.add(props.wrapper_class);
        }
    })
})




</script>
<style lang="scss" >
    .DataTable{
        .p-datatable-thead{
        position: sticky;
        top: 0;
        }
        .p-datatable-wrapper{
            height: 100%;
        }
    }

    
</style>