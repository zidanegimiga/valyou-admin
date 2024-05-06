const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;


//------------ACTIVITIES-------------------

//get Draw list
export const getDrawList= (payload:Object) => {
  const URL = `/admin/draw/list_draw`;
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    } as HeadersInit,
    body: payload,
  });
};
