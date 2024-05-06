export const data_current_user = {
  _id: "{{object-id}}",
  image_src: "https://randomuser.me/api/portraits/men/32.jpg",

  // GENERAL INFORMATION
  first_name: "First",
  last_name: "Last",
  nationality: "Indian",

  preferred_language: ["English", "French"],

  currency: "UAE Dirham",
  sales_rep: "Sales Rep",

  // CONTACT INFORMATION
  email_address: "example@any.com",
  mobile_number: {
    number: "+971-52 6813408",
    is_verified: true,
  },

  // REFERRAL DETAILS
  referral_id: "V001",
  sales_agent_name: "John Doe",

  // CUSTOMER LOCATIONS
  customer_location: [
    {
      type: "home", // work // custom
      flat_building: "Flat # 24, 3rd floor",
      street: "King Faisal Street",
      city: "Dubai",
      contact_no: "+971-52 6813408",
      is_default: true,
    },
    {
      type: "work", // work // custom
      flat_building: "Flat # 24, 3rd floor",
      street: "King Faisal Street",
      city: "Dubai",
      contact_no: "+971-52 6813408",
      is_default: false,
    },
    {
      type: "custom", // work // custom
      flat_building: "Flat # 24, 3rd floor",
      street: "King Faisal Street",
      city: "Dubai",
      contact_no: "+971-52 6813408",
      is_default: false,
    },
  ],
};

export const data_user_list = [
  {
    _id: "{{object-id}}",
    customer: {
      first_name: "First",
      last_name: "Last",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
];
