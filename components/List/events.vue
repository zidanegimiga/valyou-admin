<template>
    <div class="cursor-pointer flex flex-column align-items-center avatar_wrap">
        <div class="relative">
            <Avatar :image="image" shape="circle" size="xlarge" />
            <div v-if="date == 'Today'" class="wish">WISH!</div>
        </div>
        <h2 class="name">{{ name }}</h2>
        <span class="date">{{ date }}</span>
    </div>
</template>

<script >
import { string } from 'yup';

export default {
    name: "EventsList",
    props: {
        name: {
            default: "Ahmed",
            type: String,
        },
        date: {
            default: "Today",
            type: String,
        },
        image: {
            default: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
            type: string,
        },
    },
};
</script>

<style scoped>
.avatar_wrap {
    width: 61px;
    margin: 10px 20px;

    .wish {
        position: absolute;
        left: 8px;
        top: 57px;

        width: 44px;
        height: 14px;
        background: #1AD598 0% 0% no-repeat padding-box;
        border-radius: 9px;
        opacity: 1;

        font-size: 9px;
        line-height: 14px;
        text-align: center;
        color: #2E2E2E;
        letter-spacing: 0px;
        font-weight: 600;
    }

    .name {
        font-size: 0.75rem;
        line-height: 0.875rem;
        text-align: center;
        color: #2E2E2E;
        letter-spacing: 0px;
        font-weight: 600;
        margin-top: 5px;
    }

    .date {
        font-size: 0.75rem;
        line-height: 0.875rem;
        text-align: center;
        color: #717D91;
        letter-spacing: 0px;
        margin-top: 4px;
    }
}
</style>
