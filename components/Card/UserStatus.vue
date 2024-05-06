<template>
    <Card class="card_container">
        <template #content>
            <div class="container">
                <div class="userInfo flex">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" v-badge.success="' '"
                        class="mr-2 p-overlay-badge custom_badge" size="xlarge" shape="circle" />
                    <div>
                        <p class="text-sm font-medium text-900">Welcome back!</p>
                        <h1 class="text-lg font-semibold text-900">{{ "Michael Cullighan" }}</h1>
                        <p class="text-xs font-medium text-gray-500">{{ "Leagal Advisor" }}</p>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex mr-5">
                        <div class="iconBackground emailIcon"><i class="pi pi-envelope" style="color: #0a94ff"></i></div>
                        <div class="ml-3">
                            <h1 class="text-xs font-medium text-gray-500">Unread Emails</h1>
                            <div class="text-lg text-primary font-bold">{{ "23" }}</div>
                        </div>
                    </div>
                    <div class="flex mr-5">
                        <div class="iconBackground taskIcon">
                            <img src="/icons/tasks.svg" alt="1">
                        </div>
                        <div class="ml-3">
                            <h1 class="text-xs font-medium text-gray-500">Pending Tasks</h1>
                            <div class="text-lg text-yellow-500 font-bold">{{ "14" }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: space-between;

    // .p-overlay-badge {
    //     position: relative;
    // }

    .custom_badge {
        margin-right: 1rem !important;

        :deep(.p-badge) {
            top: 14px;
            right: 5px;
            min-width: 0.7rem !important;
            height: 0.7rem !important;
            border: 2px solid #ffffff;
        }
    }

    .iconBackground {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .emailIcon {
        background: rgba(206, 234, 255, 1) 0% 0% no-repeat padding-box;
    }

    .taskIcon {
        background: rgba(255, 165, 0, 0.2) 0% 0% no-repeat padding-box;
    }

}
</style>
