<!-- Dropdown for fit the design -->

<template>
    <Dropdown @click="Set_style_of_pdropdown_panel" v-model="value" :options="options" class="dropdown_style" v-bind="$attrs" />
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(
    {
        modelValue: {
            default: 'Legal Services'
        },

        options: {
            type: Array,
            default: [
                "Overall",
                "Legal Services",
                "Accounting",
                "Advisory Services",
            ]
        },
    }
);

let value = ref(props.modelValue);
watchEffect(() => {
    value.value = props.modelValue;
});

function Set_style_of_pdropdown_panel() {

    setTimeout(function() {
    document.querySelector('.p-dropdown-panel').classList.add('dropdown_panel_style');
}, 70);
    

} ;

</script>

<style lang="scss" scoped>
.dropdown_style {
    background: #FFFFFF;
    color: #0A2C4F !important;

}

</style>

<style lang="scss">
.dropdown_style.p-dropdown.p-inputwrapper-filled .p-dropdown-label {
    color: #0A2C4F !important;
    font-weight: bold !important;
    background: #FFFFFF;


}

.dropdown_panel_style.p-dropdown-panel .p-dropdown-items .p-dropdown-item{
    color:#0A2C4F;
    font-weight: bold;
}

.dropdown_panel_style.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight{
    border-radius: 10px;
}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover{
    border-radius: 10px;
    color:#0A2C4F;
    background: #e4e4e4;
}
</style>
