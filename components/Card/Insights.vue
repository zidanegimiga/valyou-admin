<template lang="">
    <div class="card grid grid-nogutter">
        <div class="col">
            <h2>{{title}}</h2>
            <h1>{{price}}</h1>
        </div>
        <div class="col flex flex-row align-items-center justify-content-end">
            <Tag v-if="tag_num" class="min-w-0 min-h-0 w-2 md:w-4 ratio-tag mr-3 text-lg"  :value="tag_num" />
            <i class="pi pi-chevron-right "></i>
        </div>
        
    </div>
    
</template>
<script setup>

defineProps({
    title: {
        type: String,
        default: 'New Leads'
    },
    price: {
        type: String,
        default: 'AED 350,500'
    },

    tag_num: {
        type: String,
        default: '3'
    }

});
</script>

<script>
export default {

}
</script>
<style lang="scss" scoped>
.ratio-tag {
    aspect-ratio: 1/1;
    color: #3A51F8;
    font-weight: bold;
    background: #E6F1FF;
}

h2 {
    color: #8C9CAC;
    font-size: small;
}

h1 {
    color: #0A2C4F;
    font-size: medium;
}

i {
    color: #2F6F71;
}
</style>

<style lang="scss">
.ratio-tag .p-tag-value {
    font-size: medium !important;
}
</style>