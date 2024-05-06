import { Get_Order } from "./shared";
const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;

export const GetOrder = (payload, _id) => {
  return Get_Order(payload, _id);
};

// This code to send the data as an object with parameters
export const PutOrderStatus = (payload, _id, params) => {
  const URL = `admin/orders/${_id}`;
  return $fetch(URL, {
    baseURL,
    method: "PUT",
    headers: {
      Authorization: token || useAuth().token.value,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    params: params
  });
};

// HOW TO USE 
// PutOrderStatus(payload, _id, { status: 'Moved to Logistics' });


export const GetUserByID = (payload, _id, params) => {
  const URL = `admin/user/${_id}`;
  return $fetch(URL, {
    baseURL,
    method: "GET",
    headers: {
      Authorization: token || useAuth().token.value,
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(payload),
    params: params
  });
};

// This code to send the data as an object with parameters
export const CreateShipment = (payload) => {
  const URL = `admin/shipment/create_carrier_shipment`;
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};