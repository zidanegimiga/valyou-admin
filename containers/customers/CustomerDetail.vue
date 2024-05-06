<template lang="">
  <div>
    <!-- Top log section -->
    <div class="flex align-items-center justify-content-between mb-6">
      <div class="flex align-items-center gap-2">
        <div class="flex flex-column align-items-center logo_wrap mt-2">
          <PrimeUpdateAvatar
          @error="(e)=>{
            console.log('error no Image',image);
            selectedImageUrl = false
            selectedImage= false;
          }" 
          :image="selectedImage ? (selectedImageUrl ? selectedImageUrl : image_src) : ''"
          :image_clickable="true"

            :label="`${first_name} ${last_name}`"
            :splits_label_bool="true"
            :splits_only_first_last="true"
            shape="circle"
            class="custom_avatar"
            style="background: #5c9aa4; color: #fff" 
          />

          <div
            v-ripple
            class="edt_btn flex align-items-center justify-content-center p-ripple"
            @click="(e)=>{
              e.target.children[1]?.click()
            }"
          >
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              @change="handleImageUpload"
              accept="image/*"
            />
            <i
              class="pi pi-pencil"
              style="font-size: 1rem"
              @click="handleImageUpload"
            ></i>
          </div>
        </div>

        <!-- display data -->
        <div class="mt-2">
          <h1 class="mb-2 black_text font-weight-large capsize">
            {{ `${first_name} ${last_name}` }}
          </h1>
        </div>
      </div>
    </div>
    <!-- data Table  -->
    <div class="col-12">
      <div class="grid flex align-items-center justify-content-between">
        <span
          class="small__text black_text custom_spacing font-Bolder text_upper"
          >GENERAL INFORMATION</span
        >
        <Button
          class="p-button customer_filter_btn p-button-transparent"
          @click="
            $router.push(`/customers/SaveCustomer?_id=${route.query?._id}`)
          "
        >
          <span class="font-bold text-black-alpha-90"> Edit </span>
        </Button>
      </div>

      <div class="col-12 p-2 detail_table_wrap">
        <ListSimple2 category_text="First Name" :name="first_name" />
        <ListSimple2 category_text="Last Name" :name="last_name" />
        <ListSimple2 category_text="Gender" :name="gender" />
        <ListSimple2 category_text="Nationality" :name="nationality" />
        <ListSimple2
          category_text="Preferred Language"
          :list_names="preferred_language"
        />
        <!-- <ListSimple2 category_text="Currency" :name="currency" /> -->
        <ListSimple2 category_text="Sales Rep" :name="sales_rep" />
      </div>
      <span class="small__text black_text custom_spacing font-Bolder text_upper"
        >CONTACT INFORMATION</span
      >
      <ListSimple2 category_text="Email Address" :name="email_address" />

      <!-- add this future to ListSimple2 -->
      <div class="simple__list_wrap">
        <div class="sl__category_text">Mobile Number</div>
        <div
          class="sl__text flex algin-items-center gap-3"
          style="align-items: center"
        >
          <TextAutoFlagNumber v-model="mobile_number.number" />
        </div>
        <div class="sl__text">
          <span
            class="font-bold"
            v-if="mobile_number.is_verified"
            style="color: #1ad598"
            >Verified</span
          >
        </div>
      </div>

      <span class="small__text black_text custom_spacing font-Bolder text_upper"
        >REFERRAL DETAILS</span
      >
      <div class="col-12 p-2 detail_table_wrap">
        <ListSimple2 category_text="Referral ID" :name="referral_id" />
        <ListSimple2
          category_text="Sales Agent Name"
          :name="sales_agent_name"
        />
      </div>

      <span  class="small__text black_text custom_spacing font-Bolder text_upper"
        >CUSTOMER LOCATIONS</span
      >
      <div v-if="! (customer_location?.list_location?.length)" class="col-12"></div>
      <span v-if="! (customer_location?.list_location?.length)" class="font-bold">No Data</span>
      <div v-if="(customer_location?.list_location?.length)" class="col-12 p-2 detail_table_wrap">
        <ListSimpleLocations v-for="(item, index) in customer_location" :key="index" 
        :type="item.type"
        :list_location="item.list_location"
        :is_default="item.is_default"

        />
      </div>
    </div>
  </div>
</template>
<script setup>
// ---------------------------------------------------------------
// # Imports Section
import { inject } from 'vue'; // for connection with parents

// ## <- services imports ->

import {
  GetCustomer,
  EditCustomer
} from "@/services/customers/view_with_details";
import { getImagesURL } from "@/services/common/api_resource"

// ## <- dummyData imports ->

// import {
//   data_current_user as d_cu,
//   data_user_list as d_ul,
// } from "@/dummyData/customers/customers_detail"

// ## <- containers & pages imports ->

//  import CustomerDetail from "@/containers/customers/CustomerDetail"

// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY
import { ref, defineEmits, onMounted } from "vue"

