<template>
  <div id="app">
    <h2 class="header--title">Square Foot Garden Planner</h2>
    <setup></setup>
  </div>
</template>

<script>
import Setup from './views/Setup';

export default {
  name: 'App',
  components: {
    Setup
  }
}
</script>

<style lang="scss">
@import './css/_variables.scss';

#app {
  font-family: Karla, Helvetica, Arial, sans-serif;
  margin-top: 1rem;
  color: $color-gray-87;
}

.header--title {
  font-family: Libre Baskerville, Arial, serif;
  color: $color-brand-surfie-green;
  margin: 1rem auto;
  text-align: center;
}

a {
  color: $color-brand-surfie-green;
  text-decoration: none;
  border-bottom: 1px solid $color-brand-surfie-green;
}
</style>
