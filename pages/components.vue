<template lang="">
  <div class="grid p-2">
    <!--CARDS-->

    <div class="col-12">
      <h1 class="component_heading">Cards</h1>
      <div class="grid">
        <div class="col-12 md:col-2">
          <CardCountIcon title="Total Projects" count="12" color="#FFBF5E" />
        </div>
        <div class="col-12 md:col-2">
          <CardCount label="Non Contacted <br/>Leads" count="120000" />
        </div>
        <div class="col-12 md:col-2">
          <CardCount :is_colored="true" label="Dynamic Talents<br/>Admin" />
        </div>
        <div class="col-12 md:col-2">
          <CardInfo />
        </div>
        <div class="col-12 md:col-2">
          <CardInfo>
            <template v-slot:title>
              <p class="gray_text">Samsung Electronics</p>
            </template>
            <template v-slot:subtitle>
              <h1>100</h1>
            </template>
          </CardInfo>
        </div>
      </div>
      <div class="grid">
        <div class="col-12 md:col-2">
          <CardData />
        </div>
        <div class="col-12 md:col-3">
          <CardProfile />
        </div>
      </div>
      <div class="grid">
        <div class="col-12 md:col-3">
          <CardProfile :showSeparator="true">
            <template v-slot> This is Customized Slot </template>
          </CardProfile>
        </div>
      </div>
      <div class="grid">
        <div class="col-12 md:col-2">
          <CardContact title="Samsung Electronics" />
        </div>
      </div>
    </div>
    <!--ICONS-->
    <div class="col-12">
      <h1 class="component_heading">Icons</h1>
      <div>
        <p class="gray_text mb-2">Usage:</p>
        <pre><code>&lt;i class=&quot;pi pi-check&quot;&gt;&lt;/i&gt;</code></pre>
        <p class="gray_text mt-2">Available Iconsets: PrimeIcons</p>
      </div>
    </div>
    <!--TYPOGRAPHY-->
    <div class="col-12">
      <h1 class="component_heading">Typography</h1>
      <div>
        <h1>This is H1 Text</h1>
        <h2>This is H2 Text</h2>
        <h3>This is H3 Text</h3>
        <h4>This is H4 Text</h4>
        <h5>This is H5 Text</h5>
        <h6>This is H6 Text</h6>
      </div>
      <div class="mt-3">
        <table class="simple-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>gray_text</td>
              <td><p class="gray_text">This is gray text</p></td>
            </tr>
            <tr>
              <td>
                <span
                  v-for="(item, index) in [
                    'small',
                    'normal',
                    'medium',
                    'large',
                  ]"
                  >font-size-{{ item }}&emsp;</span
                >
              </td>
              <td>
                <span
                  v-for="(item, index) in [
                    'small',
                    'normal',
                    'medium',
                    'large',
                  ]"
                  :class="`font-size-${item}`"
                  >font-size-{{ item }}&emsp;</span
                >
              </td>
            </tr>
            <tr>
              <td>text-overline</td>
              <td><p class="text-overline">Text Overline</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--BUTTONS-->
    <div class="col-12">
      <h1 class="component_heading">Buttons</h1>
      <div class="flex gap-2">
        <!-- Primary -->
        <Button>Primary Button</Button>
        <Button
          icon="pi pi-check"
          aria-label="Submit"
          label="Text as Label"></Button>
        <Button :loading="true" label="loading Button"></Button>
        <Button label="Secondary" severity="secondary" />
        <Button label="Success" severity="success" />
        <Button label="Info" severity="info" />
        <Button label="Warning" severity="warning" />
        <Button label="Help" severity="help" />
        <Button label="Danger" severity="danger" />
      </div>
      <div class="flex gap-2 mt-2">
        <Button outlined label="Outlined Button"></Button>
        <Button raised label="Outlined Button"></Button>
        <Button disabled label="Disabled Button"></Button>
      </div>
      <div class="flex gap-2 mt-2">
        <Button icon="pi pi-check" aria-label="Filter" />
        <Button icon="pi pi-check" rounded aria-label="Filter" />
        <Button icon="pi pi-check" rounded outlined aria-label="Filter" />
        <Button icon="pi pi-check" text raised rounded aria-label="Filter" />
        <Button icon="pi pi-check" text rounded aria-label="Filter" />
      </div>

      <div class="flex gap-2 mt-2">
        <ButtonsNRadio v-model="ButtonsNRadio_model" label="Chose 1" value="1" />
        <ButtonsNRadio v-model="ButtonsNRadio_model" label="Chose 2" value="2" />
      </div>
    </div>
    <!--TABLES-->
    <div class="col-12">
      <h1 class="component_heading">Table</h1>
      <div class="grid">
        <div class="col-12">
          <div class="card">
            <!-- <DataTable :value="products" tableStyle="min-width: 50rem">
              <Column field="code" header="Code"></Column>
              <Column field="name" header="Name"></Column>
              <Column field="category" header="Category"></Column>
              <Column field="quantity" header="Quantity"></Column>
            </DataTable> -->
          </div>
        </div>
      </div>
    </div>
    <!--STEPPER-->
    <div class="col-12">
      <h1 class="component_heading">Stepper</h1>
      <div class="card col-12 md:col-10">
        <CustomStepper />
      </div>
    </div>
    <!--EDITOR-->
    <div class="col-12">
      <h1 class="component_heading">Quill Editor</h1>
      <div class="card">
        <Editor v-model="editor" editorStyle="height: 320px" />
      </div>
    </div>
    <!--INPUTS-->
    <div class="col-12">
      <h1 class="component_heading">Inputs</h1>
      <div class="grid">
        <div class="col-12 md:col-4">
          <InputTextCustom v-model="simple_text" />
        </div>
        <div class="col-12 md:col-4">
          <CustomInputContainer label="Input Mask">
            <template v-slot>
              <InputMask
                id="basic"
                v-model="input_mask"
                mask="99-999999"
                placeholder="99-999999" />
            </template>
          </CustomInputContainer>
        </div>
        <div class="col-12 md:col-4">
          <CustomInputContainer label="Number Input">
            <template v-slot>
              <InputNumber
                v-model="number_number"
                placeholder="Enter your number"
                :minFractionDigits="2"
                :maxFractionDigits="3" />
            </template>
          </CustomInputContainer>
        </div>
        <!-- <div class="col-12 md:col-4">
          <CustomInputContainer label="Select Input">
            <template v-slot>
              <Dropdown
                v-model="select_input"
                showClear
                :options="products"
                optionLabel="name"
                placeholder="Select a Product" />
            </template>
          </CustomInputContainer>
        </div> -->
        <div class="col-12 md:col-4">
          <InputPhone v-model:dialCode="dial_code" v-model="phone_number" />
        </div>

        <div class="col-12 md:col-4">
          <CustomInputField
            label_text="Email Address*"
            type="text"
            placeholder="someone@example.com"
            icon="pi pi-check-circle"
            v-model="user_email"></CustomInputField>
        </div>

        <div class="col-12 md:col-4">
          <CustomInputField
            label_text="Password*"
            type="password"
            placeholder="Your password"
            v-model="user_password"></CustomInputField>
        </div>

        <div class="col-12 md:col-4">
          <CustomInputContainer label="Secondary Address">
                <template v-slot>
                  <Textarea
                    v-model="value"
                    autoResize
                    rows="5"
                    cols="30"
                    placeholder="Enter address"
                  />
                </template>
              </CustomInputContainer>
        </div>
      </div>
    </div>

    <!--Dropdowns-->
    <div class="col-12">
      <h1 class="component_heading">Dropdowns</h1>
      <div class="grid">
        <div class="col-12 md:col-2">
          <CustomDropDownsDropA style="min-width: 170px"  v-model="dd_CustomDropDownsDropA" placeholder="Due date" :options="CustomDropDownsDropA_list" />
        </div>
      </div>
    </div>
    <!--UPLOADS-->
    <div class="col-12">
      <h1 class="component_heading">Uploads</h1>
      <div class="grid">
        <div class="col-12 md:col-6">
          <UploadFile v-model="files" />
        </div>
      </div>
    </div>
    <!--LISTS-->
    <div class="col-12">
      <h1 class="component_heading">Lists</h1>
      <div class="grid">
        <div class="col-12 md:col-4">
          <ListAvatar />
        </div>
        <div class="col-12 md:col-4">
          <ListInfo />
        </div>
        <div class="col-12 md:col-4">
          <ListSimple category_text="This is Category Prop" />
          <ListSimple category_text="This is Category Prop">
            <template v-slot:content>
              <div v-for="(item, index) in 2" :key="index">
                <span class="font-bold">Lorem, ipsum dolor.</span> Lorem, ipsum
                dolor.
              </div>
            </template>
          </ListSimple>
        </div>
      </div>
    </div>
    <!--DIALOGS-->
    <div class="col-12">
      <h1 class="component_heading">Dialogs</h1>
      <div class="flex gap-2">
        <DialogCustomerFilter
          btn_text="Customer Filter"
          @submit="handleCustomerFilter" />
        <DialogDatabaseFilter
          btn_text="Database Filter"
          @submit="handleDatabaseFilter" />

        <Button severity="secondary" @click.prevent="request_dialog = true"
          >Request Dialog</Button
        >

        <Button severity="secondary" @click.prevent="document_dialog = true"
          >Documentt Dialog</Button
        >
        <Button severity="secondary" @click.prevent="meeting_dialog = true"
          >Meeting Dialog</Button
        >
        <DialogLeadsFilter
          btn_text="Leads Filter"
          @submit="handleLeadsFilter" />
        <Button severity="secondary" @click.prevent="reminder_dialog = true"
          >Reminder Dialog</Button
        >
        <Button severity="secondary" @click.prevent="discard_dialog = true"
          >Discard Lead Dialog</Button
        >
        <DialogAddNewMeeting v-model="meeting_dialog"></DialogAddNewMeeting>
        <DialogAddDocument v-model="document_dialog"></DialogAddDocument>
        <DialogAddNewRequest v-model="request_dialog"></DialogAddNewRequest>
        <DialogReminder v-model="reminder_dialog" @submit="handleReminder" />
        <DialogDiscardLead
          v-model="discard_dialog"
          @submit="handleDiscardLead" />
      </div>
    </div>

    <!--SEARCH-->
    <div class="col-12">
      <h1 class="component_heading">Search</h1>
      <div class="grid">
        <div class="col-12 md:col-3">
          <SearchSimple v-model="search_value" />
        </div>
      </div>
    </div>

    <div class="col-3">
      <SearchInput placeholder="Search people" icon_color="#AFBBC6" />
    </div>

    <!--CHARTS-->
    <div class="col-12">
      <h1 class="component_heading">Charts</h1>
      <div class="grid">
        <div class="col-12 md:col-6">
          <ChartBarCombo />
        </div>
        <div class="col-12 md:col-6">
          <ChartPie />
        </div>
        <div class="col-12 md:col-6">
          <ChartGauge>
            <template v-slot:contents> This is content Slot </template>
          </ChartGauge>
        </div>
        <div class="col-12 md:col-6">
          <ChartBar title="Leads Overview" v-model="barFilter" />
        </div>
      </div>
    </div>

    <!--KANBAN BOARD-->
    <div class="col-12">
      <h1 class="component_heading">Kanban Board</h1>
      <div class="grid">
        <div class="col-12">
          <KanbanBoard v-model="kanban_data" />
        </div>
      </div>
    </div>

    <!--COLORS-->
    <div class="col-12">
      <h1 class="component_heading">Colors</h1>
      <div class="flex gap-2">
        <span
          v-for="(item, index) in colors"
          class="color_span"
          :style="{ background: item }"
          >{{ item }}</span
        >
      </div>
    </div>

    <!--UTILITY CLASSES-->
    <div class="col-12">
      <h1 class="component_heading">Utility Class</h1>

      <div class="mt-3">
        <table class="simple-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>active</td>
              <td class="pa-1">
                <span class="active px-2 py-1"> Active Span </span>
              </td>
            </tr>
            <tr>
              <td>active_secondary</td>
              <td class="pa-1">
                <span class="active_secondary px-2 py-1">
                  Active Secondary Span
                </span>
              </td>
            </tr>
            <tr>
              <td>disabled</td>
              <td class="pa-1">
                <span class="disabled px-2 py-1"> Disabled Span </span>
              </td>
            </tr>
            <tr>
              <td>nav_tab_menu</td>
              <td class="pa-1">
                use this class for&nbsp;<code
                  >&lt;TabView class=&quot;nav_tab_menu&quot;&gt;</code
                >&nbsp;if you have navigation tabs in your page.
              </td>
            </tr>
            <tr>
              <td>custom__icon_btn</td>
              <td class="pa-1">
                use this class for&nbsp;<code
                  >&lt;Button icon=&quot;pi pi-plus&quot;
                  class=&quot;custom__icon_btn&quot;/&gt;</code
                >&nbsp;if you need small icon button.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  const ButtonsNRadio_model = ref('')

  const dd_CustomDropDownsDropA = ref("A");
