<template>
  <div class="container-fluid align-center">
    <TheNavBar></TheNavBar>
    <div>
      <TheBanner></TheBanner>
    </div>
    <ProgramSection></ProgramSection>
    <div>
      <ThePartners></ThePartners>
    </div>
    <div>
      <TheStatistics></TheStatistics>
    </div>
  <TheFooter></TheFooter>
  </div>
</template>
<script>
import TheFooter from "./components/Layout/TheFooter.vue";
import TheNavBar from "./components/Layout/TheNavbar.vue";
import TheBanner from "./components/Layout/TheBanner.vue";
import ProgramSection from "./components/Layout/ProgramSection.vue";
import ThePartners from './components/Layout/ThePartners.vue';
import TheStatistics from './components/Layout/TheStatistics.vue';

export default {
  components: {
    TheFooter,
    TheNavBar,
    TheBanner,
    ProgramSection,
    ThePartners,
    TheStatistics
  },
  computed: {},
  data: function () {},
  methods: {},
};
</script>
<style>
</style>