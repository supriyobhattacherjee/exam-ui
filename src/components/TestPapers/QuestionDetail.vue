<template>
  <div>
    <div class="row">
      <div class="col-12 my-2">
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Question Text"
            v-model="question.questionText"
            style="height: 80px"
          ></textarea>
          <label for="floatingTextarea2">Question Text</label>
        </div>
      </div>
      <div
        class="row my-3"
        v-for="(option, index) in question.questionOptions"
        :key="option.questionOptionId"
      >
        <div class="col-10 float-left" v-if="!isTextAreaRequired">
          <input type="text" class="form-control" v-model="option.optionText" />
        </div>
        <div class="col-10 float-left" v-else>
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Question Text"
              v-model="option.optionText"
              style="height: 70px"
            ></textarea>
            <label for="floatingTextarea2">Question Text</label>
          </div>
        </div>
        <div class="col-1">
          <input type="checkbox" name="isCorrect" v-model="option.isCorrect" />
        </div>
        <div class="col-1">
          <base-button @click="removeOption(index)">Delete</base-button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <base-button @click="AddNewOption(false)" class="me-2"
            >New Option</base-button
          >
          <base-button @click="AddNewOption(true)" class="me-2"
            >New Option TextArea</base-button
          >
          <base-button @click="saveQuestion">Save</base-button>
          <base-button @click="BacktoQuestions" class="ms-2"> Cancel </base-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      question: {},
      questions: [],
      isTextAreaRequired: false,
      testId: ''
    };
  },

  methods: {
    AddNewOption(isSelected) {
      this.isTextAreaRequired = isSelected;
      if (this.question.questionOptions) {
        this.question.questionOptions.push({ optionText: "", isCorrect: true });
      } else {
        this.question.questionOptions = [{ optionText: "", isCorrect: false }];
      }
    },
    saveQuestion() {
      fetch("http://localhost:5000/api/Question/SaveQuestion", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.question),
      })
        .then((response) => response.json())
        .then(() => {
          this.$router.push({name: "questionsbyid", params: {testId : this.testId}});
        })
        .catch((error) => console.error("Unable to add item.", error));
    },
    removeOption(idx) {
      this.question.questionOptions.splice(idx, 1);
    },
    BacktoQuestions()
    {
        this.$router.push({ name: "questionsbyid", params: { testId: this.testId } });
    }
  },
  created() {
    let questionId = this.$route.params.qId;
    this.testId = this.$route.query.tid;
    this.question.testId = this.testId;
    if (questionId) {
      this.questions = this.$store.getters.getQuestions;
      this.question = this.questions.filter((x) => x.questionId == questionId)[0];
    }
  },
};
</script>