<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Subjects</h5>
      <p class="card-text">
        <input type="text" class="form-control" v-model="subject.subjectName" />
      </p>
      <a href="#" class="btn btn-primary" @click="SaveSubject()"
        >Add New Course</a
      >
    </div>
    <div class="text-danger">
        {{errorMessage}}
    </div>
  </div>
  <DataTable
    :value="testSubjects"
    responsiveLayout="scroll"
    :loading="loading"
    class="table"
    dataKey="testSubjectId"
    :rowHover="true"
    @click="GotoSubjectTests()"
    v-model:selection="selectedSubject" selectionMode="single"
  >
    <Column field="subjectName" sortable header="Courses">
    </Column>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: {
    Column,
    DataTable,
  },
  data() {
    return {
      selectedSubject: {},
      loading: false,
      subject: {},
      errorMessage: "",
      testSubjects: [
        { subjectId: 1, subjectName: "C#" },
        { subjectId: 2, subjectName: "Java" },
        { subjectId: 3, subjectName: "Sql Server" },
      ],
    };
  },
  methods: {
    GetSubjects() {
      const headers = { "Content-Type": "application/json" };
      this.$axios
        .get(this.$appconfiguration.API_BASE_URL_PATH + "test/GetSubjects", { headers })
         .then(response =>  this.testSubjects = response.data);
    },
    SaveSubject()
    {
    //   const headers = { "Content-Type": "application/json" };
        this.$axios
        .post(this.$appconfiguration.API_BASE_URL_PATH + "test/SaveSubject", this.subject )
        .then(() => (
                this.GetSubjects(),
                this.subject = {}
            ))
        .catch(error => {
            this.errorMessage = error.message;
      console.error("There was an error!", error);
    });
    },

    GotoSubjectTests(){
        console.log(this.selectedSubject);
        this.$router.push({name: 'testlink', params: { sid: this.selectedSubject.testSubjectId }})
    }
  },
  created() {
      this.GetSubjects()
  },
};
</script>