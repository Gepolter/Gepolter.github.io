<template>

    <div  class="header">
        talismans
    </div>
    <!-- talismans/talismans: array of collapsibles v-for-->
    <div class="selectionArrayCollapsible">
        <vue-collapsible-panel-group accordion >
            <!--for every element in TAL array one collapsible. !!!no events from collapsible...... why?!-->
            <vue-collapsible-panel v-for="talisman in getTalismans" :key="talisman._name" :expanded="false">
                <template #title>
                    <div class="collapsibleHeader">
                        <div class="collapsibleHeaderName">
                            {{talisman._name}}
                        </div>
                        <!--button type="submit" style="display: inline;" @click="activateTAL(talisman)">activate</button-->
                        <div class="collapsibleHeaderBtn">
                            <button type="submit" style="display: inline;" @click="deleteTal(talisman)">X</button>
                        </div>
                    </div>
                </template>
                <template #content>
                    <!-- here four of these cyclestates are needed and the labels have to display the tal picture + hold a gettable value / pseudo button has to emit event to cycle state in tal obj(store)-->
                    <div class="slotSelection">
                        <SlotItemBtn @send="setSlotLvl(talisman, 0, $event)"/>
                        <SlotItemBtn @send="setSlotLvl(talisman, 1, $event)"/>
                        <SlotItemBtn @send="setSlotLvl(talisman, 2, $event)"/>                     
                    </div>
                    
                    <div class ="selectionHeader">
                        <label style="flex:5">Skill</label>
                        <label>Lvl</label>
                        <label>Del</label>
                    </div>
                    <!-- items of TAL/tals array of selectionItems(custom class)-->
                    <!-- this should be draggable to select prios-->
                    <div class="selectionItems">
                        <SelectionItem 
                            v-for="selectedSkill in talisman._nat_skill_arr"
                            :key="selectedSkill._skill_name"
                            :skillName="selectedSkill._skill_name"
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
                                :height = 20
                                
                                :rail-style="railStyle"
                                :process-style="processStyle"
                                :tooltip="'none'"
                                :marks ="marks"
                                :step-style="stepStyle"
                                >
                                <template v-slot:dot="{focus}">
                                    <div :class="['custom-dot', {focus}]"></div>
                                </template>
                                <template v-slot:step="{active}">
                                    <div :class="['custom-step', {active}]">
                                    <img v-bind:src="marksImg"/></div>
                                </template>
                            </v-slider>
                            
                        </div>

                        <button type="submit" class="btn btn__primary btn__lg" @click="addSkill(selectedSkill._name, myLvl, talisman)">
                            Add Skill
                        </button>
                    </div>
                </template>
            </vue-collapsible-panel>
        </vue-collapsible-panel-group>
        <div class="addPanel">
            <input v-model="text" placeholder="Talisman Name"/>
            <button type="submit" @click="addTalisman(text)">
                create talisman
            </button>
        </div>
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

            }),
            
        },
        methods: {
            /*
            nativeSkills: function(talisman){
                
                //if(talisman._skill_array.length != 0){
                    for(let i = 0; i < talSkillArrCopy.length; i ++){
                        //get all non deco skills of same name -> length = lvl
                        var addSkillArr = talSkillArrCopy.filter(e => e._skill_name == talSkillArrCopy[i]._skill_name && e._is_deco == false) 

                        const skill = {
                            _skill_name: addSkillArr[0]._skill_name,
                            _selectedLvl: addSkillArr.length,
                            
                        }
                        natSkillArr.push(skill)
                        talSkillArrCopy = talSkillArrCopy.filter(e => e._skill_name != talSkillArrCopy[i]._skill_name && e._is_deco == false) 
                    }

                    return natSkillArr
                //}
            },*/
            ...mapActions({
                fetchSkills: 'fetchSkills',
                createTalisman: 'createTalisman'
            }),
            ...mapMutations([
                'ADD_TAL',
                'DELETE_TAL'
            ]),
            
            addSkill: function(skillName, skillLvl, talisman){
                //what talisman is opened?
                //check, if skillName is already in skill_array
                if(talisman._skill_array.some(e => e._skill_name ===skillName) ){
                    alert('skill already in talisman')
                }else{
                    for(let j = 0; j < skillLvl; j++){
                        talisman._skill_array.push({
                            _skill_name: skillName,
                            _is_deco: false
                        })
                    }
                    talisman._nat_skill_arr.push({
                        _skill_name: skillName,
                        _is_deco: false,
                        _selectedLvl: skillLvl
                    })
                    //also set slider current lvl back to 1
                    this.resetSlider()
                }
                /*
                for(var i = 0; i < this.getTalismansLength; i++){
                    if(this.getTalismans[i] === talisman){
                    }
                }*/
            },
            removeSkill: function(talisman, skillName){
                for(var i = 0; i < this.getTalismansLength; i++){
                    if(this.getTalismans[i] === talisman){
                        try{
                            talisman._skill_array = talisman._skill_array.filter(e => e._skill_name != skillName && e._is_deco == false)  
                            talisman._nat_skill_arr = talisman._nat_skill_arr.filter(e => e._skill_name != skillName && e._is_deco == false) 
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
                    //alert('talisman name already in use') UNDO LATER
                }
                else{
                    this.ADD_TAL({
                        _name: talName,
                        _skill_array: [],
                        _nat_skill_arr: [],
                        _slots: [0,1,2],
                        _type_id: "5"
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
                            /*
                            switch(slotNum){
                                case 0:
                                    talisman._slots._slots_id_1 = slotLvl
                                    break
                                case 1:
                                    talisman._slots._slots_id_2 = slotLvl
                                    break
                                case 2:
                                    talisman._slots._slots_id_3 = slotLvl
                                    break
                            }
                            */
                            talisman._slots[slotNum] = slotLvl
                        }catch (error){
                            alert (error)
                            console.log(error)
                        }
                    }
                }
            }
        },
        //why separate computed method?
        data() {
            return {
                myLvl: 1,
                selectedSkill: {_name: "blank", _maxLvl: 3},
                value: 0,

                marks: stuff => stuff % 1 === 0,
                text: "",
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
        created(){
            this.fetchSkills()
            this.addTalisman("tal one")
        }
    }


</script>



<style>
    .header{
        border: 2px solid black;
        background: linear-gradient(var(--mh-dark-green),var(--mh-green));
        color: black;
    }

    .vue-slider-process {
    z-index: inherit;
    }
    .custom-dot{
        width: 100%;
        height: 100%;
        background-color: rgb(191, 191, 191);
        box-shadow: 0 0 0 4px var(--mh-gray);
        border: 1px solid var(--mh-gray);
        border-radius: 50%;
        z-index: inherit;
    }
    .custom-step {
        width: 100%;
        height: 100%;
        border: 1px solid black;

        background-color: var(--mh-light-blue);
        z-index: inherit;
    }
    .custom-step.active {
        width: 100%;
        height: 100%;
        border: 1px solid var(--mh-dark-red);
        box-shadow: 0 0 0 4px var(--mh-dark-green);
        background-color: #f0db98;
        z-index: inherit;
    }
    .sliderDiv {
        padding-bottom: 20px;
        padding-top: 40px;
        padding-left: 15px;
        padding: 20px 20px 40px 20px;
        z-index: inherit;
        opacity: .99;

    }
    .selectionArrayCollapsible{
        border: 3px solid black;
    }

    .selectionHeader{
        text-align: center;
        display: flex;
        justify-content: space-between;
        color: var(--mh-light-white);
        background: radial-gradient(black,var(--mh-gray));
    }
    .selectionHeader > label{
        flex: 1;
        border-bottom: 3px solid black;
        text-align:start;
        display: inline;
    }
    .collapsibleHeader{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between; 
        background: linear-gradient(180deg, rgba(9,25,55,1) 0%, rgba(19,48,90,1) 100%);    
        border-top: 3px dashed var(--mh-yellow);
    }
    .slotSelection{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .addPanel{
        border-top: 3px dashed var(--mh-yellow);
    }
    
</style>