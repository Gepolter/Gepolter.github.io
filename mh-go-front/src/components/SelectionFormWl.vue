<template>

    <div  class="headerWl">
        wishlists
    </div>
    <!-- wishlists/talismans: array of collapsibles v-for-->
    <div class="selectionArrayCollapsible">
        <vue-collapsible-panel-group accordion>
            <!--for every element in wl array one collapsible. !!!no events from collapsible...... why?!-->
            <vue-collapsible-panel v-for="wishlist in getWishlists" :key="wishlist._name" :expanded="false">
                <template #title>
                    <div class="collapsibleHeader">
                        {{wishlist._name}}
                        <!--button type="submit" style="display: inline;" @click="activateWl(wishlist)">activate</button-->
                        <button type="submit" style="display: inline;" @click="deleteWl(wishlist)">X</button>
                    </div>
                </template>
                <template #content>
                    <!-- header for columns-->
                    <div class="selectionHeader">
                        <label>Prio</label>
                        <label style="flex : 3;">Skill</label>
                        <label>Lvl</label>
                        <label>Del</label>
                    </div>
                    <!-- items of wl/tals array of selectionItems(custom class)-->
                    <!-- this should be draggable to select prios-->
                    <div class="selectionItems">
                        <!--deleted: tag="SelectionItem" from draggable-->
                        <draggable
                            
                            :list="wishlist._skillSelectionArray" 
                            item-key="_name"
                            :onUpdated = "reorderWl(wishlist._skillSelectionArray)">
                            <template #item="{element}">
                                <SelectionItem
                                    :skillName= "element._name"
                                    :skillLvl="element._selectedLvl"
                                    :skillPrio="element._prio"
                                    @send="removeSkill(wishlist, $event)"/>
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
                        <!--:reduce="getSkills => getSkills._maxLvl" deleted: color="#FB278D"-->
                        <div class="sliderDiv">
                            <v-slider 
                                v-model="myLvl"
                                :min = 1
                                :max="selectedSkill._maxLvl"
                                :height = 20
                                
                                :rail-style="railStyle"
                                :process-style="processStyle"
                                :tooltip="'none'"
                                :marks ="marks"
                                :step-style="stepStyle"
                                >
                                <template v-slot:dot="{focus }">
                                    <div :class="['custom-dot', {focus}]"></div>
                                </template>
                                <template v-slot:step="{active}">
                                    <div :class="['custom-step', {active}]">
                                    <img v-bind:src="marksImg"/></div>
                                </template>
                            </v-slider>
                        </div>

                        <button type="submit" class="btn btn__primary btn__lg" @click="addSkill(selectedSkill._name, myLvl, wishlist)">
                            Add Skill
                        </button>
                    </div>
                </template>
            </vue-collapsible-panel>
        </vue-collapsible-panel-group>
        <div class="addPanel">
            <input v-model="text" placeholder="Wishlist Name"/>
            <button type="submit" style="display: inline;" @click="addWishlist(text)">
                create Wishlist
            </button>
        </div>
    </div>



</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import SelectionItem from './SelectionItem.vue';
    

    export default {
        components: {
            SelectionItem,
        },

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
            
            addSkill: function(skillName, skillLvl, wishlist){
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
                                _prio: 0
                            })
                            //also set slider current lvl back to 1
                            wishlist._skillSelectionArray[wishlist._skillSelectionArray.length-1]._prio = this.arrayPos(wishlist._skillSelectionArray, skillName)
                            this.resetSlider()
                        }
                    }
                }
            },
            arrayPos:function(array, key){
                return array.findIndex(p=>p._name == key)
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
                    //alert('Wishlist name already in use')
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
            },
            reorderWl: function(skillArray){
                for(var i = 0;i < skillArray.length; i++){
                    skillArray[i]._prio = i+1
                }
            },
            //maybe helpful for selection to build later
            
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
                //wishlist._active = true
            },
        },
        //why separate computed method?
        data() {
            return {
                myLvl: 1,
                selectedSkill: {_name: "blank", _maxLvl: 3},
                value: 0,
                text: "",
                marks: stuff => stuff % 1 === 0,
                marksImg: require('../assets/unique-armor-mhw-wiki.png'),

                railStyle:{
                    //border: "3px solid #95844f",
                    backgroundColor: "#13305a",
                    color: "#95844f",
                    border: "1px solid white"
                },
                processStyle:{
                    border: "3px solid #8c1818",
                    backgroundColor: "#1d0503",
                    color: "green",
                    top:"-2px"
                },
                stepStyle:{
                    color: "green",
                    backgroundColor:"black",
                    border: "2px solid black"
                },
                stepActiveStyle:{

                }
                
            }
        },
        props: {
           
        },
        watch: {
            panelIndex: function(){
                console.log(this.panelIndex)
            }
        },
        created(){
            this.fetchSkills()
            this.addWishlist("wl one", [])
        }
    }


</script>

<style>

  .headerWl{
    border: 2px solid black;
    background: linear-gradient(var(--mh-dark-yellow),var(--mh-yellow));
    color: black;
  }
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
  .selectionHeader{
    display: flex;
    justify-content: space-between;
  }
  .selectionHeader > label{
    flex: 1;
    border-bottom: 2px solid black;
    
  }

</style>