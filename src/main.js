import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import router from './router.js'
import {createStore} from 'vuex';
import axios from 'axios';

import './validators.js';
import configuration from '../public/config.json';
import PrimeVue from 'primevue/config';
import BaseButton from './components/BaseControl/BaseButton.vue'
import BaseDialog from './components/BaseControl/BaseDialog.vue'
// import Vuelidate from 'vuelidate'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
const store = createStore({
    state(){
        return {
             users: [],
             countries: [],
             questions : [],
             LoggedInUser: {},
             mcqRequest: {}
        };
    },
    
    mutations: {
        storeUsers(state, payload){
            state.users = payload;
        },
        storeCountries(state, payload){
            state.countries = payload;
        },
        storeQuestions(state, payload)
        {
            state.questions = payload;
        },
        storeLoggedInUser(state, payload) {
            sessionStorage.setItem('loggedinUser', JSON.stringify(payload));
            state.LoggedInUser = payload;
        },
        storeMcqRequest(state, payload) {
            state.mcqRequest = payload;
        }
    },
    getters:{
        getStoredUsers(state)
        {
            return state.users;
        },
        getStoredCountries(state)
        {
            return state.countries;
        },
        getQuestions(state)
        {
            return state.questions;
        },
        getLoggedInUser(state)
        {
            if(!state.LoggedInUser)
                JSON.parse(sessionStorage.getItem('loggedinUser'));
            return state.LoggedInUser;
        },
        getMcqRequest(state)
        {
            return state.mcqRequest;
        }
    }
    
});
const app = createApp(App);

library.add(faUserSecret);
app.component('fa', FontAwesomeIcon);

app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);
app.use(PrimeVue);
app.config.globalProperties.$axios = axios;

// app.use(Vuelidate)
app.config.globalProperties.$appconfiguration = configuration
app.use(store);
app.use(router);
app.mount('#app')
