<template>
    <div class="li__wrap cursor-pointer relative flex justify-content-between" :class="{ active_secondary: is_active }">
        <div>
            <h2 class="text-sm font-semibold">{{ name }}</h2>
            <p class="text-xs font-normal gray_text" :class="{ message_color: is_active }">{{ message }}</p>
        </div>
        <div>
            <div><span class="text-xs font-medium text-900 mr-3">{{ date }}</span><span class="gray_text mr-3">{{ time
            }}</span>
            </div>
            <div class="flex justify-content-end mr-3 mt-1">
                <i class="mr-2"><img src="/icons/LucideFlag.svg" alt="1" class="icon_inbox"></i>
                <i class="mx-1"><img src="/icons/TablerTrash.svg" alt="2" class="icon_inbox"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "InboxList",
    props: {
        name: {
            default: "Samsung Electronics",
            type: String,
        },
        message: {
            default: "Corporate Section",
            type: String,
        },
        date: {
            default: "Today",
            type: String,
        },
        time: {
            default: "10:40 Am",
            type: String,
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

    // i {
    //     cursor: pointer;
    // }

    // &::after {
    //     content: '';
    //     position: absolute;
    //     bottom: -0.3rem;
    //     right: 0.4rem;
    //     width: 100%;
    //     height: 1px;
    //     border-radius: 2px;
    //     background: #f2efef;
    // }

    &.active_secondary {
        &::after {
            content: none;
        }
    }

    .icon_inbox {
        width: 15px;
        height: 15px;
    }

    .message_color {
        color: #000000;
    }
}
</style>
