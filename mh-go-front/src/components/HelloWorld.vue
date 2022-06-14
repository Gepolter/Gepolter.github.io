<template>  
  <div>  
    <div class="flex-container">
      <ul>
        <h1>Made By Getters</h1>
            <div v-for='gettersSkill in getSkills' :key='gettersSkill._id'>
             {{gettersSkill._id}}
             {{gettersSkill._name}}
             {{gettersSkill._maxLvl}}
            </div>

      </ul>
      <ul class="cBox">
        <div ></div>
          <h1>Combobox</h1>
          <!--v-select label="_name" :options="skills" v-model='selectedWl'></v-select> :id ="wlSkills">
          <v-slider v-model = "selectedWl._maxLvl" ></v-slider>
          <p>{{selectedWl}}</p-->

      </ul>
      <ul>
        <h1>Made By Actions</h1>
          <div v-for='skill in skills' :key='skill._id'>
            {{skill._id}}
            {{skill._name}}
            {{skill._maxLvl}}
            {{skill._slot_id}}
          </div>
      </ul>
       
      </div>
  </div>
</template>

<style>
  .flex-container {
    display: flex;
    align-items: center;
  }
  .cBox {
    flex:2;
  }
  /*these have to be the actual components for wl, tal and table later*/
  
</style>

<script setup>
import {/*ref, */onMounted, computed} from 'vue';
//import the global store object from Vuex
import {useStore} from 'vuex'
// declare the store variable
const store = useStore();

const getSkills = computed(() => {
  return store.getters.getSkills
})

const skills = computed(() => {
  return store.state.skills
})


/*
const wlSliderMax = computed(() => {
  return 
})
*/

//this is one way of registering an opponent
onMounted(() => {
// dispatch the fetchskills action which commits a mutation to update the state
  store.dispatch("fetchSkills");
  //put relevant data into state for this component
})


</script>