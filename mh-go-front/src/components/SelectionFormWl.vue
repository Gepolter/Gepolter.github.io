<template>

    <div  class="header" style="border-style: solid;">
        wishlists
    </div>
    <!-- wishlists/talismans: array of collapsibles v-for-->
    <div class="selectionArrayCollapsible">
        <vue-collapsible-panel-group accordion>
            <!--for every element in wl array one collapsible. !!!no events from collapsible...... why?!-->
            <vue-collapsible-panel v-for="wishlist in getWishlists" :key="wishlist._name" :expanded="false">
                <template #title>
                    {{wishlist._name}}
                    <!--button type="submit" style="display: inline;" @click="activateWl(wishlist)">activate</button-->
                    <button type="submit" style="display: inline;" @click="deleteWl(wishlist)">X</button>
                </template>
                <template #content>
                    
                    <!-- items of wl/tals array of selectionItems(custom class)-->
                    <!-- this should be draggable to select prios-->
                    <div class="selectionItems">
                        <SelectionItem 
                            v-for="selectedSkill in wishlist._skillSelectionArray"
                            :key="selectedSkill._name"
                            :skillName="selectedSkill._name"
                            :skillLvl="selectedSkill._selectedLvl"
                            :skillPrio="selectedSkill._prio"
                            @send="removeSkill(wishlist, $event)">
                            
                        </SelectionItem>
                        <draggable
                            v-model="wishlist._skillSelectionArray"
                            @start="drag=true"
                            @end="drag=false"
                            item-key="_name">
                            <template #item="{skill}">
                                <div>{{skill}}</div>
                            </template>

                        </draggable>
                    </div>
                    <div class="selectionItemBuilder">
                        <v-select 
                            :options="getSkills"
                            label="_name"
                            v-model="selectedSkill"
                            @option:selected="resetSlider()"
                            >

                        </v-select>
                        <!--:reduce="getSkills => getSkills._maxLvl" -->
                        <div class="sliderDiv">
                            <v-slider 
                                v-model="myLvl"
                                :min = 1
                                :max="selectedSkill._maxLvl"
                                :height = 7
                                color="#FB278D"
                                track-color="#FEFEFE"
                                tooltip = "always"
                                :marks = "marks">
                                
                                <template v-slot:step="{active}">
                                    <div :class="['custom-step', {active}]"></div>
                                </template>
                            </v-slider>
                        </div>

                        <button type="submit" class="btn btn__primary btn__lg" @click="addSkill(selectedSkill._name, myLvl, 1, wishlist)">
                            Add Skill
                        </button>
                    </div>
                </template>
            </vue-collapsible-panel>
        </vue-collapsible-panel-group>
    </div>

    <div class="addWlPanel">
        <input v-model="text" placeholder="WL Name"/>
        <button type="submit" style="display: inline;" @click="addWishlist(text)">
            create Wishlist
        </button>
    </div>


</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
    import SelectionItem from './SelectionItem.vue';

    export default {

        computed:{

            ...mapGetters({
                getSkills: 'getSkills',
                getWishlists: 'getWishlists',
                getWishlistsLength: 'getWishlistsLength'

            })
        },
        methods: {
            ...mapActions({
                fetchSkills: 'fetchSkills',
                createWishlist: 'createWishlist'
            }),
            ...mapMutations([
                'ADD_WL',
                'DELETE_WL'
            ]),
            
            addSkill: function(skillName, skillLvl, skillPrio, wishlist){
                //what wishlist is opened?
                
                for(var i = 0; i < this.getWishlistsLength; i++){
                    if(this.getWishlists[i] === wishlist){
                        //check, if skillName is already in skillSelectionArray
                        if(wishlist._skillSelectionArray.some(e => e._name ===skillName) ){
                            alert('skill already in Wishlist')
                        }else{
                            wishlist._skillSelectionArray.push({
                                _name: skillName,
                                _selectedLvl: skillLvl,
                                _prio: skillPrio
                            })
                            //also set slider current lvl back to 1
                            this.resetSlider()
                        }
                    }
                }
            },
            removeSkill: function(wishlist, skillName){
                for(var i = 0; i < this.getWishlistsLength; i++){
                    if(this.getWishlists[i] === wishlist){
                        try{
                            console.log()
                            wishlist._skillSelectionArray = wishlist._skillSelectionArray.filter(e => e._name != skillName) 
                        }
                        catch (error) {
                            alert (error)
                            console.log(error)
                        }
                    }
                }
            },
            resetSlider: function(){
                this.myLvl = 1
            },
            addWishlist: function(wlName){
                if(this.getWishlists.some(e => e._name ===wlName) ){
                    alert('Wishlist name already in use')
                }
                else{
                    this.ADD_WL({
                        _name: wlName,
                        _skillSelectionArray: [],
                        _active: false
                    })
                }
            },
            deleteWl: function(wishlist){
                this.DELETE_WL(wishlist)
            }
            //maybe helpful for selection to build later
            /*
            activateWl: function(wishlist){
                console.log(this.getWishlistsLength)
                for(var i = 0; i< this.getWishlistsLength;i++){
                    console.log(this.getWishlists[i]._name)
                    if(this.getWishlists[i]._name === wishlist._name){
                        this.getWishlists[i]._active = true
                    }
                    else{
                        this.getWishlists[i]._active = false
                        
                    }
                }
                wishlist._active = true
            },*/
        },
        //why separate computed method?
        data() {
            return {
                myLvl: 1,
                selectedSkill: {_name: "blank", _maxLvl: 3},
                value: 0,
                marks: stuff => stuff % 1 === 0,
                text: ""
                //skillSelectionArray: [],
                //wishlistArray:[]

             }
        },
        created(){
            this.fetchSkills()
            this.addWishlist("wl one", [])
        }
    }


</script>

<script setup>
/*
    import { onMounted } from 'vue';
    //import {useStore} from 'vuex'
    // declare the store variable
    //const store = useStore();

    
    onMounted (() => {
        this.store.dispatch('skillsMod/fetchskills')
    })


    
    import { defineProps } from 'vue'

    defineProps({
        isOpen: {
            type: Boolean,
            default: true
        }
    })
    
    //let arr = new Array(1,2,3,4,5)
    let selectedSkill
    //var sliderMax = 0
    //let myLvl
    //let maxLvl = selectedSkill._maxLvl

    let multArr = [
        {name:"name1", maxLvl: 1},
        {name:"name2", maxLvl: 2}
    ]
    */
</script>

<style>
  .custom-step {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 0 3px #ccc;
    background-color: #fff;
  }
  .custom-step.active {
    box-shadow: 0 0 0 3px #3498db;
    background-color: #3498db;
  }
  .sliderDiv {
      padding-bottom: 20px;
      padding-top: 40px;
  }
</style>