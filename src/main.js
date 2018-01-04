// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import SimpleVueValidation from 'simple-vue-validator';
import VeeValidate from 'vee-validate';
import Vuelidate from 'vuelidate';

import isValid from '@/services/validators/isValid';

import App from './App';

Vue.use(SimpleVueValidation);

Vue.use(VeeValidate);
VeeValidate.Validator.extend('isValid', isValid);

Vue.use(Vuelidate);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
