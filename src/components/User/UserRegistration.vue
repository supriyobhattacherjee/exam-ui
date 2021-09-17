<template>
  <form @submit.prevent="saveuser">
    <div class="row">
      <div class="col-6 form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="firstName"
          placeholder="Sam,Alex"
          autocomplete="on"
          v-model="user.firstName"
        />
        <label for="floatingInput">First Name</label>
      </div>
      <div class="col-6 form-floating">
        <input
          type="text"
          class="form-control"
          id="lastName"
          placeholder="Last Name"
          autocomplete="on"
          v-model="user.lastName"
        />
        <label for="floatingPassword">Last Name</label>
      </div>
    </div>
    <div class="row">
      <div class="col-6 form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="emailid"
          placeholder="name@example.com"
          v-model="user.email"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="col-6">
        <div class="form-check mb-3">
          <input
            class="form-check-input"
            type="radio"
            name="gender"
            value="male"
            id="flexRadioDefault1"
            checked
            v-model="user.gender"
          />
          <label class="form-check-label" for="flexRadioDefault1">Male</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="gender"
            value="female"
            id="flexRadioDefault2"
            v-model="user.gender"
          />
          <label class="form-check-label" for="flexRadioDefault2">Female</label>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col-6 form-floating">
        <input
          type="password"
          class="form-control"
          id="Password1"
          placeholder="Password"
          autocomplete="on"
          v-model="user.password"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="col-6 form-floating">
        <input
          type="password"
          class="form-control"
          id="Password2"
          autocomplete="on"
          placeholder="ReenterPassword"
          v-model="user.repassword"
        />
        <label for="floatingPassword">Re-enter password</label>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <select
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          v-model="user.countryId"
          @change="GetStates(user.countryId)"
        >
          <option
            v-for="ctry in countries"
            :key="ctry.countryId"
            :value="ctry.countryId"
          >
            {{ ctry.countryName }}
          </option>
        </select>
      </div>
      <div class="col-4">
        <select
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          @change="GetCities(user.stateId)"
          v-model="user.stateId"
        >
          <option v-for="st in states" :key="st.stateId" :value="st.stateId">
            {{ st.stateName }}
          </option>
        </select>
      </div>
      <div class="col-4">
        <select
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          v-model="user.cityId"
        >
          <option v-for="ct in cities" :key="ct.cityId" :value="ct.cityId">
            {{ ct.cityName }}
          </option>
        </select>
      </div>
    </div>
    <div class="row my-3">
      <div class="col-6 form-floating">
        <input
          type="text"
          class="form-control"
          id="address1"
          placeholder=" Address1"
          v-model="user.address1"
        />
        <label for="address1">Address Line 1</label>
      </div>
      <div class="col-6 form-floating">
        <input
          type="text"
          class="form-control"
          id="address2"
          placeholder=" Address2"
          v-model="user.address2"
        />
        <label for="address2">Address Line 2</label>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label
            class="form-check-label"
            for="flexCheckDefault"
            name="tnc"
            value="tnc"
            >Please accept terms and conditions.</label
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <base-button mode="" class="m-2">Submit</base-button>
        <base-button mode="" @click.prevent="clearFields">Clear</base-button>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  props: ["userData"],
  data() {
    return {
      // user: {
      //     firstname: '',
      //     lastname: '',
      //     email: '',
      //     gender: '',
      //     password: '',
      //     repassword: '',
      //     countryId: '',
      //     stateId: '',
      //     cityId: '',
      //     address1: '',
      //     address2: '',
      // },
      user: this.userData,
      countryData: [],
      countries: [{ countryId: "", countryName: "" }],
      states: [{ stateId: "", stateName: "", countryId: "" }],
      cities: [{ cityId: "", cityName: "" }],
    };
  },
  methods: {
    saveuser() {
      fetch("http://localhost:5000/api/Users/AddUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.user),
      })
        .then((response) => response.json())
        .then(() => {
          this.$router.push("/users");
        })
        .catch((error) => console.error("Unable to add item.", error));
    },

    clearFields() {
      this.user = {};
    },

    loadCountryData() {
      fetch("http://localhost:5000/api/Users/GetCountryData")
        .then((response) => response.json())
        .then((data) => {
          this.countryData = data;
          for (let i = 0; i < data.length; i++) {
            let tObj = {};
            tObj.countryId = data[i].countryId;
            tObj.countryName = data[i].countryName;
            this.countries.push(tObj);
          }
          if (this.user.countryId) {
            this.GetStates(this.user.countryId);
            this.GetCities(this.user.stateId);
          }
        })
        .catch((error) => console.error("Unable to get items.", error));
    },

    GetStates(countryId) {
      this.states = [];
      let data = this.countryData.filter((x) => x.countryId == countryId);
      this.states = data[0].states;
    },
    GetCities(stateid) {
      let data = this.countryData.filter(
        (x) => x.countryId == this.user.countryId
      );

      if (data) {
        let tempState = data[0].states.filter((x) => x.stateId == stateid);
        if (tempState) {
          this.cities = tempState[0].cities;
        }
      }
    },
  },
  created() {
    if (!this.user) {
      this.user = {};
    }
    this.loadCountryData();
  },
  mounted() {},
};
</script>