import { useToast } from "primevue/usetoast"
// You should to make shore this Components added to your template or layout
// <Toast position="top-right" />

// ## <- containers Async imports ->
// const CustomerOrder = defineAsyncComponent(()=>import("@/containers/customers/CustomerOrder.vue"));

const toast = useToast();
const router = useRouter();
const route = useRoute();

const state = inject('sharedState'); 
// to be able to interact with both components, whether the parent or the child, any changes you make in one of the components will be updated in the other. 
// in parent you should to add 
`
import { reactive, provide } from 'vue';
const state = reactive({
  // data or variables 
  customer_type:'dog'
});
provide('sharedState', state);
`


// <- container config ->
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  disableApi: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:data"]);
const container_Data = computed({
  // getter
  get() {
    return props.data
  },
  // setter
  set(newValue) {
    emit("update:data", newValue)
    
  }
});


watch(container_Data, (newVal) => {
  emit("update:data", newVal)
});

const route_query_id = computed(()=>route.query?._id)
watch(route_query_id, (val)=>{
  onAPI_call()
})

// how to use it in parent
// <im_component :data="data" @update:data="(value)=> data = value" />



// ---------------------------------------------------------------
// # Setup Components Controls like design
// dd means DropDown
// dp means DatePiker
// cb means CheckBox
// txt means TextArea
// inp means Input
// ~ other use same name of component

// Example
// inp_SellPrice = ref('');
// dd_SellPrice = ref('');

// for edit Image
const selectedImage = ref(null);
const selectedImageUrl = ref("");


// GENERAL INFORMATION
const image_src = ref("")
const first_name = ref("First")
const last_name = ref("Last")
const gender = ref("Gender")
const nationality = ref("Nationality")
const preferred_language = ref(["English", "French"])
const currency = ref("Currency")
const sales_rep = ref("Sales Rep")

// CONTACT INFORMATION
const email_address = ref("example@any.com")
const mobile_number = ref({
  number: "+971-52 6813408",
  is_verified: true,
})

// REFERRAL DETAILS
const referral_id = ref("V001")
const sales_agent_name = ref("John Doe")

// CUSTOMER LOCATIONS
const customer_location = ref([
  {
    type: "home", // work // custom
    flat_building: "Flat # 24, 3rd floor",
    street: "King Faisal Street",
    address:"Office 2502, 25st floor, Marina Plaza Tower,74, Al Marsa Street - Dubai Marina - Dubai - United Arab Emirates",
    city: "Dubai",
    contact_no: "+971-52 6813408",
    is_default: true,
  },
  {
    type: "work", // work // custom
    flat_building: "Flat # 24, 3rd floor",
    street: "King Faisal Street",
    address:"Office 2502, 25st floor, Marina Plaza Tower,74, Al Marsa Street - Dubai Marina - Dubai - United Arab Emirates",
    city: "Dubai",
    contact_no: "+971-52 6813408",
    is_default: false,
  },
  {
    type: "custom", // work // custom
    flat_building: "Flat # 24, 3rd floor",
    street: "King Faisal Street",
    address:"Office 2502, 25st floor, Marina Plaza Tower,74, Al Marsa Street - Dubai Marina - Dubai - United Arab Emirates",
    city: "Dubai",
    contact_no: "+971-52 6813408",
    is_default: false,
  },
])


// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);

// ## for displays

// ---------------------------------------------------------------
// # Setup Validation 

// ---------------------------------------------------------------
// Functions For design

// ---------------------------------------------------------------
// Watch's for For design

// ---------------------------------------------------------------
// API Integration
// ## sets variables integrations


// ## resets Components Control for integrations


// ## Watch's for API Integration

// ## Functions For API Integration
// Kept it for handle Upload an Image but this not the best practices
const handleImageUpload = async (event) => {
  
  // Trigger the file input element directly
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) {
    fileInput.click()
  }
  if (event.target.files) {
    const file = event.target.files[0]
    // Display the selected image preview
    selectedImage.value = file
    selectedImageUrl.value = URL.createObjectURL(file)
    // return

    const form_data = new FormData()
    try {

      toast.add({
        severity: "info",
        summary: "Handling Image",
        detail: "Please Wait ...",
        life: 3000,
      })

      form_data.append("file", selectedImage.value, selectedImage.value.name)
      let res_images = await getImagesURL(form_data)
      selectedImageUrl.value = res_images?.data.map((item) => item?.url)[0];
      state.current_image_url = selectedImageUrl.value;

      

      
      await EditCustomer({
        image_url: selectedImageUrl.value,
      },route.query?._id);
      toast.add({
        severity: "success",
        summary: "Handling Image is Completed",
        detail: "",
        life: 3000,
      });

      // old code

      
    } catch (err) {
      toast.add({
        severity: "error",
        summary: "updated failed",
        detail: "",
        life: 3000,
      })
    }
  }
}

// ## Submit Form

// ## onMounted // when we call the api


