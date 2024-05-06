<template lang="">
    <div class="grid employee__Configurator">
      <div class="card col-12 flex flex-column gap-4">
        <!-- top Heading -->
        <div class="grid flex align-items-center justify-content-between">
          <h3 class="black_text font-weight-large">User Access Configurator</h3>
        </div>
        <!--  All Employee -->
        <div class="employeeTop__wrapper">
          <div class="flex flex-column gap-1" v-for="(item, index) in employees">
            <!-- All Employees Header -->
            <div
              class="all_employees flex align-items-center justify-content-between gap-4"
            >
              <!-- left  -->
              <div class="flex align-items-center gap-4 all_input">
                <InputText
                  id="name"
                  v-model="item.first_name"
                  placeholder="Enter name"
                  class=""
                  v-if="item.showTextField"
                />
                <h3 v-else class="font-bold">{{ item.first_name }}</h3>
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
          <!-- Sub Data -->
            <div class="flex align-items-center flex-wrap gap-4 mx-2 my-4">
              <div v-for="category of categories" :key="category.key" class="flex align-items-center gap-2 mr-5 custom_checkbox ">
                <Checkbox v-model="selectedCategories" :disabled="!item.nameInput" :inputId="category.key" name="category" :value="category.name" />
                <label :for="category.key">{{ category.name }}</label>
            </div>
            </div>
          </div>
          <Button outlined class="mx-3 flex gap-2">
            <i
              class="pi pi-plus font-size-small font-bold pointer primary"
            ></i>
            <span class="font-size-small font-bold pointer"> Add New Role </span>
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
  const categories = ref([
    {name: "Dashboard", key: "A"},
    {name: "Marketing", key: "M"},
    {name: "Leads", key: "P"},
    {name: "Bookings", key: "R"},
    {name: "Membership", key: "R"},
    {name: "Events", key: "P"},
    {name: "ProShop", key: "P"},
    {name: "Accounting", key: "P"},
    {name: "HRMS", key: "P"},
    {name: "Customer", key: "P"},
]);
const selectedCategories = ref(['Marketing']);
  const selectedAdmin = ref();
  const categoriesAdmin = ref([
    { name: "Super Admin", code: "NY" },
    { name: "Employee", code: "RM" },
  ]);
  const employees = ref([]);
  const EmployeesDetails = ref({});
  // methods
  //editable
  const handleIsEdit = (val) => {
    val.nameInput = !val.nameInput;
    val.showTextField = !val.showTextField;
    val.cancelBtn = !val.cancelBtn;
    val.saveBtn = !val.saveBtn;
    val.addBtn = !val.addBtn;
    val.editBtn = !val.editBtn;
    isEditable.value = !isEditable.value;
  };
  // all services
  const allEmployees = async () => {
    try {
      const response = await useMyFetch("/client/users/list/data");
      const { data } = response;
      employees.value = data.value;
      employees.value.map((item) => {
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
  // All EmployeesDetails
  const allEmployeesDetails = async () => {
    try {
      const response = await useMyFetch("/client/users/64db2568fdefc3230c42df7a");
      const { data } = response;
      EmployeesDetails.value = data.value;
    } catch (err) {
      console.log("error Response:", err);
    }
  };
  // mounted
  onMounted(() => {
    allEmployees();
    allEmployeesDetails();
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
      // min-height: 76vh !important;
      // max-height: 76vh !important;
      overflow: auto !important;
    }
    .employeeTop__wrapper::-webkit-scrollbar {
      display: none !important; /* for Chrome, Safari, and Opera */
    }
    .all_employees {
      background: #f0f9ff !important;
      border-radius: 10px !important;
      padding: 12px !important;
    }
    .input_section {
      width: 28% !important;
    }
    .input_section .p-dropdown .p-dropdown-label {
    // font-size: 1rem !important;
    font-weight: 600 !important;
    color: #000000 !important;
  }
  .input_section .p-inputtext{
    color: #000000 !important;
    font-weight: 600 !important;
  }
  .custom_checkbox{
    width: 13% !important;
  }
  .custom_checkbox .p-checkbox .p-checkbox-box {
    border-radius: 5px !important;
    width: 20px !important;
    height: 20px !important;
  }

  }
  </style>
  