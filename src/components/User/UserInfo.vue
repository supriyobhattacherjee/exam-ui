<template>
    <div>
        <user-registration
        :userData="user"
        ></user-registration>
    </div>
</template>
<script>
import UserRegistration from './UserRegistration.vue';
export default {
  components: { UserRegistration },
    data() {
        return {
            userid : '',
            user: {}
        }
    },
    methods: {
        GetStates(countryId)
            {
                this.states = [];
                let data = this.countryData.filter(x=>x.countryId == countryId);
                this.states = data[0].states;

            },
            GetCities(stateid)
            {
                let data = this.countryData.filter(x=>x.countryId == this.user.countryId);
                
                if(data)
                {
                  let tempState =  data[0].states.filter(x=>x.stateId == stateid);
                  if(tempState)
                  {
                    this.cities = tempState[0].cities;
                  }
                }
            }
    },
    created() {
       this.userid =  this.$route.params.userid
       let users = this.$store.getters.getStoredUsers;
      
       let usrObj = users.filter(x=>x.userId == this.userid);
       if(usrObj && usrObj.length > 0)
       {
           this.user = usrObj[0];
       }
       console.log(this.user);

    },
}
</script>