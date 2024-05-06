<template>
    <div class="w-full h-full">
        <!-- Header -->
        <div class="item">
            <div class="wrapper-row align-items-center">
                <div class="item expand flex justify-start gap-4 align-items-center">
                    <h4 class="font-bold text-[28px]">
                        Manufacturer's Configurator
                    </h4>
                </div>
                <div class="flex align-center gap-2">
                    <div class="item">
                        <Button label="Add New" icon="pi pi-plus" @click="handleManufactureForm('add', null)" />
                    </div>
                </div>
            </div>
        </div>

        <DataTable :value="manufacturers" editMode="cell" tableStyle="width: 100%; margin-top: 40px">
            <Column>
                <template #header="slotProps">
                    <div class="font-bold text-black pl-5">Manufacturer's Name</div>
                </template>

                <template #body="slotProps">
                    {{ console.log("Rows: ", slotProps.row) }}
                    <div class="pl-3">{{ slotProps.data.name }}</div>
                </template>
            </Column>
            <Column>

                <template #header>
                    <div class="font-bold text-black pl-3">Actions</div>
                </template>

                <template #body="slotProps">
                    <div class="flex justify-content-start gap-4">
                        <i @click="handleManufactureForm('edit', slotProps.data)" class="pi pi-pencil cursor-pointer text-blue-400"></i>
                        <i @click="handleDeleteManufacturer(slotProps.data)" class="pi pi-trash cursor-pointer text-red-500"></i>
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
            :header="manufacturerFormAction === 'add' ? 'Create New Manufacturer' : 'Edit Manufacturer'"
            :style="{ width: '70rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            @after-hide="newManufacturerValue = ''"
        >
            <template #closeicon>
                <div class="rounded-full p-3 border-1 border-black-alpha-60 flex justify-content-center align-items-center">
                    <i @click="formDialogVisibility = false" class="pi pi-times"></i>
                </div>
            </template>
            <div>
                <div v-if="manufacturerFormAction === 'add'">
                    <CustomInputContainer label="" class="w-full">
                        <template v-slot>
                            <InputText v-model="newManufacturerValue" :placeholder="''" type="text" />
                        </template>
                    </CustomInputContainer>
                    <div class="flex align-items-center justify-content-end gap-3 mt-4">
                        <Button outlined label="Cancel" @click="handleCloseDialog"></Button>
                        <Button :label="'Add Manufacturer'" @click="addManufacturer"></Button>
                    </div>
                </div>
                <div v-else-if="manufacturerFormAction === 'edit'">
                    <CustomInputContainer label="" class="w-full">
                        <template v-slot>
                            <InputText v-model="newManufacturerValue" :placeholder="selectedManufacturer?.name" type="text" />
                        </template>
                    </CustomInputContainer>
                    <div class="flex align-items-center justify-content-end gap-3 mt-4">
                        <Button outlined label="Cancel" @click="handleCloseDialog"></Button>
                        <Button :label="'Edit Manufacturer'" @click="handleEditManufacturer"></Button>
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
const manufacturers = ref([]);
const formDialogVisibility = ref(false);
const newManufacturerValue = ref("");
const manufacturerFormAction = ref('');
const selectedManufacturer = ref({});


const handleDeleteManufacturer = (manufacturer) => {
    confirm.require({
        group: 'headless',
        header: `Delete Manufacturer`,
        message: `Are you sure you would like to delete ${manufacturer.name}?`,
        accept: () => {
            deleteManufacturer(manufacturer);
            // console.log(manufacturer)
        },
        reject: () => {}
    });
}

function deleteManufacturer(manufacturer){
    useMyFetch(`/admin/manufacturer/delete_manufacturer/${manufacturer._id}`, {
        method: "DELETE",
        onResponse({ request, response, options }) {
            console.log("DELETE: ", response);
            toast.add({ severity: 'success', summary: 'Confirmed', detail: `You have successfully deleted ${manufacturer.name}`, life: 3000 });
            getManufacturers()
        }
    })
}

const handleEditManufacturer = async () => {
    console.log("Manufacturer: ", newManufacturerValue.value)

    const { data, status } = useMyFetch(`/admin/manufacturer/update_manufacturer/${selectedManufacturer.value._id}`, {
        method: "POST",
        body: {
            name: newManufacturerValue.value
        },
        onResponse({ request, response, options }) {
            console.log("RES", response)
            if (response.ok === true) {
                toast.add({
                    severity: "success",
                    summary: "Manufacturer updated Successfully",
                    detail: "",
                    life: 1000
                })
                getManufacturers();
                formDialogVisibility.value = false;
                newManufacturerValue.value = "";
            }
        }
    })
}

const getManufacturers = async () =>{
    useMyFetch('/admin/brand/get_manufacturer', {
        onResponse({ request, response, options }) {
            if(response.ok){
                manufacturers.value = response._data.data
            }
        }
    });
}

const addManufacturer = async() => {
    useMyFetch('/admin/configuration/new_manufacturer', {
        method: "POST",
        body: {
            name: newManufacturerValue.value
        },
        onResponse({ request, response, options }) {
            console.log("RES", response)
            if (response.ok === true) {
                toast.add({
                    severity: "success",
                    summary: "Manufacturer added Successfully",
                    detail: "",
                    life: 1000
                })
                getManufacturers();
                formDialogVisibility.value = false;
                newManufacturerValue.value = "";
            }
        }
    })
}

// Action enum types: edit/add
const handleManufactureForm = (action, manufacturer) => {
    formDialogVisibility.value = !formDialogVisibility.value;
    manufacturerFormAction.value = action;

    if(action === 'edit'){
        console.log("Action!: ", manufacturer)
        selectedManufacturer.value = manufacturer
    }
}

const handleCloseDialog = () => {
    formDialogVisibility.value = false;
    newManufacturerValue.value = "";
}

onMounted(()=> {
    getManufacturers();
})
</script>

<style lang="scss"></style>