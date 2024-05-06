<!-- this is a component for Search and fit the design-->

<template lang="">
    <div class="relative">

        
        <InputText class="p-inputtext-this" :type="type" v-model="value"  :placeholder="placeholder" />
        
        <!-- If an icon is provided, display it on the right side of the input field -->
        <div v-if="icon" class="h-full absolute top-0 right-0 flex flex-column justify-content-center" style="translate: -10px;">
            <i :class="icon" :style="{color: icon_color}"></i>
        </div>
        
    </div>
</template>

<script setup>


// Define props for the component
const props = defineProps({

    modelValue: {
        default: ''
    },


    type: {
        type: String,
        default: "text"
    },

    placeholder: {
        default: "Enter your text",
        type: String,
    },

    icon: {
        type: String,
        default: "pi pi-search"
    },

    icon_color: {
        type: String,
        default: "#1C9939"
    }

});

</script>

<script>
export default {

}
</script>

<style lang="scss" scoped>
i{
    font-size: smaller;
    
}

.p-inputtext-this{
    background: #F9FAFC;
}

.p-inputtext-this::placeholder{
    color: #AFBBC6;
}

</style>