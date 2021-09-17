<template>
  <div>
    <test-edit @saveTestDetails="saveTestDetails"></test-edit>
    <base-dialog ref="showDialog" :headerText="`Delete Test ${this.selectedTest.testName}`">
      <template v-slot:BodyTest >
          Do you Want to Delete this test?
      </template>
    </base-dialog>
    <h5 class="text-uppercase"> {{subjectName}} </h5>
    <DataTable
      :value="tests"
      responsiveLayout="scroll"
      :globalFilterFields="['testName', 'testYear']"
      :loading="loading"  
      v-model:filters="filters"
      filterDisplay="menu"
      class="table"
       dataKey="testId" :rowHover="true" 
       v-model:selection="selectedTest" selectionMode="single"
    >
      <template #header>
        <div class="row">
          <div class="col-3">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText class="form-control" v-model="filters['testName'].value" placeholder="Keyword Search" />
            </span>
          </div>
        </div>
      </template>
      <template #loading> Loading Tests data. Please wait. </template>
      <template #empty> No Tests found. </template>
      <Column field="testId" header="#"></Column>
      <Column field="testName" sortable header="Name">
        <template #body="{ data }">
          {{ data.testName }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
      </Column>
      <Column field="testDifficulty" sortable header="Dfifficulty Level"></Column>
      <Column field="testYear" sortable header="Test Year"></Column>
      <Column header="Actions">
        <template #body="{ data }">
          <div>
            <base-button class="me-2" @click="testDetailsLink(data.testId)"
              >Details</base-button
            >
            <base-button @click="DeleteTest(data.testId)">Delete</base-button>
          </div>
        </template>
      </Column>
      <template #footer>
          Total No. Of Tests Available: {{tests.length}}
      </template>
    </DataTable>
  </div>
</template>
<script>
import BaseButton from "../BaseControl/BaseButton.vue";
import TestEdit from "./TestCreateEdit.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { FilterMatchMode, FilterOperator } from "primevue/api";
export default {
  components: {
    TestEdit,
    DataTable,
    Column,
    InputText,
  },
  data() {
    BaseButton;
    return {
      filters: {
        'testName': { operator: FilterOperator.AND, constraints: [ { value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
      },
      tests: [],
      loading: true,
      selectedTest: {},
      subjectId: 0,
      subjectName: ''
    };
  },
  created() {
    this.subjectId =  this.$route.params.sid;
    this.GetTestsList();
  },
  computed: {},
  methods: {
    testDetailsLink(testId) {
      this.$router.push({ name: "questionsbyid", params: { testId: testId } });
    },
    DeleteTest(testId){
      console.log(testId);
      this.$refs.showDialog.openModal();
    },
    saveTestDetails(testObj) {
      testObj.subjectId = this.subjectId;
      
      fetch("http://localhost:5000/api/Question/SaveTest", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testObj),
      })
        .then((response) => response.json())
        .then(() => {
          this.GetTestsList();
        })
        .catch((error) => console.error("Unable to add item.", error));
    },
    GetTestsList() {
      fetch("http://localhost:5000/api/Question/GetTestModels?sid=" + this.subjectId)
        .then((response) => response.json())
        .then((data) => {
          this.subjectName = data.subjectName;
          this.tests = data.testViewModels;
          this.loading = false;
        })
        .catch((error) => console.error("Unable to get items.", error));
    },
  },
};
</script>