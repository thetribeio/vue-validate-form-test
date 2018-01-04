<template>
  <div id="testSimpleVueValidator">
    <form @submit.prevent="onSubmit()">
      <div>
        <label for="userFirstname">Firstname</label>
        <input id="userFirstname" v-model.trim="firstname" :class="{error: validation.hasError('firstname'), valid: validation.isTouched('firstname') && !validation.hasError('firstname')}"/>
      </div>
      <div class="error" v-if="validation.hasError('firstname')">
        {{ validation.firstError('firstname') }}
      </div>

      <div>
        <label for="userLastname">Lastname</label>
        <input id="userLastname" v-model.trim="lastname" :class="{error: validation.hasError('lastname'), valid: validation.isTouched('lastname') && !validation.hasError('lastname')}"/>
      </div>
      <div class="error" v-if="validation.hasError('lastname')">
        {{ validation.firstError('lastname') }}
      </div>

      <div>
        <label for="userMail">Mail</label>
        <input id="userMail" v-model.trim="mail" :class="{error: validation.hasError('mail'), valid: validation.isTouched('mail') && !validation.hasError('mail')}"/>
      </div>
      <div class="error" v-if="validation.hasError('mail')">
        {{ validation.firstError('mail') }}
      </div>

      <div>
        <label for="userBirthDate">Birth date</label>
        <input id="userBirthDate" type="date" v-model="birthDate" :class="{error: validation.hasError('birthDate'), valid: validation.isTouched('birthDate') && !validation.hasError('birthDate')}"/>
      </div>
      <div class="error" v-if="validation.hasError('birthDate')">
        {{ validation.firstError('birthDate') }}
      </div>

      <div>
        <label for="userPassword">Password</label>
        <input id="userPassword" type="password" minLength="5" maxLength="12" v-model.trim="password" :class="{error: validation.hasError('password'), valid: validation.isTouched('password') && !validation.hasError('password')}"/>
      </div>
      <div class="error" v-if="validation.hasError('password')">
        {{ validation.firstError('password') }}
      </div>

      <div>
        <label for="userConfirmPassword">Confirm password</label>
        <input id="userConfirmPassword" type="password" v-model.trim="confirmPassword" :class="{error: validation.hasError('confirmPassword'), valid: validation.isTouched('confirmPassword') && !validation.hasError('confirmPassword')}"/>
      </div>
      <div class="error" v-if="validation.hasError('confirmPassword')">
        {{ validation.firstError('confirmPassword') }}
      </div>

      <button type="submit" :disabled="validation.countErrors() > 0">Submit</button>
    </form>
    <User v-if="Object.keys(user).length" :user="user"/>
  </div>
</template>

<script>
import moment from 'moment';
import { Validator } from 'simple-vue-validator';
import User from '@/components/User';

export default {
  name: 'TestSimpleVueValidator',
  components: {
    User,
  },
  data() {
    return {
      firstname: '',
      lastname: '',
      mail: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
      user: {},
    };
  },
  validators: {
    firstname(value) {
      return Validator.value(value).required().minLength(4);
    },
    lastname(value) {
      return Validator.value(value).required().minLength(4);
    },
    mail(value) {
      return Validator.value(value).required().email();
    },
    birthDate(value) {
      // eslint-disable-next-line consistent-return
      return Validator.custom(() => {
        if (value && (this.minDate > moment(value) || moment(value) > this.maxDate)) {
          return `Birth date must be between ${moment(this.minDate).format('MMMM Do YYYY')} and ${moment(this.maxDate).format('MMMM Do YYYY')}`;
        }
      });
    },
    password(value) {
      return Validator.value(value).required().minLength(5).maxLength(12);
    },
    // eslint-disable-next-line func-names
    'confirmPassword, password': function (confirmPassword, password) {
      if (this.submitted || this.validation.isTouched('confirmPassword') || this.validation.isTouched('password')) {
        return Validator.value(confirmPassword).required().match(password);
      }
      return true;
    },
  },
  methods: {
    onSubmit() {
      this.$validate()
      .then((success) => {
        if (success) {
          this.user = {
            firstname: this.firstname,
            lastname: this.lastname,
            mail: this.mail,
            birthDate: this.birthDate,
            password: this.password,
          };
        }
      });
    },
  },
  computed: {
    minDate() {
      return moment().subtract(100, 'years').toDate();
    },
    maxDate() {
      return moment().toDate();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: normal;
}

div {
  margin-bottom: 10px;
}
</style>
