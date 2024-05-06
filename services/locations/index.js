const token = useAuth().token.value ?? "";
const baseURL = useRuntimeConfig().public.baseURL;

export const getLocationsList = () => {
  const URL = "/admin/warehouse-location/list";
  return useFetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token,
    },
  });
};