<template>
  <div class="bg-light card display-4">
    <Carousel
      :value="partners"
      :numVisible="5"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      class="custom-carousel bg-custom-color"
      :circular="true"
      :autoplayInterval="3000"
    >
      <template #header>
        <h5 class="h4 text-center text-white">We empower people globally to shift their upskilling</h5>
      </template>
      <template #item="slotProps">
        <div class="mt-5">
          <div class="partner-item-content">
            <div class="mb-1 m-auto" style="width:10em">
              <img
                :src= slotProps.data.imgurl
                :alt="slotProps.data.name"
                class="img-fluid m-auto"
               
              />
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
<script>
import Carousel from "primevue/carousel";
export default {
  components: {
    Carousel,
  },
  data() {
    return {
      partners: [
        { id: "1", name: "Amazon", imgurl: require('../../assets/images/amazon_test1.png'), rating: 5 },
        {
          id: "2",
          name: "Tech Mahindra",
          imgurl: require('../../assets/images/tm_test3.png'),
          rating: 5,
        },
        {
          id: "3",
          name: "Wallmart",
          imgurl: require('../../assets/images/wm_test5.png'),
          rating: 5,
        },
        { id: "4", name: "AT&T", imgurl: require('../../assets/images/att_test2.png'), rating: 5 },
        { id: "5", name: "Texas Instruments", imgurl: require('../../assets/images/ti_test5.png'), rating: 5},
        { id: "6", name: "Mercer", imgurl: require('../../assets/images/mercer_test6.png'), rating: 5},
        { id: "6", name: "Boeing", imgurl: require('../../assets/images/boeing_test4.png'), rating: 5},
      ],
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: "600px",
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: "480px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },
};
</script>
<style scoped>
 .bg-custom-color {
   background: linear-gradient(
    90deg,
    rgb(198, 0, 224) 0%,
    rgba(0, 172, 65, 1) 100%
  )
 }

 
  .custom-font {
     font-family: 'Lato', sans-serif; ;
     font-size: 2rem;
     font-weight: 900;
     color: rgba(0, 172, 65, 1);
    /* font-family: 'Lato', sans-serif; */
  }

  .partner-item-content{
    height: 20vh;
  }
</style>