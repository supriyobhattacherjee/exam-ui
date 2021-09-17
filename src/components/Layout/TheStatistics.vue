<template>
    <Carousel :value="statisticalFigures" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions"
    class="card custom-carousel bg-custom-color">
	<template #header>
	</template>
	<template #item="slotProps">
		<div class="col-12">
            <div class="bg-transparent">
                
                <div >
                    <div class="m-1 text-center"><i class="m1 fs-1" :class="slotProps.data.icon"></i></div>
                    <div class="fs-1 fw-bolder text-center">{{slotProps.data.figure}}</div>
                    <div class="fs-6 fw-bold text-center">{{slotProps.data.text}}</div>

                </div>
            </div>
        </div>
	</template>
</Carousel>
</template>
<script>
import Carousel from 'primevue/carousel';
export default {
    components: { Carousel },
    data() {
	return {
		responsiveOptions: [
			{ breakpoint: '1024px', numVisible: 3, numScroll: 3},
			{ breakpoint: '600px', numVisible: 2, numScroll: 2},
			{ breakpoint: '480px', numVisible: 1, numScroll: 1},
		],
        statisticalFigures: [
            {id: 1, text: "Clients", figure: '5000+', icon: 'pi pi-users'},
            {id: 2, text: "Organization Assesed", figure: '50+', icon: 'pi pi-globe'},
            {id: 2, text: "Students Assessed Yearly", figure: '1 Million+', icon: 'pi pi-user-plus'},
            {id: 2, text: "Serviced", figure: '250+', icon: 'pi pi-cog'},
            {id: 2, text: "Exams Annually", figure: '10,000+', icon: 'pi pi-book'},
            {id: 2, text: "Institutes", figure: '110+', icon: 'pi pi-home'},

        ]
	}
},

}
</script>
<style scoped>
.bg-custom-color {
   background: linear-gradient(
    90deg,
    rgb(198, 0, 224) 0%,
    rgba(0, 172, 65, 1) 100%
  )
 }
</style>