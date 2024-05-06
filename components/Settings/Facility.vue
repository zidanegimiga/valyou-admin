<template lang="">
    <div class="grid employee__Configurator">
      <div class="card col-12 flex flex-column gap-4">
        <!-- top Heading -->
        <div class="grid flex align-items-center justify-content-between">
          <h3 class="black_text font-weight-large">Facility Configurator</h3>
        </div>
        <!--  All Employee -->
        <div class="employeeTop__wrapper">
          <div class="flex flex-column gap-1" v-for="(item, index) in facilityRooms">
            <!-- All Employees Header -->
            <div
              class="all_employees flex align-items-center justify-content-between gap-4"
            >
              <!-- left  -->
              <div class="flex align-items-center gap-4 all_input">
                <div class="employee__number flex align-items-center justify-content-center  " >
                    <span>
                        {{index+1}}
                    </span>
                </div>
                <div class=" flex flex-column " >
                    <InputText
                  id="name"
                  v-model="item.name"
                  placeholder="Enter name"
                  class="service_input"
                  v-if="item.showTextField"
                />
                <h3 v-else class="font-bold">{{ item.name }}</h3>
                    <a href="#" class="underline font_exsmall primary font-medium">
                    https://goo.gl/maps/dtSBb79DgaQhDnBo8
                    </a>
                </div>
                
              </div>
              <!-- right -->
              <div class="flex gap-3">
                <!-- right cancel button -->
                <Button
                  class="cancel_btn"
                  severity="danger"
                  outlined
                  v-if="item.cancelBtn"
                  @click="handleIsEdit(item)"
                >
                  <span class="font-bold">Cancel</span>
                </Button>
                <!-- right save button -->
                <Button
                  class="p-button save_btn"
                  v-if="item.saveBtn"
                  @click="handleIsEdit(item)"
                >
                  <span class="white_text font-bold"> Save </span>
                </Button>
                <!-- right edit button -->
                <img
                  v-if="item.editBtn"
                  alt="svg"
                  src="/icons/edit.svg"
                  class="pointer"
                  ripple
                  @click="handleIsEdit(item)"
                />
                <!-- right dell button -->
                <img alt="svg" src="/icons/dell.svg" class="pointer" ripple />
                <img
                  alt="svg"
                  src="/icons/arrow_down.svg"
                  class="pointer"
                  ripple
                />
              </div>
            </div>
            <!-- Rooms  -->
            <div class="flex align-items-center flex-wrap gap-2 m-2">
              <!-- opening time -->
            <div class=" timing_shift  flex align-items-center ">
            <InputText
            id="name"
            v-model="open_time"
            placeholder="Open time : 00:00"
            class=""
            v-if="isEditable"
          />
            <span v-else class="span_text font-size-small font-weight-large">
              Open time : 00:00
            </span>
            </div>
              <!-- closing time  time -->
            <div class=" timing_shift  flex align-items-center ">
            <InputText
            id="name"
            v-model="open_time"
            placeholder="Open time : 00:00"
            class=""
            v-if="isEditable"
          />
            <span v-else class="span_text font-size-small font-weight-large">
              Open time : 00:00
            </span>
            </div>
              <img  v-if="isEditable" alt="svg" src="/icons/danger_dell.svg" class="pointer mb-2" ripple />
            </div>
            <span class=" ml-2 font-bold small__text">BOOTHS</span>
            <div class="flex align-items-center flex-wrap gap-2 m-2 " v-for="(item, index) in item.rooms">
              <div class="input_section">
                <InputText
                  id=""
                  v-model="item.name"
                  placeholder="Booth"
                  class=""
                  :disabled="!isEditable"
                />
              </div>

              <div class="dropdown_section">
                <Dropdown
                  v-model="selectedBooth"
                  :options="categoriesFacility"
                  optionLabel="name"
                  placeholder="Active"
                  :disabled="!isEditable"
                  class="w-full md:w-14rem"
                />
              </div>
              <img  v-if="isEditable" alt="svg" src="/icons/danger_dell.svg" class="pointer mb-2" ripple />
            </div>
             <!-- add some data  -->
            <div v-if="item.showAddBooth" class=" p-2 flex align-items-center justify-center gap-2 pointer ">
            <i class="pi pi-plus font-size-small font-bold pointer primary" ></i>
            <span class=" primary font-size-small font-bold ">Add Booth</span>
            </div>
          </div>
          <Button v-if="isEditable"  outlined class="mx-3 my-2 flex gap-2">
            <i
              class="pi pi-plus font-size-small font-bold pointer primary"
            ></i>
            <span class="font-size-small font-bold pointer"> Add Employee </span>
          </Button>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from "vue";
  
  // declaration
  const isEditable = ref(false);
  // api declaration
  const selectedBooth = ref();
  const categoriesFacility = ref([
    { name: "active", code: "AC" },
    { name: "inactive", code: "IA" },
  ]);
  const facilityRooms = ref([]);
  // methods
  //editable
  const handleIsEdit = (val) => {
    val.boothInput = !val.boothInput;
    val.typeDropdown = !val.typeDropdown;
    val.showTextField = !val.showTextField;
    val.cancelBtn = !val.cancelBtn;
    val.saveBtn = !val.saveBtn;
    val.addBtn = !val.addBtn;
    val.editBtn = !val.editBtn;
    val.showAddBooth = !val.showAddBooth;
    isEditable.value = !isEditable.value;
  };
  // Facilities and rooms 
  const allFacilities = async () => {
    try {
      const response = await useMyFetch("/admin/facility_configurator/rooms/list?page=1&limit=10");
      const { data } = response;
      facilityRooms.value = data.value.results;
      facilityRooms.value.map((item) => {
        item.showTextField = false;
        item.cancelBtn = false;
        item.saveBtn = false;
        item.addBtn = false;
        item.editBtn = true;
      });
      
    } catch (err) {
      console.log("error Response:", err);
    }
  };
 
  // mounted
  onMounted(() => {
    allFacilities();
  });
  </script>
  <style lang="scss">
  .employee__Configurator {
    height: 89vh !important;
  
    .save_btn {
      padding: 0.25rem 0.95rem !important;
    }
    .cancel_btn {
      padding: 0.25rem 0.95rem !important;
    }
    .edit_btn {
      padding: 0.25rem 0.95rem !important;
      background-color: #fff !important;
    }
    .employeeTop__wrapper {
      min-height: 76vh !important;
      max-height: 76vh !important;
      overflow: auto !important;
    }
    .employeeTop__wrapper::-webkit-scrollbar {
      display: none !important; /* for Chrome, Safari, and Opera */
    }
    .all_employees {
      background: #f0f9ff !important;
      border-radius: 10px !important;
      padding: 12px !important;
    .employee__number{
    width: 1.7rem !important;
    height: 1.7rem !important;
    border-radius: 50% !important;
    background: #0A94FF !important ;
    span{
      color: #fff !important;
      font-size: 0.775rem !important;
    }
  }
    }
.service_input.p-inputtext{
  width: auto!important;
}
    .input_section {
      width: 30% !important;
    }
    .dropdown_section {
      width: 22% !important;
    }
    .dropdown_section .p-dropdown{
        width: 100% !important;
    }
    .dropdown_section .p-dropdown .p-dropdown-label {
    // font-size: 1rem !important;
    font-weight: 600 !important;
    color: #000000 !important;
  }
  .input_section .p-inputtext{
    color: #000000 !important;
    font-weight: 600 !important;
  }

  .timing_shift{
    min-width: 30% !important;
    max-width: 30% !important;
    padding: 10px 10px !important;
    border-radius: 10px !important;
    background: #F7F7F7 !important;

}
  }
  </style>
  