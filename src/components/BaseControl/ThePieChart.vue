<template>
    <Chart type="bar" :data="basicData" :options="basicOptions"/>
</template>
<script>
import Chart from 'primevue/chart';
export default {
    components: {Chart},
    props:['basicData', 'basicOptions'],
    data() {
        return {
			
		}
    },
}
</script>