<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Page/>
  </div>
</template>

<script>
import Page from '@/components/Page';

export default {
  name: 'app',
  components: {
    Page,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
}

input.error {
  border-color: red;
  background: #FDD;
}

input.error:focus {
  outline-color: #F99;
}

input.valid {
  border-color: #5A5;
  background: #EFE;
}

input.valid:focus {
  outline-color: #8E8;
}

div.error {
    color: #FF0000;
}
</style>
