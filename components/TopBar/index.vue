<template lang="">
  <client-only>
    <div class="topbar__container">
      <span class="mr-2 font-bold" style="color: #1d1d1d">{{User_Name}}</span>
      <Avatar icon="pi pi-user" class="mr-2" shape="circle" />
      <i class="pi pi-angle-down cursor-pointer" style="color: #8d98a9" @click="toggle" aria-haspopup="true" aria-controls="user-menu" ></i>

      <Menu
      ref="menu_user"
      id="user-menu"
      :popup="true"
        :model="[
          {
            label: 'logout',
            class:'text-red-500',
            icon: 'pi pi-sign-out text-red-500',
            command: logout,
          },
        ]"
      />
    </div>
  </client-only>
</template>
<script setup>
import { ref } from 'vue';
const { signOut } = useAuth();

const { getSession } = useAuth();

const  User_Name = ref();


getSession().then((res)=>{
  User_Name.value = `${res.data.first_name} ${res.data.last_name}`
});

const router = useRouter();
const route = useRoute();

const menu_user = ref(null);

const toggle = (event) => {
  menu_user.value.toggle(event);
};

// const token = useAuth().token?.value || useCookie("auth:token").value || "";
// const { remove } = useCookie()
// not best practice it's temporary solution
const logout = async ()=>{

  // const credentials = {
  //   refreshToken: token,
  // }

  // await signOut(credentials).then((_) => {
  //   router.push("/login")
  // })

  // remove('auth:token')

  useCookie("auth:token").value = "";

  // router.push("/login");
  navigateTo("/", { external: true })

}
</script>

<style lang="scss">
#user-menu .p-menuitem-text{
  color: var(--red-500) !important;
}

</style>
