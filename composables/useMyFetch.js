export const useMyFetch = (request, opts) => {
  // console.log('optssss',opts);
  const config = useRuntimeConfig();

  // const token = useAuth().token.value;

const token = useAuth().token.value || useCookie("auth:token").value || '';

  return useFetch(request, {
    baseURL: config.public.baseURL,
    headers: {
      Authorization: token,
    },
    ...opts,
  });
};
