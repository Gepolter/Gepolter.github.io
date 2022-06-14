<template>
    <div>
        <v-select label="_name" :options="skills" return-object></v-select>
    </div>
</template>

<script setup>
import {/*ref, */onMounted, computed} from 'vue';
//import the global store object from Vuex
import {useStore} from 'vuex'
// declare the store variable
const store = useStore();
const skills = computed(() => {
  return store.state.skills
})

onMounted(() => {
// dispatch the fetchskills action which commits a mutation to update the state
  store.dispatch("fetchSkills");
})

</script>