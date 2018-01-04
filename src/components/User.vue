<template>
  <div id="user">
    <h2>Data after submitting form</h2>
    <div v-for="key in Object.keys(user)">
      <span v-if="user[key]">{{ key }} : {{ user[key] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: {
      type: Object,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
