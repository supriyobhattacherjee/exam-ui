<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-success mb-3" aria-label="Third navbar example">
    <div class="container-fluid">
      <a class="navbar-brand text-uppercase fw-bold" href="#">Exam Portal | {{RoleName()}}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav me-auto mb-2 mb-sm-0">
          <li class="nav-item">
            <a class="nav-link" :class="{'active' : CheckActive('home')}" aria-current="page" @click="gotoLink('userslist', 'home')">Home</a>
          </li>
          <li class="nav-item">
          </li>
          <li class="nav-item dropdown" v-if="!IsStudentUser">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false" >Test Module</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown03">
              <li><a class="dropdown-item" :class="{'active' : CheckActive('TestLink')}" href="#" @click="gotoLink('testlink', 'TestLink')">Tests List</a></li>
              <li><a class="dropdown-item" :class="{'active' : CheckActive('QuesBunch')}" href="#" @click="gotoLink('allsubjects', 'QuesBunch')">Questions Bunch</a></li>
              <li><a class="dropdown-item" :class="{'active' : CheckActive('questionsections')}" href="#" @click="gotoLink('questionsections', 'questionsections')">Configure Sections</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown" v-if="!IsStudentUser">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">Students</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown03">
              <li><a class="dropdown-item" href="#" :class="{'active' : CheckActive('StudLink')}" @click="gotoLink('userslist', 'StudLink')">Student Details</a></li>
              <li><a class="dropdown-item" href="#">Reports</a></li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-sm-0">
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fw-bold" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">Welcome {{loggedInUser.firstName}}</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown03">
              <li><a class="dropdown-item" @click="logout">Sign out</a></li>
              <li><a class="dropdown-item" href="#">Change Settings</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { useStore } from 'vuex'
  import {reactive, toRefs} from 'vue'
export default {
  setup() {
    let store = useStore();
    let obj = store.getters.getLoggedInUser;
    const loggedInUser = reactive(obj);
    let UserRefs = toRefs(loggedInUser);
    // let roleName =  ref(loggedInUser.isAdministaror ? "Administrator": "User");
    return {userName : UserRefs.FirstName + UserRefs.lastName, loggedInUser};
  },
  data() {
    return {
      navName: ''
    }
  },
    computed: {
        
        IsStudentUser(){
          return this.loggedInUser.userType === 3;
        }
        
    },
    methods: {
      userLink() {
          if(this.IsStudentUser)
            return {name: 'usertest'}
          else
            return {name: 'userslist'};
        },
        gotoLink(linkName, nvName)
        {
          this.navName = nvName;
            if(this.IsStudentUser)
              linkName = 'usertest';
            this.$router.push({name: linkName})
        },
        CheckActive(nvName)
        {
           return this.navName === nvName;
        },
        logout()
        {
          this.$store.commit("storeLoggedInUser", null);
          this.$router.push({name: "login"})
        },
        RoleName()
        {
          return this.loggedInUser.userType == 1 ? "Administrator": "User";
        }
        
    },

}
</script>