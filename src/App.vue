<template>
  <div id="app">
    <h2 class="header--title">Square Foot Garden Planner</h2>  
        <router-link to="/" class="header-link">
        </router-link>
        <router-view />
    </div>

</template>

<script>
import Setup from './views/Setup';
import DraggableList from './components/DraggableList'

export default {
  name: 'App',
  components: {
    Setup,
    DraggableList
  }
}
</script>

<style lang="scss">
@import './css/_variables.scss';

#app {
  font-family: Karla, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 1rem;
}

.header--title {
  font-family: Libre Baskerville, Arial, serif;
  color: $color-brand-surfie-green;
  margin: 1rem auto;
  padding-left: 120px;
}
</style>