const CustomDropDownsDropA_list = [
  "A",
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "A6",
  "A7",
  "A8",
]
</script>

<script>
// import { products } from "@/dummyData/products";
// import { stringsToItems } from "@/components/utils/utils.js";

definePageMeta({
  layout: "empty",
});

export default {
  name: "ComponentsPage",
  data() {
    return {
      meeting_dialog: false,
      request_dialog: false,
      editor: "",
      input_mask: "",
      simple_text: null,
      number_number: null,
      select_input: null,
      search_value: "",
      dial_code: null,
      phone_number: "",
      toggler: false,
      colors: ["#1BD598", "#3494FF", "#FBB536", "#895BF1", "#F3654A"],
      barFilter: "",
      reminder_dialog: false,
      files: [],
      kanban_data: [
        {
          id: "customer_enquiry",
          name: "Customer Enquiry",
          group: "items",
          items: stringsToItems([
            "Cancel dragging",
            "Multiselect",
            "Accessibility",
            "UI Tests",
            "Keyboard navigation",
          ]),
        },
        {
          id: "meeting_scheduled",
          name: "Meeting Scheduled",
          group: "items",
          items: stringsToItems(["Fix drag settling jankiness"]),
        },
        {
          id: "proposal_sent",
          name: "Proposal Sent",
          group: "items",
          items: stringsToItems([]),
        },
        {
          id: "proposal_approved",
          name: "Proposal Approved",
          group: "items",
          items: stringsToItems(["Vue 3 support", "TypeScript support"]),
        },
        {
          id: "proposal_declined",
          name: "Proposal Declined",
          group: "items",
          items: stringsToItems(["Vue 3 support", "TypeScript support"]),
        },
        {
          id: "contract_sent",
          name: "Contract Sent",
          group: "items",
          items: stringsToItems(["Vue 3 support", "TypeScript support"]),
        },
        {
          id: "closed_won",
          name: "Closed-Won",
          group: "items",
          items: stringsToItems(["Vue 3 support", "TypeScript support"]),
        },
        {
          id: "closed_failed",
          name: "Closed-Failed",
          group: "items",
          items: stringsToItems(["Vue 3 support", "TypeScript support"]),
        },
      ],
      discard_dialog: false,
      document_dialog: false,
    };
  },
  mounted() {
    this.$primevue.config.ripple = true;
  },
  methods: {
    handleCustomerFilter(value) {
      console.log({ value });
    },
    handleDatabaseFilter(value) {
      console.log({ value });
    },
    handleRequestFilter(value) {
      console.log({ value });
    },
    handleLeadsFilter(value) {
      console.log({ value });
    },
    handleReminder(value) {
      console.log({ value });
    },
    handleDiscardLead(value) {
      console.log({ value });
    },
  },
};
</script>
<style lang="scss">
.color_span {
  padding: 0.5rem;
  text-align: center;
  width: 100px;
  border-radius: 8px;
  color: #fff;
}
</style>
