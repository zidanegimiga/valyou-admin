const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;

import {Get_Draw } from "./shared";

export const CreateDraw = (payload) => {
  const URL = "admin/draw/create_draw";
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};

export const EditDraw = (payload,_id) => {
    const URL = "admin/draw/"+_id;
    return $fetch(URL, {
      baseURL,
      method: "PUT",
      headers: {
        Authorization: token || useAuth().token.value,
      },
      body: payload,
    });
  };

export const GetDraw = (payload,_id) => {
    return Get_Draw(payload,_id)
  };

  export const GetProductsNames_list = (payload) => {
    const URL = "admin/product/products_for_draw"
    return $fetch(URL, {
      baseURL,
      method: "GET",
      headers: {
        Authorization: token || useAuth().token.value,
      },
      body: payload,
    });
  };