import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

// bootstrap-vue
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Initialize Firebase
import {firebaseConfig} from "./config/configFirebase";
import firebase from 'firebase';
firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false

// iconos
import { library } from '@fortawesome/fontawesome-svg-core';
// fab
import { faGithubSquare, faLinkedin, faFacebookSquare, faInstagram} from '@fortawesome/free-brands-svg-icons';
// fas
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
// far
import { faWindowClose} from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faTrashAlt, faEdit, faPlus, faWindowClose, faGithubSquare, faLinkedin, faFacebookSquare, faInstagram);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
