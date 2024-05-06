// Config Example

/*
{
 settings: {

  status_colors: {
   Primary: "default",
   INSTOCK: "success",
   information: "info",
   "IM Status": "warning",
   OUTOFSTOCK: "danger"
  },

  actions_menu: [
   {
    label: "Refresh",
    icon: "pi pi-refresh"
   },
   {
    label: "Export",
    icon: "pi pi-upload"
   }
  ],

  actions_btns: [
   "View",
   "Edit"
  ]

 },
 
 headers: [
     { field: "lead_id", header: "Lead ID", type: "text" },
      
      { field: "customer", header: "Customer name",type: "text",
        value: "customer.first_name + ' ' + customer.last_name"
      },
      { field: "customer_type", header: "Customer Type", type: "text"},

      { field: "assigned_to", header: "Assigned to", type: "text",
        value: "assigned_to.first_name + ' ' + assigned_to.last_name"
         },
      { field: "lead_owner", header: "Lead Owner", type: "text",
        value: "lead_owner.first_name + ' ' + lead_owner.last_name"
        },
      { field: "createdAt", header: "Creation Date", type: "date" },
      { field: "actions", header: "Actions", type: "actions" },
      { field: "status",  header: "Status",  type: "status" },

 ],

*/

export const data_keys = {
  _test_key_d: {
    settings: { actions_btns: ["View", "Reassign"] },
    headers: [
      { field: "lead_id", header: "Lead ID", type: "text" },

      {
        field: "customer",
        header: "Customer name",
        type: "text",
        value: "customer.first_name + ' ' + customer.last_name",
      },
      { field: "customer_type", header: "Customer Type", type: "text" },

      {
        field: "assigned_to",
        header: "Assigned to",
        type: "text",
        value: "assigned_to.first_name + ' ' + assigned_to.last_name",
      },
      {
        field: "lead_owner",
        header: "Lead Owner",
        type: "text",
        value: "lead_owner.first_name + ' ' + lead_owner.last_name",
      },
      { field: "createdAt", header: "Creation Date", type: "date" },
      { field: "actions", header: "Actions", type: "actions" },
      // { field: "customer_type",  header: "Status",  type: "status" },
    ],
  },

  _test_key_: {
    settings: {
      status_colors: {
        "Personal Care": "warning",

        INSTOCK: {
          color: "#1AD598",
          bg_color: "#1AD59833",
        },
        DISCONTINUED: {
          color: "#895BF1",
          bg_color: "#895BF133",
        },

        "REORDER POINT": {
          color: "#FFB536",
          bg_color: "#FFB53633",
        },

        "OUT OF STOCK": {
          color: "#F3654A",
          bg_color: "#F3654A33",
        },
      },
      actions_menu: [
        // {
        //   label: "Refresh",
        //   icon: "pi pi-refresh",
        // },
        // {
        //   label: "Export",
        //   icon: "pi pi-upload",
        // },
      ],
      actions_btns: ["view"],
      MenuPopFilterSelects_filter: [
        // {
        //   label: "Status",
        //   modelItems: ["All", "DISCONTINUED", "REORDER POINT", "IN STOCK", "OUT OF STOCK"],
        //   selectedItems: "",
        //   InputType: "dropdown",
        // },

        // {
        //   field: "status",
        //   label: "Status",
        //   modelItems: {
        //     api_link:"https://valyouapi-dev.devnhr.com/admin/product_component/status_list"
        //   },
        //   selectedItems: "",
        //   InputType: "dropdown",
        // },

        // {
        //   field: "location",
        //   label: "Location",
        //   modelItems: ["Dubai", "Union", "Brsha"],
        //   selectedItems: [],
        //   InputType: "multiSelect",
        // },

        {
          field: "category_name",
          label: "Category",
          modelItems: [
            "Personal Care",
            "Kitchen Needs",
            "Home Needs",
            "Personadttdj Care",
          ],
          selectedItems: [],
          InputType: "multiSelect",
        },
      ],

      MenuPopFilterDates_filter: [
        {
          field: "created_at",
          label: "Date Created",
          // selectedItems: {
          //   from: "",
          //   to: "",
          // }
        },
      ],

      MenuPopFilterSort_filter: [
        {
          field: "created_at",
          label: "Sort Date",
        },
        {
          field: "cost_price",
          label: "Price",
        },
      ],
    },

    headers: [
      {
        field: "operation_mode",
        header: "Operation Mode",
        type: "text",
        value: "operation_mode",
      },
      {
        field: "warehouse_name",
        header: "Warehouse",
        type: "text",
      },
      {
        field: "quantity",
        header: "Quantity",
        type: "text",
        value: "quantity",
      },
      {
        field: "sku",
        header: "sku",
        type: "text",
      },
      {
        field: "product_name",
        header: "Product",
        type: "text",
        value: "product_name",
      },
      {
        field: "Location",
        header: "Location",
        type: "text",
        value: "location ? location : 'Not IN API'",
      },
      {
        field: "Cost_Price",
        header: "Cost",
        type: "text",
        value: "Cost_Price + ' AED'",
      },
      {
        field: "Production",
        header: "Production",
        type: "text",
        value: "'Not IN API'",
      },
      {
        field: "Selling_Price",
        header: "Selling Price",
        type: "text",
        value: "Selling_Price + ' AED'",
      },
      {
        field: "Total_Stock",
        header: "Stock In Hand",
        type: "text",
        value: "Total_Stock",
      },
      {
        field: "Expiry",
        header: "Expiry",
        type: "text",
        value: "'Not IN API'",
      },
      {
        field: "status",
        header: "Status",
        type: "status",
      },
      {
        field: "actions",
        header: "Actions",
        type: "actions",
      },
    ],
  },

  _locations_key: {
    settings: {
      actions_btns: ["View", "Edit"],
    },
    headers: [
      {
        field: "warehouse_name",
        header: "Warehouse",
        type: "text",
      },
      {
        field: "stock_in_hand",
        header: "stock",
        type: "text",
      },
      {
        field: "area",
        header: "Area",
        type: "text",
      },
      {
        field: "city",
        header: "Emirate",
        type: "text",
      },
      {
        field: "country",
        header: "Country",
        type: "text",
      },
      {
        field: "zip_code",
        header: "Zip Code",
        type: "text",
      },
      {
        field: "email",
        header: "Email",
        type: "text",
      },
      {
        field: "contact_no",
        header: "Contact",
        type: "text",
      },
      {
        field: "actions",
        header: "Actions",
        type: "actions",
      },
    ],
  },
  _campaigns_key: {
    settings: {
      actions_btns: ["Start Campaign"],
      MenuPopFilterSelects_filter: [
        {
          field: "campaign_type",
          label: "Campaign Type",
          modelItems: ["sms", "email"],
          InputType: "dropdown",
        },
      ],
    },
    headers: [
      {
        field: "campaign_name",
        header: "Campaign",
        type: "text",
      },
      {
        field: "campaign_message",
        header: "SMS Body",
        type: "text",
      },
      {
        field: "status",
        header: "Status",
        type: "status   ",
      },
      {
        field: "createdAt",
        header: "Created on",
        type: "text",
      },
      {
        field: "actions",
        header: "Actions",
        type: "actions",
      },
    ],
  },

  _campaigns_broadcast_key: {
    settings: {
      MenuPopFilterSelects_filter: [
        {
          field: "type",
          label: "Campaign Type",
          modelItems: ["mobile", "email"],
          InputType: "dropdown",
        },
      ],
    },
    headers: [
      {
        field: "first_name",
        header: "Lead Name",
        type: "text",
      },
      {
        field: "mobile",
        header: "Contact",
        type: "text",
      },
      {
        field: "dnd_activated",
        header: "DND Status",
        type: "text",
      },
      {
        field: "actions",
        header: "Actions",
        type: "actions",
      },
    ],
  },
};
