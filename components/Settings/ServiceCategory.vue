<template lang="">
    <div class=" grid Service__Configurator " >
    <div class="card col-12 flex flex-column gap-4">
      <!-- top Heading -->
      <div class="grid flex align-items-center justify-content-between" >
        <h3 class=" black_text font-weight-large">Service & Category Configurator</h3>
       
      </div>
      <!--  All Category -->
      <div class="category__wrapper" >
        <div class=" flex flex-column gap-1 mb-4" v-for="(item, index) in serviceAll">
        <!-- category Header -->
        <div class="all_category flex align-items-center justify-content-between gap-4 "  
        >
          <!-- left  -->
        <div class=" flex align-items-center gap-4 " >
          <div class="category__number flex align-items-center justify-content-center  " >
          <span>
            {{index+1}}
          </span>
        </div>
        <InputText
            id="name"
            v-model="item.name"
            placeholder="Enter name"
            class="service_input"
            v-if="item.showTextField"
          />
        <h3 v-else class="font-bold">{{item.name}}</h3>
        </div>
        <!-- right -->
        <div class=" flex gap-3 " >
           <!-- right cancel button -->
           <Button
            class=" cancel_btn "  severity="danger" outlined
            v-if="item.cancelBtn"
            @click="handleIsEdit(item)"
            >
            <span class=" font-bold">Cancel</span>
            </Button>
             <!-- right save button -->
            <Button
            class="p-button save_btn p-button-transparent"
            v-if=" item.saveBtn"
            @click="handleIsEdit(item)"
            >
            <span class="white_text font-bold"> Save </span>
            </Button>
             <!-- right edit button -->
        <img v-if=" item.editBtn"  alt="svg" src="/icons/edit.svg" class="pointer"  ripple @click="handleIsEdit(item)" />
          <!-- right dell button -->
        <img   alt="svg" src="/icons/dell.svg" class="pointer" ripple />
        <img  alt="svg" src="/icons/arrow_down.svg" class="pointer" ripple />
        </div>
        
        </div>
        <!-- category description -->
        <div class=" flex align-items-center category_description gap-2"  v-for="(item, index) in item.categories">
          <div class=" category_data custom_nameCategory flex align-items-center ">
            <InputText
            id="name"
            v-model="item.name"
            placeholder="Enter name"
            class=""
            v-if="isEditable"
          />
            <span v-else class="span_text font-size-small font-weight-large">
             {{item.name}}
            </span>
          </div>
          <div class=" category_data custom_priceCategory">
            <InputNumber
            id="name"
            v-model="item.price"
            placeholder="Enter name"
            class=""
            v-if="isEditable"
          />
            <span v-else class="span_text font-size-small font-weight-large">
              {{item.price}}
            </span>
          </div>
          <div class=" category_data custom_priceCategory">
            <InputText
            id="name"
            v-model="item.price_category"
            placeholder="Enter name"
            class=""
            v-if="isEditable"
          />
            <span v-else class="span_text font-size-small font-weight-large">
             {{item.price_category}}
            </span>
          </div>
          <div class=" category_data custom_slotCategory">
            <InputNumber
            id="name"
            v-model="item.slots_per_person"
            placeholder="Enter number"
            class=""
            v-if="isEditable"
          />
            <span v-else class="span_text font-size-small font-weight-large">
              {{item.slots_per_person}}
            </span>
          </div>
          <div class=" category_data custom_priceCategory">
            <span class="span_text font-size-small font-weight-large">
              Hours
            </span>
          </div>
          <img  v-if="isEditable" alt="svg" src="/icons/danger_dell.svg" class="pointer" ripple />

        </div>
        <!-- add some data  -->
        <div v-if="isEditable" class=" p-3 flex align-items-center justify-center gap-2 pointer ">
          <i class="pi pi-plus font-size-small font-bold pointer primary" ></i>
          <span class=" primary font-size-small font-bold ">Add Category</span>
        </div>
      </div>

      <Button v-if="isEditable" outlined class=" mx-3 flex gap-2 " >
        <i class="pi pi-plus font-size-small font-bold pointer primary" ></i>
        <span class=" font-size-small font-bold pointer">
          Add Service
        </span>
      </Button>
      </div>
      
      
      
    </div>
    </div>
   
</template>
<script setup>
import { ref,  onMounted} from "vue";

// declaration
const isEditable = ref(false);
// api declaration
const services = ref({});
const categories = ref([]);
const serviceAll = ref([]);
// methods
//editable
const handleIsEdit = (val) => {
    val.showTextField = !val.showTextField
    val.categories.nameInput = !val.categories.nameInput;
    // val.lastNameInput = !val.lastNameInput;
    // val.numberInput = !val.numberInput;
    // val.emailInput = !val.emailInput;
    // val.slotsInput = !val.slotsInput;
    val.cancelBtn = !val.cancelBtn
    val.saveBtn = !val.saveBtn
    val.addBtn = !val.addBtn
    val.editBtn = !val.editBtn
    isEditable.value = !isEditable.value;

};
// all services
const allServices = async () => {
  try {
    const response = await useMyFetch("/admin/service/categories/list?page=1&limit=10");
    const { data } = response;
    // console.log('data-===>',data.value);
    services.value = data.value;
    serviceAll.value = services.value.results
    serviceAll.value.map( item => {
        item.showTextField = false
        item.cancelBtn = false
        item.saveBtn = false
        item.addBtn = false
        item.editBtn = true
    })
   
  } catch (err) {
    console.log("error Response:", err);
  }
};

// mounted
onMounted(() => {
  allServices();
});
</script>
<style lang="scss">
.Service__Configurator{
height: 89vh !important;

.save_btn {
  padding: 0.25rem 0.95rem !important;
}
.cancel_btn {
  padding: 0.25rem 0.95rem !important;
}
.edit_btn{
  padding: 0.25rem 0.95rem !important;
  background-color: #fff !important;
}
.category__wrapper{
  min-height: 76vh !important;
  max-height: 76vh !important;
  overflow: auto !important;
}
.category__wrapper::-webkit-scrollbar {
  display: none !important; /* for Chrome, Safari, and Opera */
}
.all_category{
  background: #F0F9FF !important;
  border-radius: 10px !important;
  padding: 12px !important;
  .category__number{
    width: 1.7rem !important;
    height: 1.7rem !important;
    border-radius: 50% !important;
    background: #0A94FF !important ;
    span{
      color: #fff !important;
      font-size: 0.775rem !important;
    }
  }
  h3{

  }
}
.service_input.p-inputtext{
  width: auto!important;
}
.category_description{
  padding: 10px !important;
  .category_data{
  padding: 10px 10px !important;
  border-radius: 10px !important;
  background: #F7F7F7 !important;

}
.custom_nameCategory{
    min-width: 40% !important;
    max-width: 40% !important;
  }
  .custom_priceCategory{
    min-width: 15% !important;
    max-width: 15% !important;
  }
  .custom_slotCategory{
    min-width: 10% !important;
    max-width: 10% !important;
  }
}

}
</style>