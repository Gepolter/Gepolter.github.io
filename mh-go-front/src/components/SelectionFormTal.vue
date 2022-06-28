<template>

    <div  class="header" style="border-style: solid;">
        talismans
    </div>
    <!-- talismans/talismans: array of collapsibles v-for-->
    <div class="selectionArrayCollapsible">
        <vue-collapsible-panel-group accordion>
            <!--for every element in TAL array one collapsible. !!!no events from collapsible...... why?!-->
            <vue-collapsible-panel v-for="talisman in getTalismans" :key="talisman._name" :expanded="false">
                <template #title>
                    {{talisman._name}}
                    <!--button type="submit" style="display: inline;" @click="activateTAL(talisman)">activate</button-->
                    <button type="submit" style="display: inline;" @click="deleteTal(talisman)">X</button>
                </template>
                <template #content>
                    <!-- here four of these cyclestates are needed and the labels have to display the tal picture + hold a gettable value / pseudo button has to emit event to cycle state in tal obj(store)-->
                    <div class="slotSelection" style="display: inline;">
                        <SlotItemBtn @send="setSlotLvl(talisman, 0, $event)"/>
                        <SlotItemBtn @send="setSlotLvl(talisman, 1, $event)"/>
                        <SlotItemBtn @send="setSlotLvl(talisman, 2, $event)"/>                     
                    </div>
                    
                    <!-- items of TAL/tals array of selectionItems(custom class)-->
                    <!-- this should be draggable to select prios-->
                    <div class="selectionItems">
                        <SelectionItem 
                            v-for="selectedSkill in talisman._skillSelectionArray"
                            :key="selectedSkill._name"
                            :skillName="selectedSkill._name"
                            :skillLvl="selectedSkill._selectedLvl"
                            :skillPrio="selectedSkill._prio"
                            @send="removeSkill(talisman, $event)">
                            
                        </SelectionItem>
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

                        <button type="submit" class="btn btn__primary btn__lg" @click="addSkill(selectedSkill._name, myLvl, 1, talisman)">
                            Add Skill
                        </button>
                    </div>
                </template>
            </vue-collapsible-panel>
        </vue-collapsible-panel-group>
    </div>

    <div class="addTalPanel">
        <input v-model="text" placeholder="Tal Name"/>
        <button type="submit" style="display: inline;" @click="addTalisman(text)">
            create talisman
        </button>
    </div>


</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import SelectionItem from './SelectionItem.vue';
    //import SlotItem from './SlotItem.vue'
    import SlotItemBtn from './SlotItemBtn.vue';

    export default {
        components: {
            SelectionItem,
            //SlotItem,
            SlotItemBtn
        },

        computed:{

            ...mapGetters({
                getSkills: 'getSkills',
                getTalismans: 'getTalismans',
                getTalismansLength: 'getTalismansLength'

            })
        },
        methods: {
            ...mapActions({
                fetchSkills: 'fetchSkills',
                createTalisman: 'createTalisman'
            }),
            ...mapMutations([
                'ADD_TAL',
                'DELETE_TAL'
            ]),
            
            addSkill: function(skillName, skillLvl, skillPrio, talisman){
                //what talisman is opened?
                
                for(var i = 0; i < this.getTalismansLength; i++){
                    if(this.getTalismans[i] === talisman){
                        //check, if skillName is already in skillSelectionArray
                        if(talisman._skillSelectionArray.some(e => e._name ===skillName) ){
                            alert('skill already in talisman')
                        }else{
                            talisman._skillSelectionArray.push({
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
            removeSkill: function(talisman, skillName){
                for(var i = 0; i < this.getTalismansLength; i++){
                    if(this.getTalismans[i] === talisman){
                        try{
                            talisman._skillSelectionArray = talisman._skillSelectionArray.filter(e => e._name != skillName) 
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
            addTalisman: function(talName){
                if(this.getTalismans.some(e => e._name ===talName) ){
                    alert('talisman name already in use')
                }
                else{
                    this.ADD_TAL({
                        _name: talName,
                        _skillSelectionArray: [],
                        _slots: [0,0,0]
                    })
                }
            },
            deleteTal: function(talisman){
                this.DELETE_TAL(talisman)
            },
            setSlotLvl: function(talisman, slotNum, slotLvl){                
                for(var i = 0; i < this.getTalismansLength; i++){
                    if(this.getTalismans[i] === talisman){
                        try{
                            talisman._slots[slotNum] = slotLvl
                        }catch (error){
                            alert (error)
                            console.log(error)
                        }
                    }
                }
            }
            //maybe helpful for selection to build later
            /*
            activateTal: function(talisman){
                console.log(this.getTalismansLength)
                for(var i = 0; i< this.getTalismansLength;i++){
                    console.log(this.getTalismans[i]._name)
                    if(this.getTalismans[i]._name === talisman._name){
                        this.getTalismans[i]._active = true
                    }
                    else{
                        this.getTalismans[i]._active = false
                        
                    }
                }
                talisman._active = true
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
                //talismanArray:[]

             }
        },
        created(){
            this.fetchSkills()
            this.addTalisman("tal one", [])
        }
    }


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