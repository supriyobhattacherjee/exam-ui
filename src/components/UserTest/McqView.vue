<template>
  <form @submit.prevent="NextQuestion" v-if="question.questionText">
    <div class="shadow-sm p-3 mb-5 rounded">
      <samp>{{ question.questionText }}</samp>
    </div>
    <div
      class="shadow-sm p-3 mb-5 rounded row"
      v-for="(qOption, index) in question.questionOptions"
      :key="qOption.questionId"
    >
      <div class="col-3">
        <label class="form-check-label">{{ alphabetSequence[index] }}</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="QuestionOption" :value="qOption.questionOptionId" v-model="question.optionId" />
        </div>
      </div>
      <div class="col-7">
        <samp>{{ qOption.optionText }}</samp>
      </div>
    </div>
    <base-button>Next Question</base-button>
    <base-button @submit.prevent="submitFinalResult()">End Test</base-button>
  </form>
  <div v-else class="shadow-sm p-3 mb-5 rounded text-center">
      <samp>Congrats, You have completed your test!!</samp>
       <div class="fw-bold"> Go back to dashbord <router-link to="/student">click here</router-link></div>
</div>
<div v-if="isLoading">
      <h5>Your test submission is in progress!!!</h5>
</div>
</template>
<script>
export default {
  data() {
    return {
      question: {},
      qId: 0,
      isStart: true,
      loggedinUser: {},
      alphabetSequence: ["A", "B", "C", "D", "E"],
      mcqRequest: { testId: 0, qId: 0, isStart: true, userID: "", optionId: 0 ,sessionId: "" },
      slNo: 0,
      scoreResultRequest: {},
      isLoading: false
    };
  },
  watch: {
    $route(newRoute) {
      console.log(newRoute);
      this.LoadQuestion();
    },
  },
  methods: {
    LoadQuestion() {
      // console.log(newRoute);
      this.loggedinUser = this.$store.getters.getLoggedInUser;
      this.mcqRequest = this.$store.getters.getMcqRequest;
      this.slNo = !this.$route.params.tid ? 0 : this.$route.params.tid;
      fetch("http://localhost:5000/api/Users/RetrieveQuestionByTestId", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.mcqRequest),
      })
        .then((response) => response.json())
        .then((data) => {
          this.isLoading = false;
          this.question = data.question;
          
        })
        .catch((error) => console.error("Unable to get items.", error));
    },
    NextQuestion() {
      this.mcqRequest.qId = this.question.questionId;
      this.mcqRequest.optionId = this.question.optionId;
      this.mcqRequest.userId = this.loggedinUser.userId;
      this.mcqRequest.sessionId = this.question.sessionId;
      this.mcqRequest.isStart = false;
      this.$store.commit("storeMcqRequest", this.mcqRequest);
      this.$store.commit("storeLoggedInUser", this.loggedinUser);

      this.slNo++;
      this.$route.params.tid = this.slNo;
      this.$router.push({ name: "testbegin", params: { tid: this.slNo } });
    },
    submitFinalResult()
    {
      this.scoreResultRequest.sessionId = this.question.sessionId;
      this.scoreResultRequest.testId = this.testId;
      this.isLoading = true;

      this.$axios
        .post(this.$appconfiguration.API_BASE_URL_PATH + "test/SaveScore", this.scoreResultRequest )
        .then(() => (
                this.isLoading = false,
                this.subject = {}
            ))
        .catch(error => {
            this.errorMessage = error.message;
      console.error("There was an error!", error);
    });
    }
  },
  created() {
    this.LoadQuestion();
  },
};
</script>