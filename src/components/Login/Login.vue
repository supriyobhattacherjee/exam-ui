<template>
  <form @submit.prevent="UserLogin" class="text-dark bg-light rounded-3">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="mb-3">
          <label for="username" class="form-label fw-bold"
            >Email address or Mobile</label
          >
          <input
            type="text"
            class="form-control"
            name="email"
            placeholder="name@example.com"
            v-model="loginModel.email"
          />
          <div v-if="submitted && v$.loginModel.email.$error">
            <small class="text-danger">User Name is required.</small>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="mb-3">
          <label for="section-red login current-password" class="form-label fw-bold">Password</label>
          <input
            type="password"
            class="form-control"
            name="password"
            placeholder="password"
            autocomplete="cur"
            v-model="loginModel.password"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 offset-md-3">
        <base-button mode="flat">Submit</base-button>
        <base-button mode="createLink" class="ms-1" @click="RegisterAccount"
          >Create your Account Now!!</base-button
        >
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 offset-md-3 mt-3">
        <b>Forget Password </b><a href="#" class="link-primary">click here</a>
      </div>
    </div>
  </form>
</template>
<script>
import BaseButton from "../BaseControl/BaseButton.vue";
import useVuelidate from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";

export default {
  components: { BaseButton },
  data() {
    return {
      v$: useVuelidate(),
      loginModel: { email: "", password: "" },
      loggedInUser: {},
      submitted: false,
    };
  },
  validations() {
    return {
      loginModel: {
        email: { email, required },
        password: { required, minLength: minLength(3) },
      },
    };
  },
  methods: {
    UserLogin() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      fetch("http://localhost:5000/api/Users/Login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.loginModel),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.userId > 0) {
            this.loggedInUser = data;
            this.$store.commit("storeLoggedInUser", data);

            if(data.userType === 3)
                this.$router.push({ name: "usertest" });
            else
                this.$router.push({ name: "userslist" });
          } else {
            this.loggedInUser = null;
            this.$store.commit("storeLoggedInUser", this.loggedInUser);
          }
        })
        .catch((error) => console.error("Unable to get items.", error));
    },
    RegisterAccount() {
      this.$router.push("/createuser");
    },
  },
};
</script>