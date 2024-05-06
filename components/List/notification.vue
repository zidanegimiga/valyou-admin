<template>
    <div class="li__wrap cursor-pointer relative flex align-items-start" :class="{ active_secondary: is_active }">
        <div>
            <div class="iconBackground" :class="[status]"><img :src="`/icons/${status}.svg`" :alt="status" class="icon">
            </div>
        </div>
        <div class="ml-5  text_wrap">
            <div>
                <h2>{{ title }}</h2>
                <p>{{ message }}</p>
            </div>
            <div v-if="image">
                <img :src="image" alt="" class="image">
            </div>
        </div>
    </div>
</template>
<script>
import { string } from 'yup';

export default {
    name: "NotificationList",
    props: {
        status: {
            default: "approved",
            type: string,
        },
        title: {
            default: "Your Leave Request is Approved",
            type: String,
        },
        message: {
            default: "Corporate Section",
            type: String,
        },
        image: {
            default: "",
            type: string,
        },
        is_active: {
            default: false,
            type: Boolean,
        },
    },
};
</script>

<style lang="scss" scoped>
.li__wrap {
    display: grid;
    padding: 0.6rem;
    border-radius: 10px;
    grid-template-columns: 37px 1fr 20px;
    column-gap: 0.4rem;
    align-items: center;

    &::after {
        content: '';
        position: absolute;
        bottom: -0.3rem;
        right: 0.4rem;
        width: 88%;
        height: 1px;
        border-radius: 2px;
        background: #f2efef;
    }

    &.active_secondary {
        &::after {
            content: none;
        }
    }
}

.iconBackground {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
        width: 20px;
    }
}

.text_wrap {
    h2 {
        font-size: 0.875rem;
        line-height: 17px;
        letter-spacing: 0px;
        font-weight: 600;
        color: #2E2E2E;
    }

    p {
        font-size: 0.75rem !important;
        color: #717D91 !important;
    }

    .image {
        width: 80%;
        margin-top: 1rem;
    }
}

.rejected {
    background: #F3654A33 0% 0% no-repeat padding-box;
    opacity: 1;
}

.approved {
    background: #0A94FF33 0% 0% no-repeat padding-box;
    opacity: 1;
}

.informed {
    background: rgba(255, 165, 0, 0.2) 0% 0% no-repeat padding-box;
}
</style>