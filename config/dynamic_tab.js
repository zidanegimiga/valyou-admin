// this can be called by API

let dynamic_tabs = {
    // main_path : Tabs
    // "":[],
    "":[],
    customers:[
        // { label: "Overview", to: "/customers/overview"},
        { label: "Customers", to: "/customers" },
    ],
    "inventory":[
        // { label: "Overview", to: "/inventory" },
        { label: "Location", to: "/inventory/location" },
        { label: "All Inventory", to: "/inventory/all-inventory" },
        // { label: "Out Of Stock", to: "/inventory/out-of-stock" },
        // { label: "Reorder Point", to: "/inventory/reorder-point" },
        // { label: "Stock Adjustment", to: "/inventory/stock-adjustment" },

    ],

    "draw-manager":[
        // { label: "Overview", to: "/draw-manager" },
        { label: "Order Draw", to: "/draw-manager/draw-listing" },
        { label: "Manage Winners", to: "/draw-manager/mange-winners" },
        { label: "Free Draw", to: "/draw-manager/free-draw" },
    ],

    "marketing_campaigns" : [
        {label: 'Campaigns', to: "/marketing_campaigns"},
        {label: 'Broadcast Lists', to: "/marketing_campaigns/broadcast_lists"}
    ]
    
};

export default dynamic_tabs;