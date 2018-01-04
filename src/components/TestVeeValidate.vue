<template>
  <div id="testVeeValidate">
    <form @submit.prevent="onSubmit()">
      <div>
        <label for="userFirstname">Firstname</label>
        <input id="userFirstname" name="firstname" v-model.trim="firstname" v-validate="'required|min:4'" :class="{error: errors.has('firstname'), valid: !errors.has('firstname') && fields['firstname'].dirty}"/>
      </div>
      <div class="error" v-if="errors.has('firstname')">
        {{ errors.first('firstname') }}
      </div>

      <div>
        <label for="userLastname">Lastname</label>
        <input id="userLastname" name="lastname" v-model.trim="lastname" v-validate="'required|min:4'" :class="{error: errors.has('lastname'), valid: !errors.has('lastname') && fields['lastname'].dirty}"/>
      </div>
      <div class="error" v-if="errors.has('lastname')">
        {{ errors.first('lastname') }}
      </div>

      <div>
        <label for="userMail">Mail</label>
        <input id="userMail" name="mail" v-model.trim="mail" v-validate="'required|email'" :class="{error: errors.has('mail'), valid: !errors.has('mail') && fields['mail'].dirty}"/>
      </div>
      <div class="error" v-if="errors.has('mail')">
        {{ errors.first('mail') }}
      </div>

      <div>
        <label for="userBirthDate">Birth date</label>
        <input id="userBirthDate" name="birthDate" type="date" v-model="birthDate" v-validate="'isValid'" :class="{error: errors.has('birthDate'), valid: !errors.has('birthDate') && fields['birthDate'].dirty}"/>
      </div>
      <div class="error" v-if="errors.has('birthDate')">
        {{ errors.first('birthDate') }}
      </div>

      <div>
        <label for="userPassword">Password</label>
        <input id="userPassword" name="password" type="password" minLength="5" maxLength="12" v-model.trim="password" v-validate="'required|min:5|max:12|confirmed:confirmPassword'" :class="{error: errors.has('password'), valid: !errors.has('password') && fields['password'].dirty}"/>
      </div>
      <div class="error" v-if="errors.has('password')">
        {{ errors.first('password') }}
      </div>

      <div>
        <label for="userConfirmPassword">Confirm password</label>
        <input id="userConfirmPassword" name="confirmPassword" type="password" v-model.trim="confirmPassword" v-validate="'required'" :class="{error: errors.has('confirmPassword'), valid: !errors.has('confirmPassword') && fields['confirmPassword'].dirty}"/>
      </div>
      <div class="error" v-if="errors.has('confirmPassword')">
        {{ errors.first('confirmPassword') }}
      </div>

      <button type="submit" :disabled="errors.any()">Submit</button>
    </form>
    <User v-if="Object.keys(user).length" :user="user"/>
  </div>
</template>

<script>
import User from '@/components/User';

export default {
  name: 'TestVeeValidate',
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
  methods: {
    onSubmit() {
      this.$validator.validateAll()
      .then((success) => {
        if (success) {
          if (this.$validator.errors.any()) return;
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
