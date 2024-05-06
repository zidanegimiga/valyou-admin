const token = useAuth().token.value ?? "";
const baseURL = useRuntimeConfig().public.baseURL;

export const getCustomersOnDropdown = () => {
  const URL = "/client/customer/dropdown";
  return useFetch(URL, {
    baseURL,
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
};
// to cards customers
export const customerCards = () => {
  const URL = `/client/customer/all/counts`;
  return $fetch(URL, {
    baseURL,
    method: "GET",
    headers: {
      Authorization: token || useAuth().token.value,
    } 
  });
};


