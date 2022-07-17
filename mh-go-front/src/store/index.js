import axios from 'axios'
import { createStore } from 'vuex'
//import skillsMod from './modules/skillsMod'

export default createStore({
  
  state: {
    build:{
      chosenWpn: null,
      buildArmor:{
        headGear: null,
        chestGear: null,
        armsGear: null,
        waistGear: null,
        legsGear: null
      },
      buildTalisman: null
    },
    buildSkills:[],
    builds:[],
    skills:[],
    wishlists:[],
    selectedWishlist: Object,
    talismans:[],
    armor:[],
    //decos:[],
    weapons:[],
    gearTypes:[],
    slots:[],
    slotArrays:[]
  },
  getters: {
    getBuild: (state) => state.build,
    getBuildSkills: (state) => state.buildSkills,
    getBuildSkillsLength: (state) => state.buildSkills.length,
    getBuilds: (state) => state.builds,
    getBuildsLength:(state) => state.builds.length,
    /*
    getSpecificSkill: state => id =>{
      return state.skills.filter(q => q._id == id)[0]
    },*/
    getSkills: (state) => state.skills,
    findSkill: state => skill => state.skills.find(p => p._name === skill),
    getWishlists: (state) => state.wishlists,
    getWishlistsLength:(state) => state.wishlists.length,
    getSelectedWishlist:(state) => state.selectedWishlist,
    getTalismans: (state) => state.talismans,
    getTalismansLength:(state) => state.talismans.length,
    getArmor: (state) => state.armor,
    getArmorLength: (state) => state.armor.length,
    //getDecos: (state) => state.decos,
    //getDecosLength: (state) => state.decos.length,
    getWeapons: (state) => state.weapons,
    //testing
    findWeapon:(state) => state.weapons[0],
    
    getWeaponsLength: (state) => state.weapons.length,
    getGearTypes: (state) => state.gearTypes,
    getGearTypesLength: (state) => state.gearTypes.length,
    getSlots: (state) => state.slots,
    getSlotsLength: (state) => state.slots.length,
    getSlotArrays: (state) => state.slotArrays,
    getSlotArray: state => slotArray => state.slotArrays.find(p => p._name === slotArray),
    getSlotArraysLength: (state) => state.slotArrays.length

  },
  mutations: {
    SET_BUILD(state, build) {
      state.build = build
    },
    SET_BUILD_SKILLS(state, buildSkills) {
      state.buildSkills = buildSkills
    },
    SET_BUILDS(state, builds) {
      state.builds = builds
    },
    SET_SKILLS(state, skills) {
      state.skills = skills
    },
    SET_ARMOR(state, armor) {
      state.armor = armor
    },
    //SET_DECOS(state, decos) {
    //  state.decos = decos
    //},
    SET_WEAPONS(state, weapons) {
      state.weapons = weapons
    },
    SET_SELECTED_WEAPON(state, weapon) {
      state.selectedWeapon = weapon
    },
    SET_GEAR_TYPES(state, gearTypes) {
      state.gearTypes = gearTypes
    },
    SET_SLOTS(state, slots){
      state.slots = slots
    },
    SET_SLOT_ARRAYS(state, slotArrays) {
      state.slotArrays = slotArrays
    },
    ADD_WL(state, newWishlist) {
      state.wishlists.push(newWishlist)
    },
    DELETE_WL(state, wishlist){
      state.wishlists = state.wishlists.filter(data => data._name != wishlist._name)
    },
    SET_SELECTED_WL(state, wishlist) {
      state.selectedWishlist = wishlist
    },
    ADD_TAL(state, newTalisman) {
      state.talismans.push(newTalisman)
    },
    DELETE_TAL(state, talisman){
      state.talismans = state.talismans.filter(data => data._name != talisman._name)
    }
  },
  actions: {
    setBuild({ commit}, newBuild) {
      commit("SET_BUILD", newBuild)
    },
    setBuildSkills({commit}, newBuildSkills) {
      commit("SET_BUILD_SKILLS", newBuildSkills)
    },
    setBuilds({ commit}, newBuilds) {
      commit("SET_BUILDS", newBuilds)
    },
    
    async fetchSkills({commit}) {
      try {
        const data = await axios.get("http://localhost:3000/builder/skillsAll")
          commit('SET_SKILLS', data.data)
          
      }
      catch (error) {
        alert (error)
        console.log(error)
      }
    },
    async fetchArmor({commit}) {
      try {
        const data = await axios.get("http://localhost:3000/builder/armorAll")
          commit('SET_ARMOR', data.data)
      }
      catch (error) {
        alert (error)
        console.log(error)
      }
    },
    /*
    async fetchDecos({commit}) {
      try {
        const data = await axios.get("http://localhost:3000/builder/decosAll")
          commit('SET_DECOS', data.data)
      }
      catch (error) {
        alert (error)
        console.log(error)
      }
    },
    */
    async fetchWeapons({commit}) {
      try {
        const data = await axios.get("http://localhost:3000/builder/weaponsAll")
        commit('SET_WEAPONS', data.data)
      }
      catch (error) {
        alert (error)
        console.log(error)
      }
    },
    async fetchGearTypes({commit}) {
      try {
        const data = await axios.get("http://localhost:3000/builder/gearTypesAll")
          commit('SET_GEAR_TYPES', data.data)
      }
      catch (error) {
        alert (error)
        console.log(error)
      }
    },
    async fetchSlots({commit}) {
      try {
        const data = await axios.get("http://localhost:3000/builder/slotsAll")
          commit('SET_SLOTS', data.data)
      }
      catch (error) {
        alert (error)
        console.log(error)
      }
    },
    async fetchSlotArrays({commit}) {
      try {
        const data = await axios.get("http://localhost:3000/builder/slotArraysAll")
          commit('SET_SLOT_ARRAYS', data.data)
      }
      catch (error) {
        alert (error)
        console.log(error)
      }
    },
    
  },
  //not working 
  modules: {
    //skillsMod: skillsMod
  }
})
