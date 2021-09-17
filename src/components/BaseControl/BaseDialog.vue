<template>
        <Dialog :header="headerText" v-model:visible="displayModal" :style="{width: '30vw'}" :modal="true">
            <p class="p-m-0">
                <slot name="BodyTest"></slot>
            </p>
            <template #footer>
                <base-button label="No"  @click="closeModal" class="p-button-text">No</base-button>
                <base-button label="Yes" @click="closeModal" autofocus >Yes</base-button>
            </template>
        </Dialog>
</template>
<script>
import Dialog from 'primevue/dialog';
export default {
    props:{
        headerText: {
            required : true
        }
    },
     components: {
       Dialog
     },
    data() {
        return {
            displayModal: false
        }
    },
    methods: {
        closeModal() {
            this.displayModal = false;
        },
         openModal() {
            this.displayModal = true;
        },
    },
}
</script>