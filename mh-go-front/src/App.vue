<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  --bg: #24 2526
  --bg-accent: #484a4d
  --text-color: #dadce1

}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}



</style>

<script>
//import { useStore } from 'vuex';
//import { onMounted } from 'vue';
//fetch all relevant data for builder and register in state on mount 

export default {
  /*
  setup () {
    const store = useStore();
    onMounted(() => {
      store.commit('getSkills');
    });
  }
  */
}
</script>
