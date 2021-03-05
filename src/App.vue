<template>
  <div id="app">
    <h2 class="header--title">Square Foot Garden Planner</h2>
    <setup></setup>
    <draggableList />
    <results></results>
  </div>
</template>

<script>
import Setup from './views/Setup';
import DraggableList from './components/DraggableList'
import Results from './views/Results';

export default {
  name: 'App',
  components: {
    Setup,
    DraggableList,
    Results
  }
}
</script>

<style lang="scss">
@import './css/_fonts.scss';
@import './css/_variables.scss';

#app {
  font-family: Karla, Helvetica, Arial, sans-serif;
  margin-top: 1rem;
  color: $color-gray-87;
  font-size: 1rem;
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

.btn {
   padding: 1rem 2rem;
    font-size: 1rem;
    text-transform: uppercase;
    border: none;
    color: $color-white;
    background: $color-brand-surfie-green;
    transition: background .15s ease, color .15s ease;

    &:hover:not(.btn:disabled),
    &:focus:not(.btn:disabled) {
        cursor: pointer;
        background: $color-brand-slateblue-dark;
        color: $color-white;
    }

    &:disabled {
      opacity: .5;
    }
}
</style>
