import axios from 'axios'
import { createStore } from 'vuex'
//import skillsMod from './modules/skillsMod'

export default createStore({
  
  state: {
    skills:[],
    wishlists:[],
    talismans:[]
  },
  getters: {
    getSpecificSkill: state => id =>{
      return state.skills.filter(q => q._id == id)[0]
    },
    getSkills: (state) => state.skills,
    getWishlists: (state) => state.wishlists,
    getWishlistsLength:(state) => state.wishlists.length,
    getTalismans: (state) => state.talismans,
    getTalismansLength:(state) => state.talismans.length

  },
  mutations: {
    SET_SKILLS(state, skills) {
      state.skills = skills
    },
    ADD_WL(state, newWishlist) {
      state.wishlists.push(newWishlist)
    },
    DELETE_WL(state, wishlist){
      state.wishlists = state.wishlists.filter(data => data._name != wishlist._name)
    },
    ADD_TAL(state, newTalisman) {
      state.talismans.push(newTalisman)
    },
    DELETE_TAL(state, talisman){
      state.talismans = state.talismans.filter(data => data._name != talisman._name)
    }
  },
  actions: {
    async fetchSkills({commit}) {
      try {
        const data = await axios.get("http://localhost:3000/builder/skillsAll")
          commit('SET_SKILLS', data.data)
      }
      catch (error) {
        alert (error)
        console.log(error)
      }
    }
  },
  //not working 
  modules: {
    //skillsMod: skillsMod
  }
})
