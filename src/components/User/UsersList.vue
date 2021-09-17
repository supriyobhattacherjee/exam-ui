<template>
  <div>
    <div class="row text-center">
      <div class="col-6"></div>
      <div
        class="spinner-border text-primary m-3"
        role="status"
        v-if="isLoading"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <user-card
      v-for="user in users"
      :key="user.userid"
      :user="user"
    ></user-card>
  </div>
</template>
<script>
import UserCard from "./UserCard.vue";
export default {
  components: {
    UserCard,
  },
  data() {
    return {
      users: [],
      isLoading: false,
    };
  },
  computed: {
  },
  methods: {
    LoadAllUsers() {
      this.isLoading = true;
      fetch("http://localhost:5000/api/Users/GetUsers")
        .then((response) => response.json())
        .then((data) => {
          this.isLoading = false;
          this.users = data;
          this.$store.commit("storeUsers", this.users);
        })
        .catch((error) => console.error("Unable to get items.", error));
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
          this.$store.commit("countriesData", this.countries);
        })
        .catch((error) => console.error("Unable to get items.", error));
    },
  },

  mounted() {
    this.LoadAllUsers();
  },
};
</script>
<style scoped>
.header-text {
  font-family: "Michroma", sans-serif;
}
</style>