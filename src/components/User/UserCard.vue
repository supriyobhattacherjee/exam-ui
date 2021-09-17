<template>
    <div>
        <base-card>
      <template v-slot:header>
        <div class="text-start header-text bg-light text-uppercase">
            <p class="fs-5">{{user.firstName}} {{user.lastName}}</p>
        </div>
      </template>
      <template v-slot:body>
          <div class="bg-light">
              <div class="row">
                  <div class="col-6 text-start ">
                    <span class="fs-6 fw-bold">
                        Country: 
                    </span> <span class="text-uppercase">{{user.countryName}} </span>
                  </div>
                  <div class="col-6 text-start">
                       <span class="fs-6 fw-bold">
                        Email-Address: 
                    </span> {{user.email}} 
                  </div>
              </div>
              <div class="row">
                  <div class="col-6 text-start">
                    <span class="fs-6 fw-bold">
                        State:  
                    </span>{{user.stateName}} 
                  </div>
                  <div class="col-6 text-start">
                       <span class="fs-6 fw-bold">
                        City:  
                    </span>{{user.cityName}} 
                  </div>
              </div>
          </div>
      </template>
      <template v-slot:footer>
          <div class="text-start">
             Candidate <b>{{user.firstName}}</b> has only 5 days to attempt the Test.
          </div>
      </template>
      <template #buttons>
          <div>
              <a href="#" @click="gotoUser(user.userId)" class="btn btn-primary">Details View</a>
          </div>
      </template>
    </base-card>
    </div>
</template>
<script>
import BaseCard from "../BaseControl/BaseCard.vue";

export default {
    provide() {
    return {
      usersdata: this.users,
    };
    },
    props: {
        user:{
            required: true,
        }
    },
    components: {
        BaseCard,
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    gotoUser(id) {
      this.$router.push(`/users/${id}`);
    }
    },
}
</script>