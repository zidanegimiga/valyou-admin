<template>
    <div class="w-full h-full">
        <!-- Header -->
        <div class="item">
            <div class="wrapper-row align-items-center">
                <div class="item expand flex justify-start gap-4 align-items-center">
                    <h4 class="font-bold text-[28px]">
                        Brands' Configurator
                    </h4>
                </div>
                <div class="flex align-center gap-2">
                    <div class="item">
                        <Button label="Add New" icon="pi pi-plus" @click="handleBrandsForm('add', null)" />
                    </div>
                </div>
            </div>
        </div>

        <DataTable :value="brands" editMode="cell" tableStyle="width: 100%; margin-top: 40px">
            <Column>
                <template #header="slotProps">
                    <div class="font-bold text-black pl-5">Brand's Name</div>
                </template>

                <template #body="slotProps">
                    <div class="pl-3">{{ slotProps.data.name }}</div>
                </template>
            </Column>
            <Column>

                <template #header>
                    <div class="font-bold text-black pl-3">Actions</div>
                </template>

                <template #body="slotProps">
                    <div class="flex justify-content-start gap-4">
                        <i @click="handleBrandsForm('edit', slotProps.data)" class="pi pi-pencil cursor-pointer text-blue-400"></i>
                        <i @click="handleDeleteBrand(slotProps.data)" class="pi pi-trash cursor-pointer text-red-500"></i>
                    </div>
                </template>
            </Column>
        </DataTable>
        <Toast />
        <ConfirmDialog group="headless">
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div v-if="action === 'edit'" class="flex flex-column align-items-center p-5 surface-overlay border-round">
                    <div
                        class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                        <i class="pi pi-question text-5xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
                    <p class="mb-0">{{ message.message }}</p>
                    <div class="flex align-items-center gap-2 mt-4">
                        <Button label="Save" @click="acceptCallback"></Button>
                        <Button label="Cancel" outlined @click="rejectCallback"></Button>
                    </div>
                </div>
            </template>
        </ConfirmDialog>
        <Dialog
            :visible="formDialogVisibility" 
            modal 
            closable
            blockScroll
            :draggable="false"
            :header="brandsFormAction === 'add' ? 'Create New Brand' : 'Edit Brand'"
            :style="{ width: '70rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            @after-hide="newBrandValue = ''"
        >
            <template #closeicon>
                <div class="rounded-full p-3 border-1 border-black-alpha-60 flex justify-content-center align-items-center">
                    <i @click="formDialogVisibility = false" class="pi pi-times"></i>
                </div>
            </template>
            <div>
                <div v-if="brandsFormAction === 'add'">
                    <CustomInputContainer label="" class="w-full">
                        <template v-slot>
                            <InputText v-model="newBrandValue" :placeholder="''" type="text" />
                        </template>
                    </CustomInputContainer>
                    <div class="flex align-items-center justify-content-end gap-3 mt-4">
                        <Button outlined label="Cancel" @click="handleCloseDialog"></Button>
                        <Button :label="'Add Brand'" @click="addBrand" ></Button>
                    </div>
                </div>
                <div v-else-if="brandsFormAction === 'edit'">
                    <CustomInputContainer label="" class="w-full">
                        <template v-slot>
                            <InputText v-model="newBrandValue" :placeholder="selectedBrand.name" type="text" />
                        </template>
                    </CustomInputContainer>
                    <div class="flex align-items-center justify-content-end gap-3 mt-4">
                        <Button outlined label="Cancel" @click="()=> {formDialogVisibility = false; newBrandValue = ''}"></Button>
                        <Button :label="'Edit Brand'" @click="handleEditBrand"></Button>
                    </div>
                </div>
            </div>            
        </Dialog>
    </div>
</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const emit = defineEmits(['routeToBannersList'])
const brands = ref([]);
const formDialogVisibility = ref(false);
const newBrandValue = ref("");
const brandsFormAction = ref('');
const selectedBrand = ref('');

const handleDeleteBrand = (brand) => {
    confirm.require({
        group: 'headless',
        header: `Delete Brand`,
        message: `Are you sure you would like to delete ${brand.name}?`,
        accept: () => {
            deleteBrand(brand);
            // console.log(manufacturer)
        },
        reject: () => {}
    });
}

function deleteBrand(brand){
    useMyFetch(`/admin/brand/delete_brand/${brand._id}`, {
        method: "DELETE",
        onResponse({ request, response, options }) {
            console.log("DELETE: ", response);
            toast.add({ severity: 'success', summary: 'Confirmed', detail: `You have successfully deleted ${brand.name}`, life: 3000 });
            getBrands();
        }
    })
}

const handleEditBrand = async () => {
    console.log("Brand: ", newBrandValue.value)

    const { data, status } = useMyFetch(`/admin/brand/update_brand/${selectedBrand.value._id}`, {
        method: "POST",
        body: {
            name: newBrandValue.value
        },
        onResponse({ request, response, options }) {
            console.log("RES", response)
            if (response.ok === true) {
                toast.add({
                    severity: "success",
                    summary: "Brand updated Successfully",
                    detail: "",
                    life: 1000
                })
                getManufacturers();
                formDialogVisibility.value = false;
                newBrandValue.value = "";
            }
        }
    })
}

// Action: edit/add
const handleBrandsForm = (action, brand) => {
    formDialogVisibility.value = !formDialogVisibility.value;
    brandsFormAction.value = action;

    if(action === 'edit'){
        console.log("Action!: ", brand)
        selectedBrand.value = brand
    }
}

const addBrand = async () => {
    useMyFetch('/admin/configuration/new_brand', {
        method: "POST",
        body: {
            name: newBrandValue.value
        },
        onResponse({ request, response, options }) {
            console.log("RES", response)
            if (response.ok === true) {
                toast.add({
                    severity: "success",
                    summary: "Brand added Successfully",
                    detail: "",
                    life: 1000
                })
                getBrands();
                formDialogVisibility.value = false;
                newBrandValue.value = "";
            }
        }
    })
}

const getBrands = async () =>{
    useMyFetch('/admin/brand/get_brand', {
        onResponse({ request, response, options }) {
            if(response.ok){
                brands.value = response._data.data
            }
        }
    });
}

const handleCloseDialog = () => {
    formDialogVisibility.value = false;
    newBrandValue.value = "";
}

onMounted(()=> {
    getBrands();
})
</script>

<style lang="scss"></style>