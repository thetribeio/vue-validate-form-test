<template>
  <div id="testVuelidate">
    <form @submit.prevent="onSubmit()">
      <div>
        <label for="userFirstname">Firstname</label>
        <input id="userFirstname" v-model.trim="firstname" @input="$v.firstname.$touch" :class="{error: $v.firstname.$error, valid: $v.firstname.$dirty && !$v.firstname.$invalid}"/>
      </div>
      <div class="error" v-if="$v.firstname.$dirty && !$v.firstname.required">
        Firstname is required
      </div>
      <div class="error" v-if="$v.firstname.$dirty && !$v.firstname.minLength">
        Firstname must contains at least {{ $v.firstname.$params.minLength.min }} characters
      </div>

      <div>
        <label for="userLastname">Lastname</label>
        <input id="userLastname" v-model.trim="lastname" @input="$v.lastname.$touch" :class="{error: $v.lastname.$error, valid: $v.lastname.$dirty && !$v.lastname.$invalid}"/>
      </div>
      <div class="error" v-if="$v.lastname.$dirty && !$v.lastname.required">
        Lastname is required
      </div>
      <div class="error" v-if="$v.lastname.$dirty && !$v.lastname.minLength">
        Lastname must contains at least {{ $v.lastname.$params.minLength.min }} characters
      </div>

      <div>
        <label for="userMail">Mail</label>
        <input id="userMail" v-model.trim="mail" @input="$v.mail.$touch" :class="{error: $v.mail.$error, valid: $v.mail.$dirty
        && !$v.mail.$invalid}"/>
      </div>
      <div class="error" v-if="$v.mail.$dirty && !$v.mail.required">
        Mail is required
      </div>
      <div class="error" v-if="$v.mail.$dirty && !$v.mail.email">
        Mail is not valid
      </div>

      <div>
        <label for="userBirthDate">Birth date</label>
        <input id="userBirthDate" type="date" v-model="birthDate" @change="$v.birthDate.$touch" :class="{error: $v.birthDate.$error, valid: $v.birthDate.$dirty && !$v.birthDate.$invalid}"/>
      </div>
      <div class="error" v-if="!$v.birthDate.isValid">
        Birth date must be between {{ minDate | moment }} and {{ maxDate | moment }}
      </div>

      <div>
        <label for="userPassword">Password</label>
        <input id="userPassword" type="password" minLength="5" maxLength="12" v-model.trim="password" @input="$v.password.$touch" :class="{error: $v.password.$error, valid: $v.password.$dirty && !$v.password.$invalid}"/>
      </div>
      <div class="error" v-if="$v.password.$dirty && !$v.password.required">
        Password is required
      </div>
      <div class="error" v-if="$v.password.$dirty && !$v.password.minLength">
        Password must contains at least {{ $v.password.$params.minLength.min }} characters
      </div>
      <div class="error" v-if="$v.password.$dirty && !$v.password.maxLength">
        Password must contains less than {{ $v.password.$params.maxLength.max }} characters
      </div>

      <div>
        <label for="userConfirmPassword">Confirm password</label>
        <input id="userConfirmPassword" type="password" v-model.trim="confirmPassword" @input="$v.confirmPassword.$touch" :class="{error: $v.confirmPassword.$error, valid: $v.confirmPassword.$dirty && !$v.confirmPassword.$invalid}"/>
      </div>
      <div class="error" v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.required">
        Password confirmation is required
      </div>
      <div class="error" v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.sameAs">
        Password confirmation is not the same as password
      </div>

      <button type="submit" :disabled="$v.$invalid">Submit</button>
    </form>
    <User v-if="Object.keys(user).length" :user="user"/>
  </div>
</template>

<script>
import moment from 'moment';
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';
import User from '@/components/User';

export default {
  name: 'TestVuelidate',
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
  validations: {
    firstname: {
      required,
      minLength: minLength(4),
    },
    lastname: {
      required,
      minLength: minLength(4),
    },
    mail: {
      required,
      email,
    },
    birthDate: {
      isValid() {
        if (!this.birthDate) return true;
        if (this.minDate <= moment(this.birthDate) && moment(this.birthDate) <= this.maxDate) {
          return true;
        }
        return false;
      },
    },
    password: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(12),
    },
    confirmPassword: {
      required,
      sameAs: sameAs('password'),
    },
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) return;
      this.user = {
        firstname: this.firstname,
        lastname: this.lastname,
        mail: this.mail,
        birthDate: this.birthDate,
        password: this.password,
      };
    },
  },
  filters: {
    moment(date) {
      return moment(date).format('MMMM Do YYYY');
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
