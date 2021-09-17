<template>
    <Calendar v-model="date14" :inline="true" :showWeek="true" />
</template>
<script>
import Calendar from 'primevue/calendar';
export default {
    components:{Calendar},
    data() {
        return {
            date14: null,
        }
    },
}
</script>