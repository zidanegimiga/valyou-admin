const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;

import {Get_Customer, Edit_Customer } from "./shared";

export const CreateCustomer = (payload) => {
  const URL = "admin/user/create_customer";
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};

export const EditCustomer = (payload,_id) => {
    return Edit_Customer(payload,_id)
  };

export const GetCustomer = (payload,_id) => {
    return Get_Customer(payload,_id)
  };


export const get_Nationalities_languages_list = (payload) => {
    const URL = "admin/configuration";
    return $fetch(URL, {
      baseURL,
      method: "GET",
      headers: {
        Authorization: token || useAuth().token.value,
      },
      body: payload,
    });
  };

  export const get_SalesRep_list = (payload) => {
    const URL = "admin/user/list_sales_rep";
    return $fetch(URL, {
      baseURL,
      method: "GET",
      headers: {
        Authorization: token || useAuth().token.value,
      },
      body: payload,
    });
  };