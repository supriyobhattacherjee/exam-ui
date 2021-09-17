<template>
  <div>
    <div class="row my-2">
        <div class="col-12">
            <base-button @click="AddNewQuestion">Add Question</base-button>
        </div>
    </div>
    <table class="table table-striped table-hover">
      <thead>
        <tr class="row px-5">
          <th scope="col" class="col-1">#</th>
          <th scope="col" class="col-9">Question Text</th>
          <th scope="col" class="col-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in questions" :key="question.questionId" class="row px-5">
          <td scope="row" class="col-1">{{ question.questionId }}</td>
          <td class="col-9 text-wrap">{{ question.questionText }}</td>
          <td class="col-2">
            <base-button @click="GotoQuestionDetails(question.questionId)" class="me-2">Detail</base-button>
            <base-button>Delete</base-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
    data() {
        return {
            questions: [],
            testId: ''
        }
    },
    methods: {
        GetTestsList() {
            this.testId = this.$route.params.testId
            fetch(`http://localhost:5000/api/Question/GetQuestions?testId=${this.testId}`)
            .then((response) => response.json())
            .then((data) => {
                this.questions = data;
            })
            .catch((error) => console.error("Unable to get items.", error));
        },
        GotoQuestionDetails(id)
        {
            this.$store.commit("storeQuestions", this.questions);
            this.$router.push({name: "questionview", params: {qId : id}, query: {tid : this.testId}});
        },
        AddNewQuestion()
        {
            this.$router.push({name: "questionview", query: {tid: this.testId}})
        }
    },
    created() {
        this.GetTestsList();
    },
}
</script>