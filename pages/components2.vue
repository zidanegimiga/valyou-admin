<template lang="">
  <div class="grid p-2">
    <!-- KanbanBoard -->
    <div class="col-12">
      <h1 class="component_heading">Kanban Board</h1>
      <div class="grid">
        <div class="col-12">
          <KanbanBoard v-model="kanban_data" />
        </div>
      </div>
    </div>

    <!--CARDS-->

    <div class="col-12">
      <h1 class="component_heading">Cards</h1>
      <div class="grid">
        <div class="col-12 md:col-3">
          <CardProfileNew>
          </CardProfileNew>
        </div>
        <div class=" col-12 md:col-5 " >
          <CardBgCard/>
        </div>
        <div class=" col-12 md:col-5 " >
          <CardMembership></CardMembership>
        </div>
        <div class=" col-12 md:col-5 " >
          <CardMembership :_textColor="'#F3654A'" :logo_image="'/images/logoDisabled.png'" />
        </div>
        <div class="col-12 md:col-2">
          <CardCount  label="Non Contacted <br/>Leads" count="120000" />
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
                <span v-for="(item, index) in ['small', 'normal', 'medium', 'large']"
                  >font-size-{{ item }}&emsp;</span
                >
              </td>
              <td>
                <span
                  v-for="(item, index) in ['small', 'normal', 'medium', 'large']"
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
        <Button icon="pi pi-check" aria-label="Submit" label="Text as Label"></Button>
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
        <div class="col-12 md:col-12">
          <InputTextAreaCustom v-model="area_text" />
        </div>
        <div class="col-12 md:col-4">
          <InputTextCustom v-model="simple_text" />
        </div>

        <div class="col-12 md:col-4">
          <CustomInputContainer label="Input Mask">
            <template v-slot>
              <InputMask id="basic" v-model="input_mask" mask="99-999999" placeholder="99-999999" />
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
                :maxFractionDigits="3"
              />
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
                placeholder="Select a Product"
              />
            </template>
          </CustomInputContainer>
        </div> -->
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
        </div>
      </div>
    </div>
    <!--DIALOGS-->
    <div class="col-12">
      <h1 class="component_heading">Dialogs</h1>
      <div class="flex gap-2">
        <DialogCustomerFilter btn_text="Customer Filter" @submit="handleCustomerFilter" />
        <DialogDatabaseFilter btn_text="Database Filter" @submit="handleDatabaseFilter" />
        <DialogLeadsFilter btn_text="Leads Filter" @submit="handleLeadsFilter" />
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
                <span class="active_secondary px-2 py-1"> Active Secondary Span </span>
              </td>
            </tr>
            <tr>
              <td>disabled</td>
              <td class="pa-1">
                <span class="disabled px-2 py-1"> Disabled Span </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
// import { products } from "@/dummyData/products";

definePageMeta({
  layout: "empty",
});

export default {
  name: "ComponentsPage",
  data() {
    return {
      editor: "",
      input_mask: "",
      simple_text: null,
      number_number: null,
      select_input: null,
      search_value: "",
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
    handleLeadsFilter(value) {
      console.log({ value });
    },
  },
};
</script>
<style lang="scss"></style>
