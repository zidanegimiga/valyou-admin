<template><Dialog
    v-model:visible="value"
    modal
    header="Add Document"
    :style="{ 'min-width': '20vw' }"
    >
   <div class="grid_1 gap-2 mb-2">

    <CustomInputContainer label="Category">
<Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
   
</Dropdown>
</CustomInputContainer>
<CustomInputContainer label="Sub Category">
<Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
   
</Dropdown>
</CustomInputContainer>
   </div>
   <div class="gap-2 grid_1  mb-2">

    <CustomInputContainer label="Type">
    <InputText type="text" v-model="value" />
</CustomInputContainer>
<CustomInputContainer label="Uploaded by">
    <InputText type="text" v-model="value" />
</CustomInputContainer>

   </div>
   <div class="col-12 mt-4">
          <UploadFile v-model="files"/>
        </div>
        <div class="flex gap-2 mt-4 justify-content-end">
      <Button outlined @click.prevent="value = !value" color="red">Upload</Button>
      <Button @click.prevent="handleSubmit">Upload</Button>
    </div>
    </Dialog>
    </template>
    <script>
    export default {
      name: "AddDocumentDialog",
      props: {
        modelValue: {
          default: false,
        },
      },
      emits: ["submit",'update:modelValue'],
      computed: {
        value: {
          get() {
            return this.modelValue;
          },
          set(value) {
            this.$emit("update:modelValue", value);
          },
        },
      },
      data() {
        return {
          date: null,
          time: null,
        };
      },
      watch: {
        value: {
          handler(newVal) {
            if (!newVal) {
              this.date = null;
              this.time = null;
            }
          },
        },
      },
      methods: {
        handleSubmit() {
          this.$emit("submit", {
            date: this.date,
            time: this.time?.toLocaleTimeString() ?? null,
          });
          this.value = !this.value
        },
      },
    };
    </script>
    <style>
    
    
    .grid_1{
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        p{
            padding: 0 !important;
        }
    }
    .meeting_date{
        .p-calendar {
    width: 100% !important;
        }
    }
    </style>