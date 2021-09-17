<template>
  <div class="row">
    <div class="col-6">
      <ExamCalendar></ExamCalendar>
    </div>
    <div class="col-6">
      <PieChart :basicData="graphData"></PieChart>
    </div>
  </div>
  <div class="row my-2">
    <div class="col-6">
      <div class="row">
        <div class="col-6">
          <Dropdown
            v-model="selectedTest"
            :options="tests"
            optionLabel="testName"
            id="test"
            style="width: 15rem"
            placeholder="Select a Test"
            @change="filterTestVersions()"
          />
        </div>
        <div class="col-6">
          <Dropdown
            v-model="selectedTestVersion"
            :options="testVersions"
            id="testVersion"
            style="width: 15rem"
            class="float-start"
            optionLabel="testVersionText"
            placeholder="Select a Test"
            
          />
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-4">
      <base-button @click="goToTest('10')">Start Test</base-button>
    </div>
  </div>
</template>
<script>
import ExamCalendar from "../BaseControl/TheCalendar.vue";
import PieChart from "../BaseControl/ThePieChart.vue";
import Dropdown from "primevue/dropdown";
export default {
  components: {
    ExamCalendar,
    PieChart,
    Dropdown,
  },
  data() {
    return {
        graphData: {},
        tests: [],
        testVersions: [],
        selectedTest: {},
        selectedTestVersion: {},
        loggedInUser: {},
        dataSets: [{label: 'C#', backgroundColor: 'blue', data: [12,34,55]}]
    };
  },
  methods: {
    goToTest(testId){
      let requestObj = {testId: testId, qId: 0, isStart: true, userID: this.loggedInUser.userId }
      this.$store.commit("storeMcqRequest",requestObj);
      this.$router.push({name: 'testbegin'});
    },
    getScoreGraph() {
      console.log('execute');
      this.graphData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October","Noveber", "December"
        ],
        datasets:  this.dataSets,
      };

    },
    async LoadGraphicalData()
    {
      const headers = { "Content-Type": "application/json" };
      await this.$axios.get(this.$appconfiguration.API_BASE_URL_PATH + "users/getScoreGraph?userId=" + this.loggedInUser.userId, {headers})
            .then(response => 
            {
             this.dataSets = response.data.responseObject, 
            console.log(response.data.ResponseObject)
            });
    },
    filterTestVersions() {
        let tId = this.selectedTest.testId
        this.testVersions = this.tests.filter(x=>x.testId == tId)[0].tests;
    }
  },
  created() {
    this.loggedInUser = this.$store.getters.getLoggedInUser;
    this.tests = [
      { testName: "C#", testId: 5, tests : [
          {testId : 5, testVersion : 1, testVersionText: 'c# Test 1'},
          {testId : 5, testVersion : 2, testVersionText: 'c# Test 2'},
      ] },
      { testName: "Java", testId: 6 , tests : [
          {testId : 6, testVersion : 1, testVersionText: 'Test 1'},
          {testId : 6, testVersion : 2, testVersionText: 'Test 2'},
      ] },
    ];

    this.LoadGraphicalData().then(() => {this.getScoreGraph()} )
  },
};
</script>