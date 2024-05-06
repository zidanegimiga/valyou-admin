const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;

import { Get_Product } from "./shared";

export const CreateProduct = (payload) => {
  const URL = "admin/product/create_product";
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};

export const EditProduct = (payload, _id) => {
  const URL = "admin/product/" + _id;
  return $fetch(URL, {
    baseURL,
    method: "PUT",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};

export const GetProduct = (payload, _id) => {
  return Get_Product(payload, _id);
};

export const GetCategoryNames = (payload) => {
  const URL = "admin/product_category/get_category_names";
  return $fetch(URL, {
    baseURL,
    method: "GET",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};

export const GetBrands_list = (payload) => {
  const URL = "admin/configuration/get_brands";
  return $fetch(URL, {
    baseURL,
    method: "GET",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};
export const subCategoryList = async (id) => {
  try {
    const response = await useMyFetch(
      `/admin/product_category/list_subcategory/${id}`
    );
    return response.data.value.data;
  } catch (err) {
    console.log("error Response:", err);
  }
};

export const typeList = async (id) => {
  try {
    const response = await useMyFetch(
      `/admin/product_category/list_types/${id}`
    );
    return response.data.value.data;
  } catch (err) {
    console.log("error Response:", err);
  }
};

export const subTypeList = async (subCategoryId, typeId) => {
  try {
    let payload = {
      subcategory_id: subCategoryId,
      type_id: typeId,
    };
    const response = await useMyFetch(
      `/admin/product_category/list_subtypes/fetch`,
      {
        method: "POST",
        body: payload,
      }
    );
    return response.data.value.data;
  } catch (err) {
    console.log("error Response:", err);
  }
};
