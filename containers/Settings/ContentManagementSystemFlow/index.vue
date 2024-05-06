<template>
    <div class="h-full flex w-full justify-center items-center">
        <Banners 
        v-if="current_cms_view === 'all banners'" 
        @addNew="current_cms_view = 'add banner'"
        @editBanner="handleEditBanner" 
    />

    <AddEditBanner 
        v-if="current_cms_view === 'add banner' || current_cms_view === 'edit banner'"
        @routeToBannersList="current_cms_view = 'all banners'" 
        :isUserEditingBanner="current_cms_view === 'edit banner'"
        :banner="selectedBanner" 
    />
    </div>
</template>
<script setup>
import AddEditBanner from './AddEditBanner.vue';
import Banners from './Banners.vue';

// all banners, edit banner, 
const current_cms_view = ref("all banners");
const selectedBanner = ref();

function handleEditBanner(banner) {
    selectedBanner.value = banner
    current_cms_view.value = 'edit banner';

    console.log("Handle edit banner: ", current_cms_view.value);
    console.log("Selected Banner data from container: ", banner)
}

</script>