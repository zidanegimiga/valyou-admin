<template lang="">
  <div class="grid employee__Configurator">
    <div class="card col-12 flex flex-column gap-4">
      <!-- top Heading -->
      <div class="grid flex align-items-center justify-content-between">
        <h3 class="black_text font-weight-large">Employee Configurator</h3>
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
          <!-- category description -->
          <div class="flex align-items-center flex-wrap gap-3 mx-2 my-4">
            <div class="input_section">
              <InputText
                id="name"
                v-model="item.first_name"
                placeholder="Enter name"
                class=""
                :disabled="!item.nameInput"
              />
            </div>
            <div class="input_section">
              <InputText
                id="name"
                v-model="item.last_name"
                placeholder="last name "
                class=""
                :disabled="!item.lastNameInput"
              />
            </div>
            <div class="input_section">
              <InputMask
                id="name"
                v-model="data"
                date="phone"
                mask="(999) 999-9999"
                placeholder="phone number"
                class=""
                :disabled="!item.numberInput"
              />
            </div>
            <div class="input_section">
              <InputText
                id="name"
                v-model="item.email"
                placeholder="james90harmison@gmail.com"
                class=""
                :disabled="!item.emailInput"
              />
            </div>
            <div class="input_section">
              <InputText
                id="name"
                type="password"
                v-model="item.password"
                placeholder="Enter pass"
                class=""
                :disabled="!item.slotsInput"
              />
            </div>
            <div class="input_section">
              <Dropdown
                v-model="selectedAdmin"
                :options="categoriesAdmin"
                optionLabel="name"
                placeholder="Super Admin"
                :disabled="!item.typeDropdown"
                class="w-full md:w-14rem"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- add new employee -->
      <div v-if="isEditable">
          <div
            class="all_employees flex align-items-center justify-content-between gap-4"
          >
            <div class="flex align-items-center gap-3 all_input">
             
              <h3  class="font-bold">New Employee</h3>
              <span class="font_exsmall note_text font-weight-large">
                Note to dev : name gets populated as they type
              </span>
            </div>
            <div class="flex gap-3">

              <img alt="svg" src="/icons/dell.svg" class="pointer" ripple />
              <img
                alt="svg"
                src="/icons/arrow_down.svg"
                class="pointer"
                ripple
              />
            </div>
          </div>
          <div class="flex align-items-center flex-wrap gap-3 mx-2 my-4">
            <div class="input_section">
              <InputText
                id="name"
                v-model="name"
                placeholder="Enter name"
                class=""
                
              />
            </div>
            <div class="input_section">
              <InputText
                id="name"
                v-model="name"
                placeholder="Enter last name "
                class=""
                
              />
            </div>
            <div class="input_section">
              <InputMask
                id="name"
                v-model="price"
                date="phone"
                mask="(999) 999-9999"
                placeholder="phone number"
                class=""
                
              />
            </div>
            <div class="input_section">
              <InputText
                id="name"
                v-model="email"
                placeholder="james90harmison@gmail.com"
                class=""
               
              />
            </div>
            <div class="input_section">
              <InputText
                id="name"
                v-model="slots_per_person"
                placeholder="Enter number"
                class=""
                
              />
            </div>
            <div class="input_section ">
              <Dropdown
                v-model="selectedAdmin"
                :options="categoriesAdmin"
                optionLabel="name"
                placeholder="Super Admin"
               
                class="w-full md:w-14rem"
              />
            </div>
          </div>
        <Button  outlined class="mx-3 flex gap-2">
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
  val.lastNameInput = !val.lastNameInput;
  val.numberInput = !val.numberInput;
  val.emailInput = !val.emailInput;
  val.slotsInput = !val.slotsInput;
  val.typeDropdown = !val.typeDropdown;
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
// mounted
onMounted(() => {
  allEmployees();
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
}
</style>
