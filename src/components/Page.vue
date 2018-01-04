<template>
  <div class="page">
    <h1>Comparison between three plugins used to validate forms</h1>
    <h2 :class="{active: state === 'SIMPLEVUEVALIDATOR'}">Simple Vue Validator</h2>
    <ul>
      <li><a @click="setState('SIMPLEVUEVALIDATOR')">Test</a></li>
      <li><a href="http://simple-vue-validator.maijin.info/" target="_blank">Doc</a></li>
    </ul>

    <h2 :class="{active: state === 'VEEVALIDATE'}">VeeValidate</h2>
    <ul>
      <li><a @click="setState('VEEVALIDATE')">Test</a></li>
      <li><a href="http://vee-validate.logaretm.com/" target="_blank">Doc</a></li>
    </ul>

    <h2 :class="{active: state === 'VUELIDATE'}" >Vuelidate</h2>
    <ul>
      <li><a @click="setState('VUELIDATE')">Test</a></li>
      <li><a href="https://monterail.github.io/vuelidate/" target="_blank">Doc</a></li>
    </ul>

    <TestSimpleVueValidator v-show="state === 'SIMPLEVUEVALIDATOR'"/>
    <TestVeeValidate v-show="state === 'VEEVALIDATE'"/>
    <TestVuelidate v-show="state === 'VUELIDATE'"/>
  </div>
</template>

<script>
import TestSimpleVueValidator from '@/components/TestSimpleVueValidator';
import TestVeeValidate from '@/components/TestVeeValidate';
import TestVuelidate from '@/components/TestVuelidate';

export default {
  name: 'Page',
  components: {
    TestSimpleVueValidator,
    TestVeeValidate,
    TestVuelidate,
  },
  data() {
    return {
      state: null,
    };
  },
  methods: {
    setState(state) {
      this.state = state;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  color: #42b983;
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
  cursor: pointer;
  text-decoration: none;
}

.active {
  color: #FF0000;
}
</style>
