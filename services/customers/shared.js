const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;

export const Get_Customers_list = (payload) => {
  const URL = "admin/user/list_all_customer";
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};

export const Get_Customer = (payload, _id) => {
  const URL = "admin/user/customer/" + _id;
  return $fetch(URL, {
    baseURL,
    method: "GET",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    //   body: payload,
  });
};


export const Edit_Customer = (payload,_id) => {
  const URL = "admin/user/customer/"+_id;
  return $fetch(URL, {
    baseURL,
    method: "PUT",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};