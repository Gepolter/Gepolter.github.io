<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: "MonsterHunter";
  color: var(--mh-white);

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  

  body {
    background-color: var(--mh-gray);
    //font-family: "monsterhunter", Avenir, sans-serif;
  }

  //vselect vars
  --vs-controls-color: var(--mh-yellow);
  --vs-border-color: var(--mh-dark-yellow);

  --vs-dropdown-bg: linear-gradient(var(--mh-yellow), var(--mh-dark-yellow));
  --vs-dropdown-color: black;
  --vs-dropdown-option-color: black;

  //--vs-selected-bg: green;
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: var(--mh-light-blue);
  --vs-dropdown-option--active-color: #eeeeee;

  button{
    background: radial-gradient(var(--mh-red), var(--mh-dark-red));
    color: var(--mh-white);
    border: 3px solid black;
    font-family: inherit;
  }
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
