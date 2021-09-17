<template>
  <form @submit.prevent="saveTest">
    <div class="form-group">
      <div class="row">
        <div class="col-md-3">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="testName"
              v-model="testObj.testName"
              placeholder="Test Name"
            />
          </div>
        </div>
        <div class="col-md-3">
          <select
            class="form-select"
            aria-label=".form-select-lg"
            v-model="testObj.testDifficulty"
          >
            <option selected>Difficulty level</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-md-3">
          <select class="form-select" 
          aria-label=".form-select-lg"
           v-model="testObj.testYear"
           >
            <option selected value="">Year</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div class="col-md-3">
          <base-button class="me-2">Save</base-button>
          <base-button @click.prevent="clearFields">Clear</base-button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import BaseButton from "../BaseControl/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      testObj: {},
    };
  },
  methods: {
    saveTest() {
      this.$emit("saveTestDetails", this.testObj);
      this.testObj = {};
    },
    clearFields()
    {
        this.testObj = {};
    }
  },
};
</script>