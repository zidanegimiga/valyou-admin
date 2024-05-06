<!-- this is for massages Page -->

<template lang="">
    <Card class="card-contact p-2 ">
        <template #content>

            <div class="flex flex-row w-full relative">

                <div class="flex flex-row">
                    <div class="father-Avatar">
                        <AvatarGroup>
                            <template v-if="status == 'green'">
                                <Avatar v-badge.success image="https://randomuser.me/api/portraits/men/43.jpg" size="large" shape="circle"/>
                            </template>

                            <template v-if="status == 'yalow'">
                                <Avatar class='yalow_color' v-badge image="https://randomuser.me/api/portraits/men/43.jpg" size="large" shape="circle"/>
                            </template>

                            <template v-if="status == 'grey'">
                                <Avatar v-badge.danger image="https://randomuser.me/api/portraits/men/43.jpg" size="large" shape="circle"/>
                            </template>
                            <!-- <Avatar v-badge.danger="''" image="https://randomuser.me/api/portraits/men/43.jpg" size="large" shape="circle"/>                             -->
                        </AvatarGroup>
                        <!-- <tag></tag> -->
                    </div>

                    <div class="flex flex-column">
                        <h1 class="ml-2">Name534 4r43 567</h1>
                        <h2 class="ml-2 text-sm  width-full">sub Tile </h2>
                    </div>
                </div>

                <div class="absolute text-xs right-0 bottom-0">
                    2023-04-32
                </div>

                

            </div>

            


            
            
        </template>
    </Card>
</template>
<script>
export default {
    name: "ContactCard",
    props: {
        // green yalow gray
        status: {
            type: String,
            default: 'yalow'
        }
    }
}
</script>
<style lang="scss" scoped>
.card-contact {
    background: rgb(222, 211, 211);
    box-shadow: unset;
}

h1{
    font-size: medium;
}

.grey_color .p-badge{
    background: #AFBBC6;
}

.yalow_color .p-badge{
    background: #FFBD08;
}



</style>

<style lang="scss">
.card-contact .p-card-content {
    display: flex;
    flex-direction: row;
    flex-direction: start;
    align-items: center;

}


.father-Avatar{

    .p-badge-dot{
        aspect-ratio: 1 / 1;
        width: 0.95rem;
        height: unset;
        border: 0.15rem solid white;
        bottom: 0;
    }

    .p-overlay-badge .p-badge {
        position: absolute;
        right: 0;
        margin: 0;
        top:unset !important;
        transform: unset !important;
        transform-origin: unset !important;
    }

}







</style>