const handleApi = () => {
  // handel data here from input controls before send it
  selectedImage.value = null;
  selectedImageUrl.value = ""

	
  // return function from services as $fetch Promise 
  // Example 
  //  return get_data_from_api();

  
  if (route.query?._id) {
    return GetCustomer({}, route.query?._id)
  }

  return Promise.resolve();
};

// handleData for display data from api
const handleData = (data) => {
  if (data == undefined){
    return undefined
  }

  image_src.value = data.image_url;
  if(image_src.value){
    selectedImage.value = true;
  }

  // GENERAL INFORMATION
  first_name.value = data.first_name ? data.first_name : '-';
  last_name.value = data.last_name ? data.last_name : '-' ;
  gender.value = data.gender ? data.gender : '-' ;
  nationality.value = data.nationality ? data.nationality : '-';

  preferred_language.value = data.preferred_languages?.length > 0 ? data.preferred_languages : ['-']

  currency.value = "no data" // NO_API
  sales_rep.value = Object.keys(data.sales_rep_list).length > 1 ? `${data.sales_rep_list.first_name} ${data.sales_rep_list.last_name}` : '-'

  // CONTACT INFORMATION
  email_address.value = data.email ? data.email : '-';
  mobile_number.value = {
        number:
          "+" +
          (data.country_code[0] == "+" ? `${data.country_code.slice(1)}` :data.country_code) +
          "-" +
          data.mobile.toString().slice(0, 2) +
          " " +
          data.mobile.toString().slice(2),
        
          is_verified: false, // NO_API
      }

  // REFERRAL DETAILS
  referral_id.value = data.referral_id ? data.referral_id  : "-"
  sales_agent_name.value = "no data" // NO_API

  // CUSTOMER LOCATIONS
  customer_location.value = data.user_location.map((item) => ({
        type: item.tag, // work // custom
              

        list_location: [
          {
          pram:"Address",
          value: item.address
        },

        {
          pram:"City",
          value: item.city,
        },

        {
          pram:"Contact No",
          value: item.contact_no
        },
      ],
        is_default: item.is_selected,
      })
      )
    

  state.data_current_user = {
    _id:data?._id,
    code: data?.code,
    first_name: data?.first_name,
    last_name:data?.last_name,
    image: data?.image_url ? data?.image_url : ''
  }

  };

  

// <- call api ->

const onAPI_call = () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi ) {

    handleApi().then((res) => {
        handleData(res);
      });

    // getMatter_list().then((res) => {
    //   let val = res?.data.map((item) => ({
    //     label: item?.matter_name,
    //     id: item?.id,
    //   }));
    //   matter_id.value = val[0]?.id;
    //   dd_matter.value = val[0]?.id;
    //   dd_matter_items.value = val;
    // });
  }
}

onAPI_call()

onMounted(() => {
  // onAPI_call()
})


// ----old code 




// Kept it for handle Upload an Image but this not the best practices
// const handleImageUpload = async (event) => {
//   // msg
//   toast.add({
//     severity: "info",
//     summary: "Sorry",
//     detail: "We are working on this future please wait it until finish",
//     life: 3000,
//   })

  
//   // Trigger the file input element directly
//   const fileInput = document.querySelector('input[type="file"]')
//   if (fileInput) {
//     fileInput.click()
//   }
//   if (event.target.files) {
//     const file = event.target.files[0]
//     // Display the selected image preview
//     selectedImage.value = file
//     selectedImageUrl.value = URL.createObjectURL(file)
//     return

//     try {
//       var formdata = new FormData()
//       formdata.append("document", selectedImage.value, selectedImage.value.name)

//       // Upload to API
//       // const response = await useMyFetch(`client/generic/simpleupload`, {
//       //   method: "POST",
//       //   body: formdata,
//       // })
//       let response = null
//       const { data } = response

//       // customer_profile.value = data.value[0]
//       // updateProfile()
//     } catch (err) {
//       toast.add({
//         severity: "error",
//         summary: "updated failed",
//         detail: "",
//         life: 3000,
//       })
//     }
//   }
// }



</script>




<style lang="scss">
.custom__column {
  display: flex !important;
  gap: 0.625rem !important;
  flex-wrap: wrap !important;
}
.details_table .p-datatable-table th {
  background-color: #fff !important;
  display: none !important;
}
.logo_wrap {
  position: relative !important;
  .edt_btn {
    width: 1.8rem !important;
    height: 1.8rem !important;
    position: absolute !important;
    background-color: #fff !important;
    border-radius: 50% !important;
    box-shadow: 0.2px 0.2px 3px 0.2px;
    z-index: 11;
    bottom: -15px !important;
    // right: -10px !important;
    right: 0 !important;
    cursor: pointer !important;
    transform: translate(0px, -13px);
  }
}

.customer_filter_btn {
  padding: 0.25rem 0.95rem !important;
  background-color: #fff !important;
}

.custom_avatar {
  span.p-avatar-text {
    font-size: xx-large !important;
  }
}
</style>
